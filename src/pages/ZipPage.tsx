import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  HelpCircle, 
  PhoneCall, 
  Clock, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  AlertCircle, 
  MapPin, 
  Activity, 
  ChevronDown, 
  Sparkles,
  Lock
} from 'lucide-react';
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

  // PHONE & HOURS CONFIGURATION (UNTOUCHED)
  const PHONE_NUMBER = "1 (888) 482-6192";
  const TEL_HREF = "tel:18884826192";
  const HOURS_DISPLAY = "Open 24/7";

  // CONVERSION EVENT TRACKER (UNTOUCHED)
  const trackCall = (buttonSource: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        event_category: 'Lead',
        event_action: 'Phone_Call_Click',
        event_label: `${buttonSource}_${zipCode || 'unknown'}`,
        value: 1.0,
      });
    }
  };

  // 1. PARAMETER EVALUATION & PLACEHOLDER FILTERING (UNTOUCHED)
  const rawCity = city?.trim() || '';
  const rawState = state?.trim() || '';
  const currentZip = zipCode?.trim() || '';

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

  const formattedCity = hasValidLocation
    ? rawCity.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : 'Your Location';
  const formattedState = hasValidLocation ? rawState.toUpperCase() : '';

  const locationTitle = hasValidLocation
    ? `${formattedCity}, ${formattedState} (${currentZip})`
    : 'Your Location';

  const displayZip = hasValidLocation ? currentZip : 'Your Location';

  // Dynamic daily social proof generator (UNTOUCHED)
  const dynamicInquiries = React.useMemo(() => {
    if (!currentZip || currentZip === 'Your Location') return 16;
    const numericVal = parseInt(currentZip.replace(/\D/g, ''), 10) || 75000;
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    return 11 + ((numericVal + dayOfYear) % 18);
  }, [currentZip]);

  const canonicalUrl = hasValidLocation
    ? `https://hometechdealer.com/internet/${rawState.toLowerCase()}/${rawCity.toLowerCase()}/${currentZip}`
    : `https://hometechdealer.com/internet`;

  // 2. GEO CONVERSATIONAL FAQ DATA SET (UNTOUCHED)
  const geoFaqs = [
    {
      question: `Is 5G Home Internet available at my address in ${formattedCity}?`,
      directAnswer: `Depending on your exact street in ${formattedCity}, major providers like T-Mobile 5G, Verizon 5G, or regional Gateway 5G networks may be active starting at $35/mo.`,
      details: `Because 5G relies on local tower capacity, availability is subject to real-time address validation. Call ${PHONE_NUMBER} to check your exact house or apartment.`
    },
    {
      question: `What speeds can I expect with the Gateway 5G Network?`,
      directAnswer: `Speeds scale dynamically up to ${localStats.maxSpeed} with zero data caps or throttling, making it ideal for 4K streaming, gaming, and remote work.`,
      details: `Signal strength and tower proximity are verified instantly over the phone by an address specialist.`
    },
    {
      question: `How do I claim the best promotional rate in ${displayZip}?`,
      directAnswer: `Call 1 (888) 482-6192 to connect directly with a verification specialist who checks active lines for AT&T, Spectrum, Xfinity, Frontier, and local 5G networks to lock in your introductory rate.`,
      details: `Verification lines operate 24/7.`
    }
  ];

  // 3. DYNAMIC METADATA & CANONICAL / OPEN GRAPH INJECTION (UNTOUCHED)
  useEffect(() => {
    const pageTitle = hasValidLocation
      ? `Gateway 5G Home Internet in ${formattedCity}, ${formattedState} (${currentZip}) | Starting at $35`
      : `Gateway 5G Home Internet Availability Checker | Home Tech Dealer`;
    document.title = pageTitle;

    const descriptionContent = hasValidLocation
      ? `Gateway 5G Network now available in ${formattedCity}, ${formattedState} (${currentZip}). Unlimited data, no caps, starts at $35/mo. Compare AT&T, Spectrum, Verizon & more. Call 1 (888) 482-6192.`
      : `Check 5G Home Internet availability in your location. Unlimited data starting at $35/mo. Call 1 (888) 482-6192.`;

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', descriptionContent);

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    const ogTags = [
      { property: 'og:title', content: pageTitle },
      { property: 'og:description', content: descriptionContent },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Home Tech Dealer' },
    ];

    ogTags.forEach(({ property, content }) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });
  }, [hasValidLocation, formattedCity, formattedState, currentZip, canonicalUrl]);

  // 4. FETCH DYNAMIC LOCAL STATS & NEARBY ZIP CODES (UNTOUCHED)
  useEffect(() => {
    async function fetchZipDetailsAndNearby() {
      if (!rawCity || !currentZip) return;

      const cleanCityName = rawCity.replace(/-/g, ' ').trim();

      try {
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

        const { data: nearbyData } = await supabase
          .from('zip_codes')
          .select('zip_code, state')
          .ilike('city', cleanCityName)
          .neq('zip_code', currentZip)
          .limit(25);

        if (nearbyData) {
          const filteredByState = nearbyData.filter((item: any) => {
            const itemState = (item.state || '').toLowerCase();
            return itemState === rawState.toLowerCase();
          });

          const formattedList = filteredByState
            .map((item: any) => String(item.zip_code).padStart(5, '0'))
            .filter((zip: string) => zip !== currentZip);

          const uniqueZips = Array.from(new Set(formattedList)).slice(0, 6);
          setNearbyZips(uniqueZips);
        }
      } catch (err) {
        console.warn('Nearby ZIP query fallback handled:', err);
      }
    }

    fetchZipDetailsAndNearby();
  }, [rawCity, currentZip, rawState]);

  // BRAND TICKER DATA
  const brandList = [
    { name: "AT&T Fiber & Broadband" },
    { name: "Spectrum Cable" },
    { name: "Verizon 5G Home" },
    { name: "T-Mobile 5G Home" },
    { name: "Xfinity Broadband" },
    { name: "Frontier Fiber" },
    { name: "Kinetic Fiber" },
    { name: "Optimum Internet" },
    { name: "CenturyLink DSL/Fiber" }
  ];

  // SPECIFIC CARRIER GRID DATA (WITH BLURRED PRICING)
  const carrierCards = [
    { name: "AT&T Fiber", type: "Dedicated Fiber Network", speed: "Up to 5,000 Mbps", fakePrice: "$55.00" },
    { name: "Spectrum", type: "High-Speed Coaxial Cable", speed: "Up to 1,000 Mbps", fakePrice: "$49.99" },
    { name: "Xfinity", type: "Cable & Fiber Broadband", speed: "Up to 1,200 Mbps", fakePrice: "$35.00" },
    { name: "Frontier", type: "Symmetrical Fiber Line", speed: "Up to 2,000 Mbps", fakePrice: "$44.99" },
    { name: "Verizon", type: "5G Ultra Wideband", speed: "Optimized Target", fakePrice: "$50.00" },
    { name: "HughesNet", type: "Rural Satellite Grid", speed: "Up to 100 Mbps", fakePrice: "$74.99" },
  ];

  // 5. ENHANCED JSON-LD STRUCTURED DATA SCHEMA (UNTOUCHED)
  const jsonLdSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: `Gateway 5G Internet in ${locationTitle}`,
        description: `Check availability for Gateway 5G Home Internet and compare top providers like AT&T, Spectrum, Verizon, and Xfinity in ${locationTitle}.`,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Internet',
            item: 'https://hometechdealer.com/internet',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: formattedState || 'State',
            item: `https://hometechdealer.com/internet/${rawState.toLowerCase()}`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: formattedCity || 'City',
            item: `https://hometechdealer.com/internet/${rawState.toLowerCase()}/${rawCity.toLowerCase()}`,
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: displayZip,
            item: canonicalUrl,
          },
        ],
      },
      {
        '@type': 'Service',
        name: `High-Speed Internet Verification in ${locationTitle}`,
        provider: {
          '@type': 'Organization',
          name: 'Home Tech Dealer',
          telephone: PHONE_NUMBER,
          openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            opens: '00:00',
            closes: '23:59'
          }
        },
        brand: [
          { "@type": "Brand", "name": "AT&T" },
          { "@type": "Brand", "name": "Spectrum" },
          { "@type": "Brand", "name": "Xfinity" },
          { "@type": "Brand", "name": "Verizon" },
          { "@type": "Brand", "name": "T-Mobile" },
          { "@type": "Brand", "name": "Frontier" },
          { "@type": "Brand", "name": "Kinetic" },
          { "@type": "Brand", "name": "Optimum" },
          { "@type": "Brand", "name": "CenturyLink" }
        ],
        areaServed: hasValidLocation ? {
          '@type': 'PostalCode',
          postalCode: currentZip,
          addressCountry: 'US',
        } : 'US',
      },
      {
        '@type': 'FAQPage',
        mainEntity: geoFaqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `${faq.directAnswer} ${faq.details}`,
          },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans pb-20 md:pb-0">
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
          animation: ticker 30s linear infinite;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Mobile Floating Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 p-3 z-50 md:hidden shadow-2xl flex items-center justify-between gap-2">
        <div className="text-white text-xs font-bold leading-tight">
          <span className="block text-emerald-400">Gateway 5G: Available in {displayZip}</span>
          <span className="text-[10px] text-slate-300">Starts at $35/mo • No Data Caps</span>
        </div>
        <a
          href={TEL_HREF}
          onClick={() => trackCall('mobile_bottom_floating_bar')}
          className="bg-blue-600 text-white font-bold px-5 py-2.5 rounded-lg text-sm flex items-center justify-center gap-2.5 shadow-lg active:scale-95 transition-transform whitespace-nowrap"
        >
          <PhoneCall className="w-4 h-4 text-white" />
          <span>CALL NOW</span>
        </a>
      </div>

      {/* Primary Sticky Top Bar */}
      <div 
        data-nosnippet
        className="bg-slate-900 text-white font-medium text-center py-2 px-4 text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-4 shadow-sm sticky top-0 z-40 border-b border-slate-800"
      >
        <div className="flex items-center space-x-2">
          <span className="h-2 w-2 bg-emerald-400 rounded-full animate-pulse"></span>
          <span className="text-slate-300">Gateway 5G Network Active in <strong>{locationTitle}</strong></span>
        </div>
        <div className="flex items-center text-blue-400 font-bold space-x-1">
          <PhoneCall className="w-3.5 h-3.5" />
          <a href={TEL_HREF} onClick={() => trackCall('sticky_top_bar')} className="hover:underline">
            Claim Offer: {PHONE_NUMBER}
          </a>
        </div>
      </div>

      {/* Visible Breadcrumb Navigation Bar */}
      <nav aria-label="Breadcrumb" className="bg-white text-slate-500 text-xs py-2.5 px-4 border-b border-slate-200">
        <div className="max-w-4xl mx-auto flex items-center space-x-2 overflow-x-auto whitespace-nowrap">
          <Link to="/internet" className="hover:text-slate-900 transition-colors">Internet Coverage</Link>
          <span>/</span>
          {hasValidLocation ? (
            <>
              <Link to={`/internet/${rawState.toLowerCase()}`} className="hover:text-slate-900 transition-colors">
                {formattedState}
              </Link>
              <span>/</span>
              <Link to={`/internet/${rawState.toLowerCase()}/${rawCity.toLowerCase()}`} className="hover:text-slate-900 transition-colors">
                {formattedCity}
              </Link>
              <span>/</span>
              <span className="text-slate-900 font-semibold">ZIP {displayZip}</span>
            </>
          ) : (
            <span className="text-slate-900 font-semibold">Your Location</span>
          )}
        </div>
      </nav>

      {/* THE AUTHORITY TICKER - Moved to the very top */}
      <div className="bg-white border-b border-slate-200 py-3 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 flex items-center gap-4">
          <span className="text-[10px] uppercase tracking-widest text-slate-400 font-black whitespace-nowrap flex-shrink-0 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" /> Networks Evaluated:
          </span>
          <div className="relative w-full overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            <div className="animate-ticker space-x-3">
              {[...brandList, ...brandList].map((brand, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-md text-[11px] font-semibold border border-slate-200 whitespace-nowrap bg-slate-50 text-slate-600"
                >
                  {brand.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* HERO SECTION: SINGLE HIGH-CONVERTING OFFER */}
      <section className="bg-white text-slate-900 py-10 px-4 sm:px-6 lg:px-8 border-b border-slate-200 shadow-sm relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-sm">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>TOP RATED RESIDENTIAL MATCH FOR ZIP {displayZip}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Gateway 5G Network <span className="text-blue-600">Now Available</span> in {formattedCity}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Unlimited data. No caps. Built for high-speed streaming, online gaming, and work-from-home reliability without messy cable lines.
          </p>

          {/* Pricing Highlight Box */}
          <div className="bg-slate-50 border-2 border-blue-600 p-6 sm:p-8 rounded-2xl shadow-xl space-y-6 relative max-w-xl mx-auto text-left">
            <div className="absolute -top-3 right-6 bg-blue-600 text-white font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow">
              Instant Qualification
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Introductory Rate</span>
              <div className="text-4xl font-black text-slate-900">
                Starts at $35<span className="text-lg font-bold text-slate-500">/mo*</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200 text-xs sm:text-sm text-slate-700">
              <span className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" /> Unlimited Data (No Caps)
              </span>
              <span className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" /> Easy Self-Setup Kit
              </span>
              <span className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" /> Great for Streaming & WFH
              </span>
              <span className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" /> No Contract Required
              </span>
            </div>

            {/* Scarcity Note */}
            <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg text-xs text-amber-900 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <p>
                <strong>Tower Capacity Notice:</strong> Local 5G network slots are strictly limited per neighborhood to protect speeds. Online availability maps can be delayed.
              </p>
            </div>

            <div className="pt-2">
              <a
                href={TEL_HREF}
                onClick={() => trackCall('hero_primary_button')}
                className="flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-4 rounded-xl shadow-lg text-lg transition-all transform active:scale-95 w-full"
              >
                <PhoneCall className="w-5 h-5 text-white flex-shrink-0" />
                <span className="whitespace-nowrap">Call to Claim Offer: {PHONE_NUMBER}</span>
              </a>
            </div>

            <p className="text-center text-[11px] text-slate-400 font-medium">
              Free call • Takes 2 minutes • Zero hold times
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 py-10 flex-grow w-full space-y-10">
        
        {/* Social Proof Bar */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-emerald-900 text-xs sm:text-sm flex items-center justify-between gap-4 max-w-3xl mx-auto">
          <div className="flex items-center space-x-3">
            <span className="h-2.5 w-2.5 bg-emerald-500 rounded-full inline-block animate-ping flex-shrink-0"></span>
            <div>
              <strong>ZIP {displayZip} Verified:</strong> {dynamicInquiries} homeowners checked 5G Gateway availability today in {formattedCity}.
            </div>
          </div>
        </div>

        {/* THE NEW CARRIER GRID WITH BLURRED PRICING */}
        <section className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-2 tracking-tight">
              Compare Traditional Carriers in {formattedState}
            </h2>
            <p className="text-slate-500 text-sm max-w-2xl mx-auto">
              If your home requires a traditional wired connection, our verification desk can pull active, unadvertised rates for the major networks typically deployed across the {formattedCity} area.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {carrierCards.map((carrier, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-blue-400 transition-colors flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-extrabold text-slate-900">{carrier.name}</h3>
                    <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded border border-slate-200 uppercase tracking-wide">
                      {carrier.type}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5 mt-2">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    Speeds {carrier.speed}
                  </div>
                </div>

                {/* THE CURIOSITY GAP: BLURRED PRICE */}
                <div className="mt-5 p-3.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase font-black tracking-widest text-slate-400 block mb-0.5">Unadvertised Rate</span>
                    <div className="relative inline-flex items-center justify-center group cursor-help">
                      <span className="text-xl font-black text-slate-800 blur-sm select-none opacity-60 transition-opacity group-hover:opacity-40">{carrier.fakePrice}</span>
                      <Lock className="w-4 h-4 text-slate-700 absolute drop-shadow-md" />
                    </div>
                  </div>
                  <a
                    href={TEL_HREF}
                    onClick={() => trackCall(`unlock_rate_${carrier.name}`)}
                    className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-lg text-xs font-bold transition-all active:scale-95 flex items-center gap-1.5 shadow-sm"
                  >
                    <PhoneCall className="w-3.5 h-3.5" /> Unlock Rate
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center pt-2">
             <p className="text-[11px] text-slate-400 max-w-xl mx-auto">
               *Carrier availability and unadvertised promotional rates are strictly verified by cross-referencing your exact physical address. Call <a href={TEL_HREF} onClick={() => trackCall('grid_disclaimer_link')} className="font-semibold text-blue-600 hover:underline">{PHONE_NUMBER}</a> to unlock options.
             </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm space-y-6 max-w-3xl mx-auto">
          <div className="flex items-center space-x-2 text-slate-900 border-b border-slate-100 pb-4">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold tracking-tight">
              Frequently Asked Questions: {formattedCity} Internet
            </h2>
          </div>
          <div className="space-y-6">
            {geoFaqs.map((faq, fIdx) => (
              <div key={fIdx} className="border-b border-slate-100 pb-5 last:border-b-0 last:pb-0">
                <h3 className="text-sm font-bold text-slate-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-slate-800 bg-slate-50 p-3.5 rounded-lg border border-slate-200 mb-2">
                  {faq.directAnswer}
                </p>
                <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed pl-1">
                  {faq.details}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer (UNTOUCHED LOGIC/MODALS) */}
      <footer className="bg-slate-900 text-slate-400 py-10 px-4 text-xs border-t border-slate-800">
        <div className="max-w-3xl mx-auto space-y-6 text-center">
          
          <div className="flex flex-wrap justify-center items-center gap-4 text-slate-300 font-medium text-xs">
            <button onClick={() => setActiveModal('privacy')} className="hover:text-white transition-colors">Privacy Policy</button>
            <span>•</span>
            <button onClick={() => setActiveModal('terms')} className="hover:text-white transition-colors">Terms of Service</button>
            <span>•</span>
            <button onClick={() => setActiveModal('disclaimer')} className="hover:text-white transition-colors">Disclaimer</button>
            <span>•</span>
            <button onClick={() => setActiveModal('dnc')} className="hover:text-white transition-colors">Do Not Call Policy</button>
          </div>

          <div className="max-w-2xl mx-auto space-y-3">
            <p className="text-[10px] text-slate-500 leading-relaxed">
              Home Tech Dealer is an independent provider comparison platform and marketing partner. Promotional rates start at $35/mo and vary based on exact address matching and tower availability.
            </p>
            
            {/* SEO BRAND CONTEXT TRAP */}
            <p className="text-[10px] text-slate-600 leading-relaxed">
              <strong>Networks Evaluated:</strong> To provide accurate {locationTitle} internet options, our database cross-references real-time availability from major U.S. carriers including AT&T, Spectrum, Xfinity, Frontier, CenturyLink, Verizon, T-Mobile, EarthLink, and Optimum. Exact provider availability is restricted by physical street address.
            </p>
          </div>

          <p className="text-[10px] text-slate-600">© {new Date().getFullYear()} Home Tech Dealer. All rights reserved.</p>
        </div>
      </footer>

      {/* Pop-up Legal Overlay Modals */}
      {activeModal && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200 text-slate-800 text-left">
            <div className="p-4 bg-slate-50 border-b border-slate-200 text-slate-900 flex justify-between items-center">
              <h3 className="font-bold text-sm uppercase tracking-wide">
                {activeModal === 'dnc' ? 'Do Not Call Policy' : `${activeModal} Policy`}
              </h3>
              <button 
                onClick={() => setActiveModal(null)} 
                className="text-slate-400 hover:text-slate-700 font-bold text-xl px-2"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm leading-relaxed text-slate-600">
              {activeModal === 'privacy' && (
                <>
                  <p><strong>Privacy Policy:</strong> Home Tech Dealer respects your privacy. We collect minimal personal information solely for facilitating broadband and telecommunication service connections with verified providers.</p>
                </>
              )}

              {activeModal === 'terms' && (
                <>
                  <p><strong>Terms of Service:</strong> By accessing Home Tech Dealer, you agree to use our information services for personal, non-commercial service comparison purposes.</p>
                </>
              )}

              {activeModal === 'disclaimer' && (
                <>
                  <p><strong>Affiliate &amp; Partner Disclaimer:</strong> Home Tech Dealer operates as an independent referral resource and authorized marketing dealer.</p>
                </>
              )}

              {activeModal === 'dnc' && (
                <>
                  <p><strong>Do Not Call Policy:</strong> Home Tech Dealer strictly adheres to TCPA and federal Do Not Call guidelines.</p>
                </>
              )}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 text-right">
              <button 
                onClick={() => setActiveModal(null)} 
                className="bg-slate-900 text-white font-semibold px-5 py-2 rounded-md text-xs hover:bg-slate-800 transition-colors"
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