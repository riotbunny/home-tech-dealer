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

  const toggleProviderSpecs = (index: number) => {
    setExpandedProviders((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // 2. GEO CONVERSATIONAL FAQ DATA SET (UNTOUCHED)
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
      directAnswer: `Call 1 (888) 482-6192 to connect directly with an address verification specialist who can check physical line availability and apply unadvertised move-in promos.`,
      details: `Dispatch phone lines operate 24/7.`
    }
  ];

  // 3. DYNAMIC METADATA & CANONICAL / OPEN GRAPH INJECTION (UNTOUCHED)
  useEffect(() => {
    const pageTitle = hasValidLocation
      ? `Best High-Speed Internet Providers in ${formattedCity}, ${formattedState} (${currentZip}) | Home Tech Dealer`
      : `Find High-Speed Internet Providers in Your Location | Home Tech Dealer`;
    document.title = pageTitle;

    const descriptionContent = hasValidLocation
      ? `Compare top high-speed internet providers in ${formattedCity}, ${formattedState} (${currentZip}). Unadvertised move-in promos for Frontier, Kinetic, 5G Wireless, Spectrum, AT&T. Call 1 (888) 482-6192.`
      : `Compare top high-speed internet providers in your location. Unadvertised move-in promos available over phone. Call 1 (888) 482-6192 for instant setup.`;

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

  // DATA ARRAY (UNTOUCHED)
  const providers = [
    {
      name: "Frontier / Kinetic Fiber",
      badge: "Top Non-Cable Alternative",
      badgeColor: "bg-emerald-100 text-emerald-800",
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
      badgeColor: "bg-slate-100 text-slate-800",
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
      badgeColor: "bg-blue-50 text-blue-800",
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
      badgeColor: "bg-slate-100 text-slate-800",
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
      badgeColor: "bg-slate-100 text-slate-800",
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

  // 5. ENHANCED JSON-LD STRUCTURED DATA SCHEMA (UNTOUCHED)
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
          openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday'
            ],
            opens: '00:00',
            closes: '23:59'
          }
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
    { name: "Frontier Fiber", bg: "bg-slate-100 text-slate-700 hover:bg-slate-200" },
    { name: "Kinetic Fiber", bg: "bg-slate-100 text-slate-700 hover:bg-slate-200" },
    { name: "T-Mobile 5G", bg: "bg-slate-100 text-slate-700 hover:bg-slate-200" },
    { name: "Verizon 5G", bg: "bg-slate-100 text-slate-700 hover:bg-slate-200" },
    { name: "CenturyLink", bg: "bg-slate-100 text-slate-700 hover:bg-slate-200" },
    { name: "Optimum", bg: "bg-slate-100 text-slate-700 hover:bg-slate-200" },
    { name: "AT&T Fiber", bg: "bg-slate-100 text-slate-700 hover:bg-slate-200" },
    { name: "Spectrum", bg: "bg-slate-100 text-slate-700 hover:bg-slate-200" },
    { name: "Xfinity", bg: "bg-slate-100 text-slate-700 hover:bg-slate-200" },
    { name: "HughesNet", bg: "bg-slate-100 text-slate-700 hover:bg-slate-200" },
  ];

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
          animation: ticker 35s linear infinite;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Persistent Floating Bottom Bar on Mobile Devices (Refined for Trust) */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 p-3 z-50 md:hidden shadow-2xl flex items-center justify-between gap-2">
        <div className="text-white text-xs font-bold leading-tight">
          <span className="block text-slate-300">Carrier Verification Desk</span>
          <span className="text-[10px] text-emerald-400 font-bold">{HOURS_DISPLAY}</span>
        </div>
        <a
          href={TEL_HREF}
          onClick={() => trackCall('mobile_bottom_floating_bar')}
          className="bg-blue-600 text-white font-bold px-5 py-2.5 rounded-lg text-sm flex items-center gap-2 shadow-lg active:scale-95 transition-transform whitespace-nowrap"
        >
          <PhoneCall className="w-4 h-4 text-white" />
          <span>CALL {PHONE_NUMBER}</span>
        </a>
      </div>

      {/* Primary Sticky Top Bar (Neutral & Professional) */}
      <div 
        data-nosnippet
        className="bg-white text-slate-700 font-medium text-center py-2.5 px-4 text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-4 shadow-sm sticky top-0 z-40 border-b border-slate-200"
      >
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span className="uppercase tracking-wide text-[11px] font-bold text-slate-500">Official Verification Desk:</span>
          <a href={TEL_HREF} onClick={() => trackCall('sticky_top_bar')} className="text-blue-700 font-bold hover:underline">
            {PHONE_NUMBER}
          </a>
        </div>
        <div className="flex items-center text-slate-500 text-xs font-medium space-x-1.5">
          <Clock className="w-3.5 h-3.5" />
          <span>{HOURS_DISPLAY}</span>
          <span className="hidden sm:inline text-slate-300">|</span>
          <span className="hidden sm:inline text-emerald-600 font-semibold flex items-center gap-1">
             <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full inline-block"></span>
             Agents Available
          </span>
        </div>
      </div>

      {/* Visible Breadcrumb Navigation Bar */}
      <nav aria-label="Breadcrumb" className="bg-slate-900 text-slate-400 text-xs py-2.5 px-4 border-b border-slate-800">
        <div className="max-w-5xl mx-auto flex items-center space-x-2 overflow-x-auto whitespace-nowrap">
          <Link to="/internet" className="hover:text-white transition-colors">Internet Coverage</Link>
          <span>/</span>
          {hasValidLocation ? (
            <>
              <Link to={`/internet/${rawState.toLowerCase()}`} className="hover:text-white transition-colors">
                {formattedState}
              </Link>
              <span>/</span>
              <Link to={`/internet/${rawState.toLowerCase()}/${rawCity.toLowerCase()}`} className="hover:text-white transition-colors">
                {formattedCity}
              </Link>
              <span>/</span>
              <span className="text-white font-medium">ZIP {displayZip}</span>
            </>
          ) : (
            <span className="text-white font-medium">Your Location</span>
          )}
        </div>
      </nav>

      {/* Hero Header Section (Clean, Authoritative Look) */}
      <section className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 overflow-hidden relative border-b border-slate-800">
        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          
          <div className="inline-flex items-center gap-2 bg-slate-800/80 border border-slate-700 px-4 py-1.5 rounded-full text-[11px] font-medium text-slate-300 shadow-inner tracking-wide">
            <Activity className="w-3.5 h-3.5 text-blue-400" />
            <span>Independent Infrastructure Report: <strong className="text-white">{locationTitle}</strong></span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Verify Carrier Availability &amp; Infrastructure in <span className="text-blue-400">{locationTitle}</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto font-normal">
            Access official network data for ZIP {displayZip}. Call the verification desk to confirm exact street-level speeds, check active infrastructure, and apply address-specific discounts.
          </p>

          {/* Call Box (Structured Data Utility Look) */}
          <div className="bg-white text-slate-900 border border-slate-200 p-6 sm:p-8 rounded-2xl max-w-xl mx-auto shadow-xl space-y-5 relative mt-8">
            <div className="flex items-center justify-center space-x-2 text-slate-500 font-bold text-xs uppercase tracking-widest border-b border-slate-100 pb-4">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Local Carrier Match Specialists</span>
            </div>

            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Call <a href={TEL_HREF} onClick={() => trackCall('hero_box_number_link')} className="text-blue-700 hover:underline transition-colors">{PHONE_NUMBER}</a>
            </div>

            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-md mx-auto">
              Speak directly with an independent address specialist to verify active line infrastructure and unlock unlisted residential promos for <strong>ZIP {displayZip}</strong>.
            </p>

            <div className="pt-2">
              <a
                href={TEL_HREF}
                onClick={() => trackCall('hero_primary_button')}
                className="inline-flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl shadow-md text-lg transition-all duration-200 transform active:scale-95 w-full"
              >
                <PhoneCall className="w-5 h-5 text-white" />
                <span>Verify Address Match (Free Call)</span>
              </a>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] text-slate-400 font-medium">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-300" /> No Obligation
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-300" /> Objective Comparisons
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-300" /> Instant Promo Check
              </span>
            </div>
          </div>

          {/* Provider Scroll Ticker (Subtle Data Feed) */}
          <div className="pt-8 mt-4 max-w-4xl mx-auto opacity-70">
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3">
              Data synchronized from major networks operating in {formattedState}
            </p>

            <div className="relative w-full overflow-hidden py-1">
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />

              <div className="animate-ticker space-x-3">
                {[...brandList, ...brandList].map((brand, index) => (
                  <span
                    key={index}
                    className={`inline-flex items-center px-4 py-1.5 rounded-md text-[11px] font-medium border border-slate-700 whitespace-nowrap bg-slate-800 text-slate-300`}
                  >
                    {brand.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 py-8 flex-grow w-full space-y-8">
        
        {/* Dynamic Activity Log (Moved Up, Styled as Utility Status) */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 sm:px-5 text-slate-600 text-[11px] sm:text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center space-x-2.5">
            <span className="flex h-2 w-2 relative">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <div>
              <strong className="text-slate-900 font-semibold">System Status: Network Verified.</strong>
              <span className="text-slate-500 ml-1"> {dynamicInquiries} Address lookups processed today in {formattedCity}. Last Updated: August 2026.</span>
            </div>
          </div>
          <a 
            href={TEL_HREF} 
            onClick={() => trackCall('system_log_bubble')}
            className="text-blue-600 font-medium hover:underline flex items-center gap-1 whitespace-nowrap"
          >
            Check Your Street <ChevronDown className="w-3.5 h-3.5 -rotate-90" />
          </a>
        </div>

        <section id="provider-plans" className="space-y-6 pt-4">
          <div className="text-left mb-6">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-2 tracking-tight">
              Active Internet Infrastructure in {locationTitle}
            </h2>
            <p className="text-slate-500 text-sm max-w-3xl">
              Below is the objective network data for carriers operating in <strong>{locationTitle}</strong>. Expand any module to review base options, or call the verification desk at <a href={TEL_HREF} onClick={() => trackCall('subheading_phone_link')} className="font-semibold text-blue-600 hover:underline">{PHONE_NUMBER}</a> for an exact street address match.
            </p>
          </div>

          {/* Dynamic Local Overview Summary Table (Clean Dashboard Look) */}
          <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center space-x-2 text-slate-900 mb-4 border-b border-slate-100 pb-3">
              <MapPin className="w-5 h-5 text-slate-400" />
              <h3 className="font-bold text-sm uppercase tracking-wide">Zone Profile: ZIP {displayZip}</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                <span className="text-slate-500 font-medium block text-[11px] uppercase tracking-wider mb-1">Active Network Lines</span>
                <strong className="text-slate-900 text-lg font-extrabold">{localStats.providerCount}+ Carriers Found</strong>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                <span className="text-slate-500 font-medium block text-[11px] uppercase tracking-wider mb-1">Peak Speed Capability</span>
                <strong className="text-slate-900 text-lg font-extrabold">{localStats.maxSpeed}</strong>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                <span className="text-slate-500 font-medium block text-[11px] uppercase tracking-wider mb-1">Infrastructure Type</span>
                <strong className="text-slate-900 text-lg font-extrabold">
                  {localStats.hasFiber ? 'Fiber & High-Speed Cable' : 'Fixed Wireless & Cable'}
                </strong>
              </div>
            </div>
          </div>

          {/* Collapsible Provider Cards (Table-like Utility Layout) */}
          <div className="space-y-3">
            {providers.map((provider, idx) => {
              const isExpanded = Boolean(expandedProviders[idx]);

              return (
                <article key={idx} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-200 hover:border-slate-300">
                  <div className="p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 bg-white">
                    <div className="space-y-2 max-w-xl">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wide ${provider.badgeColor}`}>
                          {provider.badge}
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
                           <ShieldCheck className="w-3 h-3 text-slate-400" />
                          {provider.unclaimedPromo}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                        {provider.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500">
                        {provider.highlightText}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-slate-100">
                      <div className="text-left md:text-right pr-2">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Est. Starting Rate</span>
                        <div className="text-xl font-extrabold text-slate-900">{provider.startingPrice}</div>
                        <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1 md:justify-end mt-0.5">
                          <Zap className="w-3 h-3 text-slate-400" /> {provider.topSpeed}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={TEL_HREF}
                          onClick={() => trackCall(`card_lock_rate_${provider.name}`)}
                          className="inline-flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-4 py-2.5 rounded-lg text-sm transition-transform active:scale-95 whitespace-nowrap"
                        >
                          <PhoneCall className="w-4 h-4 text-white" />
                          <span>Verify Exact Rate</span>
                        </a>

                        <button
                          onClick={() => toggleProviderSpecs(idx)}
                          className="inline-flex items-center justify-center p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
                          title={isExpanded ? "Hide Plans" : "View Plans"}
                          aria-expanded={isExpanded}
                        >
                          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleProviderSpecs(idx)}
                    className="w-full bg-slate-50 hover:bg-slate-100 px-6 py-2.5 border-t border-slate-200 text-xs font-semibold text-slate-600 flex items-center justify-between transition-colors"
                  >
                    <span>{isExpanded ? "Collapse Infrastructure Specs" : "View Available Speed Tiers & Infrastructure Data"}</span>
                    <span className="flex items-center gap-1">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isExpanded && (
                    <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {provider.plans.map((plan, pIdx) => (
                          <div key={pIdx} className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col justify-between hover:border-slate-300 transition-colors shadow-sm">
                            <div>
                              <div className="flex justify-between items-start mb-3">
                                <h4 className="font-bold text-slate-900 text-sm">{plan.title}</h4>
                                <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded border border-slate-200 uppercase tracking-wider">
                                  {plan.type}
                                </span>
                              </div>
                              <div className="text-xl font-extrabold text-slate-900 mb-1">{plan.price}</div>
                              <div className="text-xs text-slate-500 font-medium mb-4 flex items-center gap-1">
                                <Zap className="w-3.5 h-3.5 text-slate-400" />
                                <span>Speeds up to {plan.speed}</span>
                              </div>
                            </div>

                            <a
                              href={TEL_HREF}
                              onClick={() => trackCall(`expanded_plan_${provider.name}_${plan.title}`)}
                              className="w-full mt-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold py-2 rounded-md text-center text-xs flex items-center justify-center space-x-1.5 transition-colors"
                            >
                              <PhoneCall className="w-3.5 h-3.5" />
                              <span>Check Address Fit</span>
                            </a>
                          </div>
                        ))}
                      </div>

                      <div className="bg-white p-4 rounded-lg border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                        <div className="flex flex-wrap items-center gap-4">
                          {provider.features.map((feat, fIdx) => (
                            <span key={fIdx} className="flex items-center gap-1.5 font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                              <span>{feat}</span>
                            </span>
                          ))}
                        </div>
                        <div className="text-slate-400 font-medium">
                          Data logged for ZIP {displayZip}
                        </div>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}

            {/* Alternative Provider Fallback Banner (Professional Trust Block) */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-5 mt-6 shadow-sm">
              <div className="space-y-1.5 max-w-xl text-center sm:text-left">
                <h3 className="text-lg font-bold text-white flex items-center justify-center sm:justify-start gap-2">
                  <Activity className="w-5 h-5 text-blue-400" />
                  Seeking Independent Alternatives in {formattedCity}?
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                  Our database cross-references multiple independent regional fiber, 5G fixed wireless, and local carriers operating in {displayZip}. Call the verification desk for a completely free, objective address match.
                </p>
              </div>
              <a
                href={TEL_HREF}
                onClick={() => trackCall('alternative_banner')}
                className="bg-white hover:bg-slate-100 text-slate-900 font-bold px-6 py-3 rounded-lg shadow-sm text-sm flex items-center space-x-2 whitespace-nowrap transition-transform active:scale-95"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call {PHONE_NUMBER}</span>
              </a>
            </div>

            {/* Price & Plan Disclaimer */}
            <div className="p-4 rounded-lg border border-slate-200 text-xs text-slate-500 flex items-start space-x-3 bg-slate-50">
              <AlertCircle className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>*Data & Pricing Disclaimer:</strong> Baseline promotional rates shown represent starting estimates for new residential connections and may require auto-pay enrollment. Final rates, infrastructure availability, activation fees, and promotional discounts are confirmed directly by the carrier based on exact physical street address mapping. Call the desk at <a href={TEL_HREF} onClick={() => trackCall('disclaimer_phone_link')} className="font-semibold underline text-slate-700">{PHONE_NUMBER}</a> to verify unadvertised status.
              </p>
            </div>
          </div>
        </section>

        {/* High-Level Value Props (Clean Utility Badges) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
            <div className="w-10 h-10 bg-slate-50 text-slate-600 rounded-lg flex items-center justify-center mx-auto mb-4 border border-slate-100">
              <PhoneCall className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1.5">Direct Line Verification</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Bypass third-party online forms. Call <a href={TEL_HREF} onClick={() => trackCall('value_prop_1')} className="font-medium text-blue-600 hover:underline">{PHONE_NUMBER}</a> to check address eligibility directly over the phone.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
            <div className="w-10 h-10 bg-slate-50 text-slate-600 rounded-lg flex items-center justify-center mx-auto mb-4 border border-slate-100">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1.5">Objective Speed Data</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Speed tiers up to {localStats.maxSpeed} evaluated across active residential network nodes in {displayZip}.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
            <div className="w-10 h-10 bg-slate-50 text-slate-600 rounded-lg flex items-center justify-center mx-auto mb-4 border border-slate-100">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1.5">Independent Database</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Data aggregated across verified fiber, cable, 5G wireless, and satellite infrastructure in {hasValidLocation ? formattedState : 'your state'}.
            </p>
          </div>
        </section>

        {/* Nearby ZIP Codes Cross-Linking Widget */}
        {nearbyZips.length > 0 && (
          <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center space-x-2 text-slate-900">
              <MapPin className="w-4 h-4 text-slate-400" />
              <h3 className="text-base font-bold">
                Explore Network Coverage Near {formattedCity}
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              Comparing provider options in neighboring regions? View data for other ZIP codes in {formattedCity}, {formattedState}:
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {nearbyZips.map((nearZip) => (
                <Link
                  key={nearZip}
                  to={`/internet/${rawState.toLowerCase()}/${rawCity.toLowerCase()}/${nearZip}`}
                  title={`Check internet providers in ZIP ${nearZip}`}
                  className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 font-medium rounded-md border border-slate-200 text-xs transition-colors"
                >
                  ZIP {nearZip}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* GEO-Optimized Conversational Answer-First FAQ Block */}
        <section className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center space-x-2 text-slate-900 border-b border-slate-100 pb-4">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-extrabold tracking-tight">
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

      {/* Footer (UNTOUCHED LOGIC/MODALS, STYLED CLEAN) */}
      <footer className="bg-slate-900 text-slate-400 py-10 px-4 text-xs border-t border-slate-800">
        <div className="max-w-5xl mx-auto space-y-6 text-center">
          
          <div className="flex flex-wrap justify-center items-center gap-4 text-slate-300 font-medium text-xs">
            <button onClick={() => setActiveModal('privacy')} className="hover:text-white transition-colors">Privacy Policy</button>
            <span>•</span>
            <button onClick={() => setActiveModal('terms')} className="hover:text-white transition-colors">Terms of Service</button>
            <span>•</span>
            <button onClick={() => setActiveModal('disclaimer')} className="hover:text-white transition-colors">Disclaimer</button>
            <span>•</span>
            <button onClick={() => setActiveModal('dnc')} className="hover:text-white transition-colors">Do Not Call Policy</button>
          </div>

          <p className="max-w-3xl mx-auto text-[10px] text-slate-500 leading-relaxed">
            Home Tech Dealer is an independent provider comparison platform and marketing partner. Trademarks, service marks, logos, and brand names featured on this site are the property of their respective owners. Mention of brands does not imply endorsement. Speeds, pricing, and availability vary strictly by physical address.
          </p>

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
                  <p>Telephone requests placed to 1 (888) 482-6192 connect directly to authorized sales agents. You may request to be placed on our internal Do Not Call list at any time during a call or by written request.</p>
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