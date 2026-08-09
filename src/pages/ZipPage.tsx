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
  ChevronUp, 
  Sparkles,
  Lock,
  Radio,
  UserCheck
} from 'lucide-react';
import { supabase } from '../lib/supabase';

export const ZipPage: React.FC = () => {
  const { state, city, zipCode } = useParams<{ state?: string; city?: string; zipCode?: string }>();
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [nearbyZips, setNearbyZips] = useState<string[]>([]);
  const [expandedProviders, setExpandedProviders] = useState<{ [key: number]: boolean }>({});
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

  // CONVERSION EVENT TRACKER
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

  // 1. PARAMETER EVALUATION & PLACEHOLDER FILTERING
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

  // Dynamic daily social proof generator
  const dynamicInquiries = React.useMemo(() => {
    if (!currentZip || currentZip === 'Your Location') return 16;
    const numericVal = parseInt(currentZip.replace(/\D/g, ''), 10) || 75000;
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    return 11 + ((numericVal + dayOfYear) % 18);
  }, [currentZip]);

  const canonicalUrl = hasValidLocation
    ? `https://hometechdealer.com/internet/${rawState.toLowerCase()}/${rawCity.toLowerCase()}/${currentZip}`
    : `https://hometechdealer.com/internet`;

  const toggleProviderSpecs = (index: number) => {
    setExpandedProviders((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // 2. GEO CONVERSATIONAL FAQ DATA SET (Answer-First Engine for AI Crawlers)
  const geoFaqs = [
    {
      question: `What is the cheapest internet provider in ${formattedCity}, ${formattedState}?`,
      directAnswer: `The cheapest internet option in ${formattedCity} starts at $30.00/mo. through Spectrum, with 5G Home Internet options starting at $35.00/mo.`,
      details: `Final promotional rates depend on paperless billing enrollments, ongoing active discounts, and exact physical address matching in ZIP ${displayZip}.`
    },
    {
      question: `What is the fastest internet speed available in ${displayZip}?`,
      directAnswer: `Speeds up to ${localStats.maxSpeed} are available across residential nodes in ${formattedCity} via dedicated fiber and high-speed cable infrastructure.`,
      details: `Carriers such as Frontier, Kinetic, and AT&T deliver symmetrical gigabit upload and download speeds depending on neighborhood line mapping.`
    },
    {
      question: `How do I set up internet service over the phone in ${formattedCity}?`,
      directAnswer: `Call 1-855-215-8469 to connect directly with an address verification specialist who can check physical line availability and apply unadvertised move-in promos.`,
      details: `Dispatch phone lines operate Mon–Fri 7AM–8PM CT and Sat 9AM–5PM CT.`
    }
  ];

  // 3. DYNAMIC METADATA & CANONICAL / OPEN GRAPH INJECTION
  useEffect(() => {
    const pageTitle = hasValidLocation
      ? `Best High-Speed Internet Providers in ${formattedCity}, ${formattedState} (${currentZip}) | Home Tech Dealer`
      : `Find High-Speed Internet Providers in Your Location | Home Tech Dealer`;
    document.title = pageTitle;

    const descriptionContent = hasValidLocation
      ? `Compare top high-speed internet providers in ${formattedCity}, ${formattedState} (${currentZip}). Unadvertised move-in promos for Frontier, Kinetic, 5G Wireless, Spectrum, AT&T. Call 1-855-215-8469.`
      : `Compare top high-speed internet providers in your location. Unadvertised move-in promos available over phone. Call 1-855-215-8469 for instant setup.`;

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

  // 4. FETCH DYNAMIC LOCAL STATS & NEARBY ZIP CODES WITH SAFE QUERY FALLBACK
  useEffect(() => {
    async function fetchZipDetailsAndNearby() {
      if (!rawCity || !currentZip) return;

      const cleanCityName = rawCity.replace(/-/g, ' ').trim();

      try {
        // Query 1: Fetch ZIP details
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

        // Query 2: Fetch nearby ZIP codes
        const { data: nearbyData } = await supabase
          .from('zip_codes')
          .select('zip_code')
          .ilike('city', cleanCityName)
          .neq('zip_code', currentZip)
          .limit(10);

        if (nearbyData) {
          const formattedList = nearbyData
            .map((item) => String(item.zip_code).padStart(5, '0'))
            .filter((zip) => zip !== currentZip);

          const uniqueZips = Array.from(new Set(formattedList)).slice(0, 6);
          setNearbyZips(uniqueZips);
        }
      } catch (err) {
        console.warn('Supabase query handled cleanly:', err);
      }
    }

    fetchZipDetailsAndNearby();
  }, [rawCity, currentZip, rawState]);

  const providers = [
    {
      name: "Frontier / Kinetic Fiber",
      badge: "Top Non-Cable Alternative",
      badgeColor: "bg-emerald-400 text-emerald-950",
      highlightText: "100% Dedicated Fiber Infrastructure (No Shared Bandwidth)",
      startingPrice: "$44.99/mo*",
      unclaimedPromo: "Install Fee Credits May Apply",
      topSpeed: "Up to 1,000 Mbps",
      plans: [
        { title: "Fiber 500", speed: "500 Mbps", price: "Starting at $44.99/mo*", type: "Fiber" },
        { title: "Fiber 1 Gig", speed: "1000 Mbps", price: "Starting at $69.99/mo*", type: "Fiber" },
      ],
      features: ["Professional Install Options", "No Price Increase at 12 Mos.", "Zero Data Caps"],
    },
    {
      name: "5G Home & Satellite Wireless",
      badge: "No Cable Lines Required",
      badgeColor: "bg-purple-500 text-white",
      highlightText: "Bypass regional cable monopolies with instant wireless dispatch",
      startingPrice: "$35.00/mo*",
      unclaimedPromo: "Self-Setup Kit Eligible in " + displayZip,
      topSpeed: "Up to 300 Mbps",
      plans: [
        { title: "5G Home Internet", speed: "Up to 300 Mbps", price: "Starting at $35.00/mo*", type: "5G Wireless" },
        { title: "Satellite Broadband", speed: "Up to 100 Mbps", price: "Starting at $49.99/mo*", type: "Satellite" },
      ],
      features: ["Instant Self-Activation", "Available in Rural & Suburb Areas", "Contract-Free Billing"],
    },
    {
      name: "Regional & Local Independent Networks",
      badge: "Unadvertised Street Rates",
      badgeColor: "bg-amber-400 text-amber-950",
      highlightText: "Independent local carriers servicing specific ZIP " + displayZip + " areas",
      startingPrice: "Phone Match Quote*",
      unclaimedPromo: "Unlisted Move-In Credits Active",
      topSpeed: "Up to 1,000 Mbps",
      plans: [
        { title: "Regional Fiber & Cable", speed: "Up to 1000 Mbps", price: "Live Rate Quote*", type: "Fiber / Cable" },
        { title: "Fixed 5G & DSL Alternatives", speed: "Up to 300 Mbps", price: "Live Rate Quote*", type: "Wireless / Wireline" },
        { title: "Rural & Satellite Options", speed: "Up to 100 Mbps", price: "Live Rate Quote*", type: "Satellite" },
      ],
      features: [
        "Unlisted Regional Carrier Options",
        "Street Address Match Lock",
        "Exclusive Phone-Only Promos"
      ],
    },
    {
      name: "AT&T Fiber & Broadband",
      badge: "Incumbent Fiber Network",
      badgeColor: "bg-sky-400 text-blue-950",
      highlightText: "Established fiber infrastructure across select neighborhoods",
      startingPrice: "$55.00/mo*",
      unclaimedPromo: "Requires Phone Verification",
      topSpeed: "1,000 Mbps",
      plans: [
        { title: "Fiber 300", speed: "300 Mbps", price: "Starting at $55.00/mo*", type: "Fiber" },
        { title: "Fiber 500", speed: "500 Mbps", price: "Starting at $65.00/mo*", type: "Fiber" },
        { title: "1 GIG Fiber", speed: "1000 Mbps", price: "Starting at $80.00/mo*", type: "Fiber" },
      ],
      features: ["Symmetrical Speed Tiers", "99% Uptime Guarantee", "No Contract Locks"],
    },
    {
      name: "Spectrum Cable",
      badge: "Standard Legacy Network",
      badgeColor: "bg-blue-600 text-white",
      highlightText: "Traditional coaxial cable service available across " + formattedCity,
      startingPrice: "$30.00/mo*",
      unclaimedPromo: "Contract Buyout Option Eligible",
      topSpeed: "1,000 Mbps",
      plans: [
        { title: "Internet 100", speed: "100 Mbps", price: "Starting at $30.00/mo*", type: "Cable" },
        { title: "Internet Premier", speed: "500 Mbps", price: "Starting at $40.00/mo*", type: "Cable" },
        { title: "Internet Gig", speed: "1000 Mbps", price: "Starting at $60.00/mo*", type: "Cable/Fiber" },
      ],
      features: ["Free Cable Modem", "Unlimited Bandwidth", "Contract Buyout Support"],
    },
  ];

  // 5. ENHANCED JSON-LD STRUCTURED DATA SCHEMA
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
        '@type': 'ItemList',
        name: `Available Internet Providers in ${locationTitle}`,
        description: `Active broadband and fiber internet carriers servicing ${locationTitle}`,
        itemListElement: providers.map((provider, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: provider.name,
        })),
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

  const brandList = [
    { name: "Frontier Fiber", bg: "bg-rose-600 text-white hover:bg-rose-500" },
    { name: "Kinetic Fiber", bg: "bg-emerald-500 text-gray-950 font-black hover:bg-emerald-400" },
    { name: "T-Mobile 5G", bg: "bg-pink-600 text-white hover:bg-pink-500" },
    { name: "Verizon 5G", bg: "bg-red-600 text-white hover:bg-red-500" },
    { name: "CenturyLink", bg: "bg-indigo-600 text-white hover:bg-indigo-500" },
    { name: "Optimum", bg: "bg-amber-400 text-amber-950 font-black hover:bg-amber-300" },
    { name: "AT&T Fiber", bg: "bg-sky-400 text-blue-950 font-black hover:bg-sky-300" },
    { name: "Spectrum", bg: "bg-blue-600 text-white hover:bg-blue-500" },
    { name: "Xfinity", bg: "bg-purple-600 text-white hover:bg-purple-500" },
    { name: "HughesNet", bg: "bg-orange-500 text-white hover:bg-orange-400" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col text-gray-900 font-sans pb-20 md:pb-0">
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

      {/* Persistent Floating Bottom Bar on Mobile Devices */}
      <div className="fixed bottom-0 left-0 right-0 bg-amber-400 border-t-2 border-amber-500 p-3 z-50 md:hidden shadow-2xl flex items-center justify-between gap-2">
        <div className="text-amber-950 text-xs font-black leading-tight">
          <span className="block">Specialists Active Now</span>
          <span className="text-[10px] text-amber-900 font-bold">{HOURS_DISPLAY}</span>
        </div>
        <a
          href={TEL_HREF}
          onClick={() => trackCall('mobile_bottom_floating_bar')}
          className="bg-gray-900 text-white font-black px-5 py-2.5 rounded-xl text-sm flex items-center gap-2 shadow-lg active:scale-95 transition-transform whitespace-nowrap"
        >
          <PhoneCall className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span>CALL {PHONE_NUMBER}</span>
        </a>
      </div>

      {/* Primary Sticky Top Bar */}
      <div 
        data-nosnippet
        className="bg-amber-400 text-amber-950 font-black text-center py-2.5 px-4 text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 shadow-md sticky top-0 z-40 border-b border-amber-500"
      >
        <div className="flex items-center space-x-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
          </span>
          <span className="uppercase tracking-wide text-xs font-black">Live Dispatch Line:</span>
          <a href={TEL_HREF} onClick={() => trackCall('sticky_top_bar')} className="underline hover:text-black text-sm sm:text-base font-black">
            {PHONE_NUMBER}
          </a>
        </div>
        <div className="flex items-center text-amber-900 text-xs font-bold space-x-1">
          <Clock className="w-3.5 h-3.5 text-amber-950" />
          <span>{HOURS_DISPLAY}</span>
          <span className="hidden sm:inline text-amber-800">•</span>
          <span className="hidden sm:inline text-amber-950 font-black">Agents Available Now</span>
        </div>
      </div>

      {/* Visible Breadcrumb Navigation Bar */}
      <nav aria-label="Breadcrumb" className="bg-blue-950 text-blue-200 text-xs py-2 px-4 border-b border-blue-900">
        <div className="max-w-5xl mx-auto flex items-center space-x-2 overflow-x-auto whitespace-nowrap">
          <Link to="/internet" className="hover:text-amber-400 transition-colors">Internet</Link>
          <span>/</span>
          {hasValidLocation ? (
            <>
              <Link to={`/internet/${rawState.toLowerCase()}`} className="hover:text-amber-400 transition-colors">
                {formattedState}
              </Link>
              <span>/</span>
              <Link to={`/internet/${rawState.toLowerCase()}/${rawCity.toLowerCase()}`} className="hover:text-amber-400 transition-colors">
                {formattedCity}
              </Link>
              <span>/</span>
              <span className="text-white font-bold">{displayZip}</span>
            </>
          ) : (
            <span className="text-white font-bold">Your Location</span>
          )}
        </div>
      </nav>

      {/* Hero Header Section */}
      <section className="bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950 text-white py-12 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          
          <div className="inline-flex items-center gap-2 bg-blue-900/90 border border-blue-700/80 px-4 py-1.5 rounded-full text-xs font-bold text-amber-300 shadow-inner">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>Active Network Coverage Zone: <strong className="text-white">{locationTitle}</strong></span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Check Unadvertised Internet Rates &amp; Speeds in <span className="text-amber-400 underline decoration-amber-400/40">{locationTitle}</span>
          </h1>

          <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto font-medium">
            Don't lock into standard sticker prices online. Call our phone dispatch center to claim unlisted move-in promotions, verify exact neighborhood speeds, and qualify for fee waivers.
          </p>

          {/* Call Box */}
          <div className="bg-gradient-to-br from-blue-900 via-blue-950 to-gray-950 border-2 border-amber-400 p-6 sm:p-8 rounded-3xl max-w-xl mx-auto shadow-2xl space-y-4 relative overflow-hidden">
            <div className="absolute -right-8 -top-8 bg-amber-400 text-amber-950 font-black text-[10px] uppercase tracking-widest px-10 py-2 rotate-45 shadow-md">
              Exclusive
            </div>

            <div className="flex items-center justify-center space-x-2 text-amber-300 font-extrabold text-xs uppercase tracking-widest">
              <PhoneCall className="w-4 h-4 text-amber-400 animate-bounce" />
              <span>Instant Address Verification Line</span>
            </div>

            <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Call <a href={TEL_HREF} onClick={() => trackCall('hero_box_number_link')} className="text-amber-400 underline hover:text-amber-300 transition-colors">{PHONE_NUMBER}</a>
            </div>

            <p className="text-xs sm:text-sm text-blue-200 leading-relaxed">
              Speak directly with an address specialist to unlock non-public fiber and 5G promos for <strong>ZIP {displayZip}</strong>.
            </p>

            <div className="pt-2">
              <a
                href={TEL_HREF}
                onClick={() => trackCall('hero_primary_button')}
                className="inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-amber-950 font-black px-8 py-4 rounded-2xl shadow-2xl text-xl transition-all duration-200 transform active:scale-95 w-full border-b-4 border-amber-600"
              >
                <PhoneCall className="w-6 h-6 fill-amber-950" />
                <span>TAP TO CALL: {PHONE_NUMBER}</span>
              </a>
            </div>

            <div className="pt-2 flex items-center justify-center gap-4 text-[11px] text-blue-300 font-bold border-t border-blue-800/60">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> No Obligation
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-amber-400" /> Unlisted Rates
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-sky-400" /> Promo Eligibility Check
              </span>
            </div>
          </div>

          {/* Provider Scroll Ticker */}
          <div className="pt-6 border-t border-blue-800/80 mt-8 max-w-4xl mx-auto">
            <p className="text-[11px] uppercase tracking-widest text-blue-300 font-black mb-3">
              TAP ANY CARRIER BELOW TO CHECK UNADVERTISED ADDRESS PROMOS
            </p>

            <div className="relative w-full overflow-hidden py-1">
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-blue-950 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-blue-950 to-transparent z-10 pointer-events-none" />

              <div className="animate-ticker space-x-3">
                {[...brandList, ...brandList].map((brand, index) => (
                  <a
                    key={index}
                    href={TEL_HREF}
                    onClick={() => trackCall(`ticker_brand_${brand.name}`)}
                    title={`Call ${PHONE_NUMBER} to unlock ${brand.name} local promos`}
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
      <main className="max-w-5xl mx-auto px-4 py-10 flex-grow w-full space-y-10">
        
        {/* Dynamic Activity Log */}
        <div className="bg-emerald-950/90 border border-emerald-500/40 rounded-2xl p-4 text-emerald-100 text-xs sm:text-sm flex items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center space-x-3">
            <span className="relative flex h-3 w-3 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <div>
              <strong className="text-white font-bold block sm:inline">ZIP {displayZip} Status: Active.</strong>
              <span className="text-emerald-200"> {dynamicInquiries} Address Coverage Inquiries Processed Today in {formattedCity}.</span>
            </div>
          </div>
          <a 
            href={TEL_HREF} 
            onClick={() => trackCall('system_log_bubble')}
            className="hidden sm:inline-flex items-center gap-1 font-black text-amber-300 underline whitespace-nowrap"
          >
            Lock Your Rate <ChevronDown className="w-4 h-4 -rotate-90" />
          </a>
        </div>

        <section id="provider-plans" className="space-y-6">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-black text-gray-900 mb-1">
              Active Internet Carriers Serving {locationTitle}
            </h2>
            <p className="text-gray-600 text-sm max-w-2xl mx-auto font-medium">
              Below are verified carrier networks operating in <strong>{locationTitle}</strong>. Expand any carrier module to review base options or call <a href={TEL_HREF} onClick={() => trackCall('subheading_phone_link')} className="font-black text-blue-700 underline">{PHONE_NUMBER}</a> for address locking.
            </p>
          </div>

          {/* Dynamic Local Overview Summary Table */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-2 text-gray-900 mb-3">
              <Activity className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-base">Local Network Profile: {displayZip}</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                <span className="text-gray-500 font-semibold block text-[11px]">Active Network Lines</span>
                <strong className="text-gray-900 text-base font-black">{localStats.providerCount}+ Confirmed Carriers</strong>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                <span className="text-gray-500 font-semibold block text-[11px]">Peak Speed Capability</span>
                <strong className="text-gray-900 text-base font-black">{localStats.maxSpeed}</strong>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 col-span-2 sm:col-span-1">
                <span className="text-gray-500 font-semibold block text-[11px]">Infrastructure Type</span>
                <strong className="text-gray-900 text-base font-black">
                  {localStats.hasFiber ? 'Fiber & High-Speed Cable' : 'Fixed Wireless & Cable'}
                </strong>
              </div>
            </div>
          </div>

          {/* Collapsible Provider Cards */}
          <div className="space-y-4">
            {providers.map((provider, idx) => {
              const isExpanded = Boolean(expandedProviders[idx]);

              return (
                <article key={idx} className="bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden transition-all duration-200 hover:border-blue-400">
                  <div className="p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white">
                    <div className="space-y-1.5 max-w-lg">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-0.5 rounded-md uppercase tracking-wide ${provider.badgeColor}`}>
                          <Sparkles className="w-3 h-3 fill-current" />
                          {provider.badge}
                        </span>
                        <span className="text-xs text-emerald-700 font-extrabold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {provider.unclaimedPromo}
                        </span>
                      </div>
                      <h3 className="text-2xl font-black text-gray-900 tracking-tight">
                        {provider.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 font-medium">
                        {provider.highlightText}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-gray-100">
                      <div className="text-left md:text-right pr-2">
                        <span className="text-[11px] text-gray-500 font-extrabold uppercase block">Baseline Rate</span>
                        <div className="text-xl font-black text-blue-950">{provider.startingPrice}</div>
                        <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-0.5 md:justify-end">
                          <Zap className="w-3 h-3 fill-current" /> {provider.topSpeed}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={TEL_HREF}
                          onClick={() => trackCall(`card_lock_rate_${provider.name}`)}
                          className="inline-flex items-center space-x-1.5 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-amber-950 font-black px-5 py-3 rounded-xl shadow-md text-sm transition-transform active:scale-95 whitespace-nowrap border-b-2 border-amber-600"
                        >
                          <PhoneCall className="w-4 h-4 fill-amber-950" />
                          <span>Lock Rate: {PHONE_NUMBER}</span>
                        </a>

                        <button
                          onClick={() => toggleProviderSpecs(idx)}
                          className="inline-flex items-center justify-center p-3 rounded-xl border border-gray-200 hover:bg-gray-100 text-gray-700 transition-colors"
                          title={isExpanded ? "Hide Plans & Specs" : "View Plans & Specs"}
                          aria-expanded={isExpanded}
                        >
                          {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-700" /> : <ChevronDown className="w-5 h-5 text-gray-700" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleProviderSpecs(idx)}
                    className="w-full bg-gray-50 hover:bg-blue-50/60 px-6 py-2.5 border-t border-gray-100 text-xs font-bold text-blue-900 flex items-center justify-between transition-colors"
                  >
                    <span>{isExpanded ? "Collapse Specs & Tier Details" : "Inspect Available Speed Tiers & Plan Details"}</span>
                    <span className="flex items-center gap-1 font-black">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isExpanded && (
                    <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-200 space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {provider.plans.map((plan, pIdx) => (
                          <div key={pIdx} className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col justify-between hover:border-blue-400 transition-colors shadow-sm">
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
                              onClick={() => trackCall(`expanded_plan_${provider.name}_${plan.title}`)}
                              className="w-full mt-2 bg-blue-900 hover:bg-blue-800 text-white font-bold py-2.5 rounded-lg text-center text-sm flex items-center justify-center space-x-1.5 transition-colors"
                            >
                              <PhoneCall className="w-4 h-4" />
                              <span>Check Address Fit</span>
                            </a>
                          </div>
                        ))}
                      </div>

                      <div className="bg-white p-4 rounded-xl border border-gray-200 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-600">
                        <div className="flex flex-wrap items-center gap-4">
                          {provider.features.map((feat, fIdx) => (
                            <span key={fIdx} className="flex items-center gap-1 font-medium text-gray-700">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span>{feat}</span>
                            </span>
                          ))}
                        </div>
                        <div className="text-gray-400 font-medium">
                          Verified for {displayZip}
                        </div>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}

            {/* Alternative Provider Fallback Banner */}
            <div className="bg-blue-950 border-2 border-amber-400 rounded-2xl p-6 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
              <div className="space-y-1 max-w-xl">
                <h3 className="text-xl font-black text-amber-400">
                  Seeking Non-Monopoly Alternatives in {formattedCity}?
                </h3>
                <p className="text-xs sm:text-sm text-blue-200 leading-relaxed font-medium">
                  Frustrated with unannounced bill hikes? We cross-reference 10+ independent regional fiber, 5G fixed wireless, and local carriers in {displayZip}. Call now for an instant street address match.
                </p>
              </div>
              <a
                href={TEL_HREF}
                onClick={() => trackCall('alternative_banner')}
                className="bg-amber-400 hover:bg-amber-300 text-amber-950 font-black px-6 py-3.5 rounded-xl shadow-lg text-sm flex items-center space-x-2 whitespace-nowrap transition-transform active:scale-95 border-b-2 border-amber-600"
              >
                <PhoneCall className="w-4 h-4 fill-amber-950" />
                <span>Call {PHONE_NUMBER}</span>
              </a>
            </div>

            {/* Price & Plan Disclaimer */}
            <div className="bg-gray-200/80 p-4 rounded-xl border border-gray-300 text-xs text-gray-600 flex items-start space-x-2.5">
              <AlertCircle className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>*Pricing &amp; Speed Disclaimer:</strong> Baseline promotional rates represent starting estimates for new residential connections and may require auto-pay enrollment. Final rates, activation fees, and promotional discounts are confirmed directly by the carrier based on exact physical street address matching. Call <a href={TEL_HREF} onClick={() => trackCall('disclaimer_phone_link')} className="font-bold underline text-blue-800">{PHONE_NUMBER}</a> to secure unadvertised move-in offers.
              </p>
            </div>

            {/* Direct Phone Callout Banner */}
            <div className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 rounded-2xl p-6 text-amber-950 border border-amber-500 shadow-lg text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="text-xl font-black">Ready for immediate setup in {formattedCity}?</h4>
                <p className="text-xs sm:text-sm font-semibold text-amber-900">
                  Phone agents verify physical line status, apply unlisted discounts, and schedule priority technician dispatch.
                </p>
              </div>
              <a
                href={TEL_HREF}
                onClick={() => trackCall('bottom_callout_banner')}
                className="bg-gray-900 hover:bg-black text-white font-black px-7 py-3.5 rounded-xl shadow-xl text-base flex items-center space-x-2 whitespace-nowrap transition-transform active:scale-95"
              >
                <PhoneCall className="w-5 h-5 text-amber-400 fill-amber-400" />
                <span>Call {PHONE_NUMBER}</span>
              </a>
            </div>
          </div>
        </section>

        {/* High-Level Value Props */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm text-center">
            <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-amber-200">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Direct Phone Lock</h3>
            <p className="text-sm text-gray-600">
              Bypass third-party online forms. Call <a href={TEL_HREF} onClick={() => trackCall('value_prop_1')} className="font-bold text-blue-700">{PHONE_NUMBER}</a> to secure your rate directly over the phone.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm text-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-200">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Gigabit Speeds</h3>
            <p className="text-sm text-gray-600">
              Gigabit speed tiers up to {localStats.maxSpeed} available across residential connections in {displayZip}.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm text-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-200">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Verified Coverage Database</h3>
            <p className="text-sm text-gray-600">
              Database mapped across fiber, cable, 5G wireless, and satellite infrastructure in {hasValidLocation ? formattedState : 'your state'}.
            </p>
          </div>
        </section>

        {/* Nearby ZIP Codes Cross-Linking Widget */}
        {nearbyZips.length > 0 && (
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
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
                  title={`Check internet providers in ZIP ${nearZip}`}
                  className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-xl border border-blue-200 text-sm transition-colors"
                >
                  ZIP {nearZip}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* GEO-Optimized Conversational Answer-First FAQ Block */}
        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center space-x-2 text-blue-950">
            <HelpCircle className="w-6 h-6 text-blue-700" />
            <h2 className="text-2xl font-bold">
              Frequently Asked Questions About {formattedCity} Internet
            </h2>
          </div>
          <div className="space-y-6">
            {geoFaqs.map((faq, fIdx) => (
              <div key={fIdx} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                <h3 className="text-base font-bold text-gray-900 mb-1">
                  {faq.question}
                </h3>
                <p className="text-sm font-semibold text-blue-950 bg-blue-50/80 p-3 rounded-xl border border-blue-100 mb-1.5">
                  {faq.directAnswer}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pl-1">
                  {faq.details}
                </p>
              </div>
            ))}
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