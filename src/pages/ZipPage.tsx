import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { HelpCircle, PhoneCall, Clock, CheckCircle2, Zap, ShieldCheck, AlertCircle, MapPin, Activity } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const ZipPage: React.FC = () => {
  const { state, city, zipCode } = useParams<{ state?: string; city?: string; zipCode?: string }>();
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [nearbyZips, setNearbyZips] = useState<string[]>([]);
  const [localStats, setLocalStats] = useState({
    providerCount: 4,
    maxSpeed: '1,000 Mbps',
    hasFiber: true,
    county: '',
  });

  // PHONE & HOURS CONFIGURATION
  const PHONE_NUMBER = "1-855-215-8469";
  const TEL_HREF = "tel:18552158469";
  const HOURS_DISPLAY = "Mon–Fri 7am–8pm CT | Sat 9am–5pm CT";

  // 1. PARAMETER EVALUATION & PLACEHOLDER FILTERING
  const rawCity = city?.trim() || '';
  const rawState = state?.trim() || '';
  const currentZip = zipCode?.trim() || '';

  // Detect test, missing, or invalid placeholder values
  const isInvalid = (str: string) =>
    !str || ['unknown', 'unknown-city', '00000', '000', 'null', 'undefined'].includes(str.toLowerCase());

  const hasValidLocation = Boolean(
    rawCity &&
      rawState &&
      currentZip &&
      !isInvalid(rawCity) &&
      !isInvalid(rawState) &&
      !isInvalid(currentZip)
  );

  // Dynamic text formatting with clean fallbacks
  const formattedCity = hasValidLocation
    ? rawCity.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : 'Your Location';
  const formattedState = hasValidLocation ? rawState.toUpperCase() : '';

  const locationTitle = hasValidLocation
    ? `${formattedCity}, ${formattedState} (${currentZip})`
    : 'Your Location';

  const displayZip = hasValidLocation ? currentZip : 'Your Location';

  const canonicalUrl = hasValidLocation
    ? `https://hometechdealer.com/internet/${rawState.toLowerCase()}/${rawCity.toLowerCase()}/${currentZip}`
    : `https://hometechdealer.com/internet`;

  // 2. DYNAMIC METADATA & CANONICAL INJECTION
  useEffect(() => {
    document.title = hasValidLocation
      ? `Best Internet Providers in ${formattedCity}, ${formattedState} (${currentZip}) | Home Tech Dealer`
      : `Find High-Speed Internet Providers in Your Location | Home Tech Dealer`;

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute(
      'content',
      hasValidLocation
        ? `Compare top high-speed internet providers in ${formattedCity}, ${formattedState} (${currentZip}). Compare Spectrum, AT&T Fiber, Frontier, Kinetic, Xfinity. Call 1-855-215-8469 for address setup.`
        : `Compare top high-speed internet providers in your location. Spectrum, AT&T Fiber, Frontier, Kinetic, Xfinity options available. Call 1-855-215-8469 for instant setup.`
    );

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);
  }, [hasValidLocation, formattedCity, formattedState, currentZip, canonicalUrl]);

  // 3. FETCH DYNAMIC LOCAL STATS & NEARBY ZIP CODES
  useEffect(() => {
    async function fetchZipDetailsAndNearby() {
      if (!rawCity || !currentZip) return;

      const cleanCityName = rawCity.replace(/-/g, ' ').trim();

      // Fetch dynamic record stats for this specific ZIP code
      const { data: zipDetails } = await supabase
        .from('zip_codes')
        .select('*')
        .eq('zip_code', currentZip)
        .maybeSingle();

      if (zipDetails) {
        setLocalStats({
          providerCount: zipDetails.provider_count || 5,
          maxSpeed: zipDetails.max_speed || '1,000 Mbps',
          hasFiber: zipDetails.has_fiber ?? true,
          county: zipDetails.county || '',
        });
      }

      // Fetch 6 neighboring ZIP codes in the same city for internal linking
      const { data: nearbyData, error } = await supabase
        .from('zip_codes')
        .select('zip_code')
        .ilike('city', cleanCityName)
        .neq('zip_code', currentZip)
        .limit(10);

      if (!error && nearbyData) {
        const formattedList = nearbyData
          .map((item) => String(item.zip_code).padStart(5, '0'))
          .filter((zip) => zip !== currentZip);

        const uniqueZips = Array.from(new Set(formattedList)).slice(0, 6);
        setNearbyZips(uniqueZips);
      }
    }

    fetchZipDetailsAndNearby();
  }, [rawCity, currentZip]);

  // 4. JSON-LD STRUCTURED DATA SCHEMA
  const jsonLdSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: `Internet Providers in ${locationTitle}`,
        description: `Compare high-speed internet service options in ${locationTitle}.`,
      },
      {
        '@type': 'Service',
        name: `High-Speed Internet Service in ${locationTitle}`,
        provider: {
          '@type': 'Organization',
          name: 'Home Tech Dealer',
          telephone: PHONE_NUMBER,
          openingHours: [
            "Mo-Fr 07:00-20:00",
            "Sa 09:00-17:00"
          ]
        },
        areaServed: hasValidLocation ? {
          '@type': 'PostalCode',
          postalCode: currentZip,
          addressCountry: 'US',
        } : 'US',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Available Broadband Plans',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'High-Speed Broadband Connection',
              },
              priceCurrency: 'USD',
              price: '30.00',
            },
          ],
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `What is the fastest internet provider in ${locationTitle}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Top fiber and cable providers offer speeds up to ${localStats.maxSpeed} in ${locationTitle}. Call 1-855-215-8469 for instant availability at your exact address.`,
            },
          },
          {
            '@type': 'Question',
            name: `How do I order internet over the phone?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Call 1-855-215-8469 to order directly. Sales specialists are available Mon–Fri 7AM–8PM CT and Sat 9AM–5PM CT (Closed Sundays).`,
            },
          },
          {
            '@type': 'Question',
            name: `How much does internet cost in ${formattedCity}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Internet plans in ${formattedCity} typically start between $30/mo. and $50/mo. depending on bandwidth requirements, location, and provider promotions.`,
            },
          }
        ],
      },
    ],
  };

  // Provider Data Set
  const providers = [
    {
      name: "Spectrum",
      badge: "Top Cable Provider in " + displayZip,
      plans: [
        { title: "Internet 100", speed: "100 Mbps", price: "Starting at $30.00/mo*", type: "Cable" },
        { title: "Internet Premier", speed: "500 Mbps", price: "Starting at $40.00/mo*", type: "Cable" },
        { title: "Internet Gig", speed: "1000 Mbps", price: "Starting at $60.00/mo*", type: "Cable/Fiber" },
      ],
      features: ["No Contract Required", "Free Modem Included", "Unlimited Data Usage"],
    },
    {
      name: "AT&T Fiber & Broadband",
      badge: "Ultra-Fast Fiber",
      plans: [
        { title: "Fiber 300", speed: "300 Mbps", price: "Starting at $55.00/mo*", type: "Fiber" },
        { title: "Fiber 500", speed: "500 Mbps", price: "Starting at $65.00/mo*", type: "Fiber" },
        { title: "1 GIG Fiber", speed: "1000 Mbps", price: "Starting at $80.00/mo*", type: "Fiber" },
      ],
      features: ["Equal Upload & Download", "No Price Increase at 12 Mos.", "99% Network Reliability"],
    },
    {
      name: "Frontier / Kinetic Fiber",
      badge: "Best Value Fiber",
      plans: [
        { title: "Fiber 500", speed: "500 Mbps", price: "Starting at $44.99/mo*", type: "Fiber" },
        { title: "Fiber 1 Gig", speed: "1000 Mbps", price: "Starting at $69.99/mo*", type: "Fiber" },
      ],
      features: ["Free Professional Install", "No Annual Contract", "Unlimited Data Allowance"],
    },
    {
      name: "5G & Satellite Wireless",
      badge: "100% Local Coverage",
      plans: [
        { title: "5G Home Internet", speed: "Up to 300 Mbps", price: "Starting at $35.00/mo*", type: "5G Wireless" },
        { title: "Satellite Broadband", speed: "Up to 100 Mbps", price: "Starting at $49.99/mo*", type: "Satellite" },
      ],
      features: ["Available in Rural Areas", "Easy Self-Install Option", "Reliable Backup Connectivity"],
    },
    {
      name: "Looking for Other Local Providers?",
      badge: "Address Verification in " + displayZip,
      plans: [
        { title: "Regional Fiber & Cable", speed: "Up to 1000 Mbps", price: "Live Rate Quote*", type: "Fiber / Cable" },
        { title: "Fixed 5G & DSL Alternatives", speed: "Up to 300 Mbps", price: "Live Rate Quote*", type: "Wireless / Wireline" },
        { title: "Rural & Satellite Options", speed: "Up to 100 Mbps", price: "Live Rate Quote*", type: "Satellite" },
      ],
      features: [
        "Check CenturyLink, EarthLink, Optimum & More",
        "Verify Exact Street Address Coverage",
        "Unadvertised Local Move-In Promotions"
      ],
    },
  ];

  const brandList = [
    { name: "Spectrum", bg: "bg-blue-600 text-white hover:bg-blue-500" },
    { name: "AT&T Fiber", bg: "bg-sky-400 text-blue-950 font-black hover:bg-sky-300" },
    { name: "Frontier Fiber", bg: "bg-rose-600 text-white hover:bg-rose-500" },
    { name: "Kinetic Fiber", bg: "bg-emerald-500 text-gray-950 font-black hover:bg-emerald-400" },
    { name: "Xfinity", bg: "bg-purple-600 text-white hover:bg-purple-500" },
    { name: "T-Mobile 5G", bg: "bg-pink-600 text-white hover:bg-pink-500" },
    { name: "Verizon 5G", bg: "bg-red-600 text-white hover:bg-red-500" },
    { name: "CenturyLink", bg: "bg-indigo-600 text-white hover:bg-indigo-500" },
    { name: "Optimum", bg: "bg-amber-400 text-amber-950 font-black hover:bg-amber-300" },
    { name: "HughesNet", bg: "bg-orange-500 text-white hover:bg-orange-400" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col text-gray-900 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          display: flex;
          width: max-content;
          animation: ticker 25s linear infinite;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Primary Sticky Top Announcement Bar */}
      <div 
        data-nosnippet
        className="bg-amber-400 text-amber-950 font-bold text-center py-2.5 px-4 text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 shadow-md sticky top-0 z-50"
      >
        <div className="flex items-center space-x-1.5">
          <PhoneCall className="w-4 h-4 animate-bounce text-amber-900" />
          <span>Call {formattedCity} Internet Sales Specialist:</span>
          <a href={TEL_HREF} className="underline hover:text-black font-black text-sm sm:text-base">
            {PHONE_NUMBER}
          </a>
        </div>
        <div className="flex items-center text-amber-900 text-xs font-semibold space-x-1">
          <Clock className="w-3.5 h-3.5" />
          <span>{HOURS_DISPLAY}</span>
        </div>
      </div>

      {/* Hero Header Section */}
      <section className="bg-blue-900 text-white py-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Find High-Speed Internet Providers in {locationTitle}
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto">
            Comparing broadband options in {locationTitle}. Call directly for fast plan setup and street address availability.
          </p>

          {/* Primary Call Box */}
          <div className="bg-gradient-to-r from-blue-800 to-blue-950 border border-amber-400/50 p-6 rounded-2xl max-w-xl mx-auto shadow-xl space-y-3">
            <div className="flex items-center justify-center space-x-2 text-amber-300 font-extrabold text-sm uppercase tracking-wide">
              <PhoneCall className="w-4 h-4" />
              <span>Fastest Setup Option</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">
              Call <a href={TEL_HREF} className="text-amber-400 underline hover:text-amber-300">{PHONE_NUMBER}</a>
            </div>
            <p className="text-xs sm:text-sm text-blue-200">
              Speak with a live agent to verify exact home coverage, local promos, and installation dates.
            </p>
            <div className="pt-1">
              <a
                href={TEL_HREF}
                className="inline-flex items-center justify-center space-x-2 bg-amber-400 hover:bg-amber-300 text-amber-950 font-black px-8 py-3.5 rounded-xl shadow-lg text-lg transition-transform active:scale-95 w-full sm:w-auto"
              >
                <PhoneCall className="w-5 h-5" />
                <span>Call Now: {PHONE_NUMBER}</span>
              </a>
            </div>
            <p className="text-[11px] text-blue-300 flex items-center justify-center gap-1 pt-1">
              <Clock className="w-3 h-3" />
              <span>{HOURS_DISPLAY} (Closed Sun)</span>
            </p>
          </div>

          {/* Provider Scroll Ticker */}
          <div className="pt-6 border-t border-blue-800/80 mt-8 max-w-4xl mx-auto">
            <p className="text-[11px] uppercase tracking-widest text-blue-300 font-bold mb-3">
              Tap Any Provider Below To Check Local Availability in {formattedCity}
            </p>

            <div className="relative w-full overflow-hidden py-1">
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-blue-900 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-blue-900 to-transparent z-10 pointer-events-none" />

              <div className="animate-ticker space-x-3">
                {[...brandList, ...brandList].map((brand, index) => (
                  <a
                    key={index}
                    href={TEL_HREF}
                    title={`Call ${PHONE_NUMBER} to check ${brand.name} availability`}
                    className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold shadow-md border border-white/20 whitespace-nowrap transition-transform active:scale-95 ${brand.bg}`}
                  >
                    <PhoneCall className="w-3 h-3 mr-1.5 fill-current" />
                    <span>{brand.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 py-12 flex-grow w-full space-y-12">
        <section id="provider-plans" className="space-y-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Internet Availability &amp; Coverage in {displayZip}
            </h2>
            <p className="text-gray-600 text-sm max-w-2xl mx-auto">
              {localStats.hasFiber ? (
                <>
                  Residents in <strong>{locationTitle}</strong> have access to fiber and high-speed cable infrastructure supporting speeds up to {localStats.maxSpeed}.
                </>
              ) : (
                <>
                  High-speed internet in <strong>{locationTitle}</strong> is powered by high-capacity cable networks and 5G wireless broadband options up to {localStats.maxSpeed}.
                </>
              )} Call <a href={TEL_HREF} className="font-bold text-blue-700">{PHONE_NUMBER}</a> for address verification.
            </p>
          </div>

          {/* Phase 2 Dynamic Local Overview Summary Table */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-2 text-gray-900 mb-4">
              <Activity className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-lg">Broadband Profile for ZIP {displayZip}</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
              <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                <span className="text-gray-500 text-xs font-semibold block">Available Providers</span>
                <strong className="text-gray-900 text-base font-black">{localStats.providerCount}+ Active Carriers</strong>
              </div>
              <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                <span className="text-gray-500 text-xs font-semibold block">Max Download Speed</span>
                <strong className="text-gray-900 text-base font-black">{localStats.maxSpeed}</strong>
              </div>
              <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100 col-span-2 sm:col-span-1">
                <span className="text-gray-500 text-xs font-semibold block">Fiber Infrastructure</span>
                <strong className="text-gray-900 text-base font-black">
                  {localStats.hasFiber ? 'Fiber & Cable Live' : 'Cable / 5G Wireless'}
                </strong>
              </div>
            </div>
          </div>

          {/* Cards Rendering */}
          <div className="space-y-8">
            {providers.map((provider, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden">
                <div className="bg-gray-900 text-white p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="inline-block bg-amber-400 text-amber-950 text-xs font-black px-2.5 py-1 rounded-md mb-2 uppercase tracking-wide">
                      {provider.badge}
                    </span>
                    <h3 className="text-2xl font-black">{provider.name} Plans in {locationTitle}</h3>
                  </div>
                  <a
                    href={TEL_HREF}
                    className="inline-flex items-center space-x-2 bg-amber-400 hover:bg-amber-300 text-amber-950 font-black px-5 py-2.5 rounded-xl shadow text-sm transition-transform active:scale-95 whitespace-nowrap"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Call {PHONE_NUMBER}</span>
                  </a>
                </div>

                <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {provider.plans.map((plan, pIdx) => (
                    <div key={pIdx} className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col justify-between hover:border-blue-400 transition-colors">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-gray-900 text-base">{plan.title}</h4>
                          <span className="text-[11px] bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded">
                            {plan.type}
                          </span>
                        </div>
                        <div className="text-xl font-black text-gray-900 mb-1">{plan.price}</div>
                        <div className="text-xs text-gray-500 font-medium mb-3 flex items-center gap-1">
                          <Zap className="w-3.5 h-3.5 text-amber-500" />
                          <span>Speeds up to {plan.speed}</span>
                        </div>
                      </div>

                      <a
                        href={TEL_HREF}
                        className="w-full mt-2 bg-blue-700 hover:bg-blue-600 text-white font-bold py-2.5 rounded-lg text-center text-sm flex items-center justify-center space-x-1.5 transition-colors"
                      >
                        <PhoneCall className="w-4 h-4" />
                        <span>Check Availability</span>
                      </a>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 px-4 sm:px-6 py-3 border-t border-gray-200 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-600">
                  <div className="flex flex-wrap items-center gap-4">
                    {provider.features.map((feat, fIdx) => (
                      <span key={fIdx} className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{feat}</span>
                      </span>
                    ))}
                  </div>
                  <div className="text-gray-400 font-medium">
                    Verified for {displayZip}
                  </div>
                </div>
              </div>
            ))}

            {/* Alternative Provider Fallback Banner */}
            <div className="bg-blue-950 border-2 border-amber-400 rounded-2xl p-6 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
              <div className="space-y-1">
                <h3 className="text-xl font-black text-amber-400">
                  Prefer a Different Provider in {formattedCity}?
                </h3>
                <p className="text-xs sm:text-sm text-blue-200">
                  Don't want Spectrum or AT&amp;T? We compare 10+ regional cable, fiber, and wireless carriers in {displayZip}. Call now to see every active option for your exact home address.
                </p>
              </div>
              <a
                href={TEL_HREF}
                className="bg-amber-400 hover:bg-amber-300 text-amber-950 font-black px-6 py-3 rounded-xl shadow-lg text-sm flex items-center space-x-2 whitespace-nowrap transition-transform active:scale-95"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call {PHONE_NUMBER}</span>
              </a>
            </div>

            {/* Price & Plan Disclaimer */}
            <div className="bg-gray-100 p-4 rounded-xl border border-gray-200 text-xs text-gray-600 flex items-start space-x-2.5">
              <AlertCircle className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
              <p>
                <strong>*Pricing &amp; Speed Disclaimer:</strong> Advertised prices represent estimated baseline promotional starting rates for new residential subscribers and may require paperless billing or auto-pay enrollment. Actual speeds, plan availability, installation fees, and promotional rates vary based on exact street address, equipment selection, and provider coverage. Call <a href={TEL_HREF} className="font-bold underline text-blue-700">{PHONE_NUMBER}</a> to verify active local promotions and confirmed availability for your location.
              </p>
            </div>

            {/* Direct Phone Banner */}
            <div className="bg-gradient-to-r from-amber-400 to-amber-300 rounded-2xl p-6 text-amber-950 border border-amber-500 shadow-md text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="text-xl font-black">Need immediate setup in {formattedCity}?</h4>
                <p className="text-xs sm:text-sm font-medium text-amber-900">
                  Our local specialists verify exact address coverage, apply unadvertised promotions, and schedule setup.
                </p>
              </div>
              <a
                href={TEL_HREF}
                className="bg-gray-900 hover:bg-black text-white font-black px-6 py-3.5 rounded-xl shadow-lg text-base flex items-center space-x-2 whitespace-nowrap"
              >
                <PhoneCall className="w-5 h-5 text-amber-400" />
                <span>Call {PHONE_NUMBER}</span>
              </a>
            </div>
          </div>
        </section>

        {/* High-Level Value Props */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center">
            <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-xl flex items-center justify-center mx-auto mb-4">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Direct Phone Setup</h3>
            <p className="text-sm text-gray-600">
              Skip third-party forms. Call <a href={TEL_HREF} className="font-bold text-blue-700">{PHONE_NUMBER}</a> to setup service with a phone agent.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Gigabit Speed Tiers</h3>
            <p className="text-sm text-gray-600">
              Connections delivering speeds up to {localStats.maxSpeed} available across select neighborhoods in {displayZip}.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Verified Regional Coverage</h3>
            <p className="text-sm text-gray-600">
              Coverage data mapped across cable, fiber, satellite, and 5G Home Internet in {hasValidLocation ? formattedState : 'your state'}.
            </p>
          </div>
        </section>

        {/* Nearby ZIP Codes Cross-Linking Widget */}
        {nearbyZips.length > 0 && (
          <section className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 text-gray-900">
              <MapPin className="w-5 h-5 text-blue-600" />
              <h3 className="text-xl font-bold">
                Other Internet Options Near {formattedCity}
              </h3>
            </div>
            <p className="text-sm text-gray-600">
              Comparing providers in neighboring areas? Explore nearby ZIP codes in {formattedCity}, {formattedState}:
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              {nearbyZips.map((nearZip) => (
                <Link
                  key={nearZip}
                  to={`/internet/${rawState.toLowerCase()}/${rawCity.toLowerCase()}/${nearZip}`}
                  className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-lg border border-blue-200 text-sm transition-colors"
                >
                  ZIP {nearZip}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* FAQ Section */}
        <section className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center space-x-2 text-blue-900">
            <HelpCircle className="w-6 h-6" />
            <h2 className="text-2xl font-semibold">
              Frequently Asked Questions About {formattedCity} Internet
            </h2>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                What is the fastest internet provider in {locationTitle}?
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                Top fiber and cable providers offer speeds up to {localStats.maxSpeed} in {locationTitle}. Call <a href={TEL_HREF} className="font-bold text-blue-700">{PHONE_NUMBER}</a> to check street address availability.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                How do I order internet over the phone?
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                Call our direct phone line at <a href={TEL_HREF} className="font-bold text-blue-700">{PHONE_NUMBER}</a>. Our specialists are available <strong>Mon–Fri 7AM–8PM CT</strong> and <strong>Sat 9AM–5PM CT</strong> (Closed Sundays).
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                How much does internet cost in {formattedCity}?
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                Internet plans in {formattedCity} typically start between $30/mo. and $50/mo. depending on bandwidth requirements and provider promotions.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10 px-4 text-xs border-t border-gray-800">
        <div className="max-w-5xl mx-auto space-y-6 text-center">
          
          <div className="flex flex-wrap justify-center items-center gap-4 text-gray-300 font-medium text-xs">
            <button onClick={() => setActiveModal('privacy')} className="hover:text-amber-400 transition-colors">Privacy Policy</button>
            <span>•</span>
            <button onClick={() => setActiveModal('terms')} className="hover:text-amber-400 transition-colors">Terms of Service</button>
            <span>•</span>
            <button onClick={() => setActiveModal('disclaimer')} className="hover:text-amber-400 transition-colors">Disclaimer</button>
            <span>•</span>
            <button onClick={() => setActiveModal('dnc')} className="hover:text-amber-400 transition-colors">Do Not Call Policy</button>
          </div>

          <p className="max-w-3xl mx-auto text-[11px] text-gray-500 leading-relaxed">
            Home Tech Dealer is an independent provider comparison platform and marketing partner. Trademarks, service marks, logos, and brand names featured on this site are the property of their respective owners. Speeds and availability vary by address.
          </p>

          <p>© {new Date().getFullYear()} Home Tech Dealer. All rights reserved.</p>
        </div>
      </footer>

      {/* Pop-up Legal Overlay Modals */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] flex flex-col overflow-hidden shadow-2xl border border-gray-200 text-gray-800 text-left">
            <div className="p-4 bg-gray-900 text-white flex justify-between items-center">
              <h3 className="font-bold text-lg capitalize">
                {activeModal === 'dnc' ? 'Do Not Call Policy' : `${activeModal} Policy`}
              </h3>
              <button 
                onClick={() => setActiveModal(null)} 
                className="text-gray-400 hover:text-white font-bold text-xl px-2"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm leading-relaxed text-gray-600">
              {activeModal === 'privacy' && (
                <>
                  <p><strong>Privacy Policy:</strong> Home Tech Dealer respects your privacy. We collect minimal personal information solely for facilitating broadband and telecommunication service connections with verified providers.</p>
                  <p>Information requested over the phone or through explicit input is used strictly to verify geographic coverage and route requests. We do not sell or rent user data to unauthorized third-party marketers.</p>
                </>
              )}

              {activeModal === 'terms' && (
                <>
                  <p><strong>Terms of Service:</strong> By accessing Home Tech Dealer, you agree to use our information services for personal, non-commercial service comparison purposes.</p>
                  <p>Pricing, speed tiers, and promotional estimates are provided for informational purposes only. Final rates, installation schedules, and terms are governed by the primary telecommunication service provider upon account confirmation.</p>
                </>
              )}

              {activeModal === 'disclaimer' && (
                <>
                  <p><strong>Affiliate &amp; Partner Disclaimer:</strong> Home Tech Dealer operates as an independent referral resource and authorized marketing dealer.</p>
                  <p>All trademarks, trade names, and logos displayed remain the property of their respective owners. Mention of third-party brand names does not imply direct endorsement unless explicitly noted. Speeds, pricing, and availability vary by address.</p>
                </>
              )}

              {activeModal === 'dnc' && (
                <>
                  <p><strong>Do Not Call Policy:</strong> Home Tech Dealer strictly adheres to TCPA and federal Do Not Call guidelines.</p>
                  <p>Telephone requests placed to 1-855-215-8469 connect directly to authorized sales agents. You may request to be placed on our internal Do Not Call list at any time during a call or by written request.</p>
                </>
              )}
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-200 text-right">
              <button 
                onClick={() => setActiveModal(null)} 
                className="bg-blue-900 text-white font-bold px-5 py-2 rounded-lg text-xs hover:bg-blue-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZipPage;