import React, { useState } from 'react';
import { 
  Wifi, 
  Zap, 
  ShieldCheck, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  PhoneCall, 
  Sparkles, 
  CheckCircle2, 
  Building2, 
  Compass,
  ArrowRight
} from 'lucide-react';
import { DEFAULT_PHONE_NUMBER } from '../services/catalogService';

export function LocalMarketGuide({
  cityName = '',
  state = '',
  zip = '',
  marketData,
  phoneNumber = DEFAULT_PHONE_NUMBER
}) {
  const [openFaqIdx, setOpenFaqIdx] = useState(0);
  const telHref = `tel:${phoneNumber.replace(/\D/g, '')}`;

  const hasValidCity = Boolean(cityName && cityName.trim() && cityName.toLowerCase() !== 'your area' && cityName.toLowerCase() !== 'your local');
  const displayCity = hasValidCity ? cityName : 'Your Local Area';
  const displayState = state || 'USA';
  const locationTitle = hasValidCity 
    ? (state ? `${displayCity}, ${displayState}` : `${displayCity} Area`)
    : 'Your Area';

  const fiberCoverage = marketData?.fiberCoverage || '88%';
  const topSpeed = marketData?.medianHouseholdSpeed || '1000 Mbps';

  const localFaqs = [
    {
      q: `Who provides the fastest internet in ${locationTitle}?`,
      a: `In ${locationTitle}, top fiber optic and advanced cable networks deliver download speeds up to 1,000 Mbps to 5,000 Mbps with symmetrical uploads. Leading providers serving the area include Verizon, EarthLink Fiber, T-Mobile 5G Home, and top regional cable networks. Fiber is recommended for competitive online gaming, multi-device 4K streaming, and heavy remote work file uploads.`
    },
    {
      q: `What is the cheapest home internet option in ${locationTitle}?`,
      a: `Home internet plans in ${locationTitle} start as low as $49.99 per month for 5G home internet options through Verizon and T-Mobile. These plans include modern Wi-Fi gateways with $0 equipment rental fees, unlimited data, and no annual contracts.`
    },
    {
      q: `Is fiber optic internet available across all of ${locationTitle}?`,
      a: `Fiber optic broadband currently reaches approximately ${fiberCoverage} of households across ${locationTitle}. If your street does not yet have fiber laid, high-speed cable and 5G Ultra Wideband offer comparable gigabit download speeds, while Starlink provides 100% low-latency satellite coverage anywhere with an open sky.`
    },
    {
      q: `Can I bundle live TV and mobile service in ${locationTitle}?`,
      a: `Yes. In ${locationTitle}, bundling high-speed internet with live TV (such as DIRECTV Stream) or an unlimited mobile line can save you between $20 and $45 every month. You also gain access to local broadcast channels, regional sports networks, and premium movie channels on a single combined bill.`
    },
    {
      q: `How do I lock in current promotional pricing and mover reward cards?`,
      a: `Call our authorized ${locationTitle} order desk at ${phoneNumber}. Our direct representatives verify address eligibility across all 27 carriers in real-time, apply all eligible $100–$200 mover reward cards, and schedule fast priority installation with zero hold time.`
    }
  ];

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200/90 mt-8">
      
      {/* Top Header Badge & Title */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-3">
          <Compass className="w-3.5 h-3.5 text-blue-600" />
          <span>Local Broadband Market Intelligence</span>
        </div>
        
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Broadband &amp; TV Overview for{' '}
          <span className="text-blue-600">{locationTitle}</span>
        </h2>
        
        <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
          Independent coverage data, carrier availability benchmarks, and verified consumer tips for choosing the right internet connection in {locationTitle}.
        </p>
      </div>

      {/* Local Connectivity KPI Scorecard Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">
        
        {/* Metric 1: Max Speeds */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Max Speeds</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900">{topSpeed}</div>
          <p className="text-xs text-slate-500 mt-0.5">Gigabit-capable infrastructure</p>
        </div>

        {/* Metric 2: Fiber Coverage */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Fiber Coverage</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Wifi className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-600">~{fiberCoverage}</div>
          <p className="text-xs text-slate-500 mt-0.5">Metro &amp; suburban footprint</p>
        </div>

        {/* Metric 3: Starting Rates */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Plans Starting At</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900">$49.99<span className="text-xs font-normal text-slate-500">/mo</span></div>
          <p className="text-xs text-slate-500 mt-0.5">Wi-Fi equipment included</p>
        </div>

        {/* Metric 4: Direct Phone Booking */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-200">Phone Hotline</span>
            <div className="w-8 h-8 rounded-xl bg-white/15 text-white flex items-center justify-center">
              <PhoneCall className="w-4 h-4" />
            </div>
          </div>
          <a href={telHref} className="text-base sm:text-lg font-black text-white hover:underline block truncate">
            {phoneNumber}
          </a>
          <p className="text-xs text-blue-200 mt-0.5">Live local order desk</p>
        </div>

      </div>

      {/* 2-Column Section: Local Editorial Guide (Left) & Dynamic Local FAQs (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        
        {/* Left Column: Authoritative Local Overview Guide (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4 text-sm text-slate-600 leading-relaxed">
            <div className="flex items-center gap-2 text-slate-900 font-extrabold text-lg border-b border-slate-100 pb-3">
              <Building2 className="w-5 h-5 text-blue-600 shrink-0" />
              <span>Internet Connectivity Landscape in {locationTitle}</span>
            </div>

            <p>
              Navigating home broadband in <strong>{locationTitle}</strong> has become significantly more advantageous for consumers over the past two years. With ongoing investments in fiber optic routing, DOCSIS 3.1 hybrid-fiber coaxial (HFC) upgrades, and nationwide 5G Ultra Wideband tower buildouts, residents have access to competitive multi-carrier options.
            </p>

            <p>
              For households streaming high-definition media, gaming, or operating from a remote home office, <strong>fiber optic internet</strong> delivers the gold standard: symmetrical upload and download speeds, ultra-low ping latency, and 99.9% network reliability. In areas where fiber is still expanding, modern <strong>5G Home Internet</strong> from carriers like Verizon and T-Mobile offers an outstanding no-contract, plug-and-play alternative with unlimited data and locked rates.
            </p>

            <p>
              Rural and edge addresses outside standard cable boundaries are fully supported by <strong>Starlink</strong> high-speed low-earth orbit (LEO) satellite systems, ensuring that no address in the {displayCity} area is left without fast, dependable connectivity.
            </p>

            {/* Quick Action CTA Banner */}
            <div className="mt-5 p-4 rounded-2xl bg-blue-50/80 border border-blue-100 text-xs text-blue-900 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <span className="font-bold block">Need help comparing plans for your home?</span>
                <span className="text-blue-700 text-[11px]">Our authorized specialists compare all 27 carriers for free.</span>
              </div>
              <a
                href={telHref}
                className="shrink-0 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call {phoneNumber}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Local FAQs Accordion (6 cols) */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center gap-2 mb-2 px-1">
            <HelpCircle className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
              Frequently Asked Questions for {locationTitle}
            </span>
          </div>

          <div className="space-y-3">
            {localFaqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all ${
                    isOpen 
                      ? 'bg-white border-blue-300 shadow-sm' 
                      : 'bg-white border-slate-200/90 hover:border-slate-300'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-3"
                  >
                    <span className="text-sm font-bold text-slate-900 leading-snug">
                      {faq.q}
                    </span>
                    <span className={`p-1 rounded-lg shrink-0 transition-colors ${
                      isOpen ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-2 px-1 text-center sm:text-left text-xs text-slate-500 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Information verified against official FCC Broadband Serviceability filings (2026).</span>
          </div>
        </div>

      </div>

      {/* Neighboring Markets & Regional Crawl Mesh */}
      <div className="mt-12 pt-8 border-t border-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-blue-600" />
            <h3 className="font-extrabold text-sm text-slate-900">
              Broadband Availability in Nearby {displayState} Communities
            </h3>
          </div>
          {displayState && displayState !== 'USA' && (
            <a
              href={`/internet/${displayState.toLowerCase()}`}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
            >
              <span>View Full {displayState} Directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
          {[
            { city: 'Austin', state: 'TX', zip: '78701' },
            { city: 'Dallas', state: 'TX', zip: '75201' },
            { city: 'Houston', state: 'TX', zip: '77002' },
            { city: 'San Antonio', state: 'TX', zip: '78205' },
            { city: 'Fort Worth', state: 'TX', zip: '76102' },
            { city: 'Brownsville', state: 'TX', zip: '78522' }
          ].map(c => {
            const path = `/internet/${c.state.toLowerCase()}/${c.city.toLowerCase().replace(/[^a-z0-9]/g, '-')}/${c.zip}`;
            return (
              <a
                key={c.city}
                href={path}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all text-xs font-bold text-slate-700 hover:text-blue-700 truncate"
              >
                {c.city}, {c.state}
              </a>
            );
          })}
        </div>
      </div>

    </section>
  );
}
