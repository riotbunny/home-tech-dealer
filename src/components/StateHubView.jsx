import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Zap, 
  Wifi, 
  ShieldCheck, 
  ArrowRight, 
  PhoneCall, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Compass,
  CheckCircle2
} from 'lucide-react';
import { CURATED_CITIES, US_STATES, createCitySlug } from '../data/usCitiesData';
import { PROVIDERS_CATALOG } from '../data/providersData';
import { DEFAULT_PHONE_NUMBER } from '../services/catalogService';

export function StateHubView({
  stateCode = 'TX',
  stateName = 'Texas',
  phoneNumber = DEFAULT_PHONE_NUMBER,
  onSelectCity,
  onOpenCallToOrder
}) {
  const [openFaqIdx, setOpenFaqIdx] = useState(0);
  const telHref = `tel:${phoneNumber.replace(/\D/g, '')}`;

  // Find all cities in this state
  const citiesInState = CURATED_CITIES.filter(c => c.state.toUpperCase() === stateCode.toUpperCase());
  
  // State specific metrics
  const fiberCoverage = stateCode === 'TX' ? '91%' : stateCode === 'CA' ? '89%' : stateCode === 'FL' ? '93%' : '86%';
  const maxSpeed = '1,000 - 5,000 Mbps';
  const startingPrice = '$49.99/mo';

  // Get matching providers
  const stateProviders = PROVIDERS_CATALOG.slice(0, 6);

  const stateFaqs = [
    {
      q: `What is the best internet provider overall in ${stateName}?`,
      a: `In ${stateName}, the top overall provider depends on whether fiber has been deployed to your street. Fiber optic providers such as AT&T Fiber, Frontier Fiber, and Verizon Fios offer the highest satisfaction with symmetrical gigabit speeds and no data caps. For widespread availability, cable carriers like Spectrum and Xfinity deliver gigabit downloads to over 90% of suburban homes.`
    },
    {
      q: `How much does high-speed internet typically cost in ${stateName}?`,
      a: `High-speed home internet in ${stateName} starts around $49.99 to $55.00 per month for unlimited 300 Mbps or 5G home internet. Gigabit fiber and advanced cable plans range between $70.00 and $89.99 per month with modern Wi-Fi equipment included.`
    },
    {
      q: `Is fiber optic internet widely available across ${stateName}?`,
      a: `Fiber internet currently covers approximately ${fiberCoverage} of metropolitan and suburban households in ${stateName}. Ongoing federal BEAD grants and private infrastructure expansions are bringing fiber to additional suburban and rural communities every month.`
    },
    {
      q: `What are the top internet options for rural addresses in ${stateName}?`,
      a: `For rural properties outside cable and fiber utility footprints in ${stateName}, Starlink low-earth orbit (LEO) satellite offers high-speed 100–220 Mbps downloads with low latency for streaming and remote work. 5G Home Internet from T-Mobile and Verizon is also rapidly expanding across rural corridors.`
    }
  ];

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* State Hero Header */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-800">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold mb-4">
            <Compass className="w-3.5 h-3.5 text-blue-400" />
            <span>Statewide Broadband Directory &bull; {stateCode}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            High-Speed Internet &amp; TV Providers in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              {stateName}
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            Compare licensed fiber, cable, 5G home, and satellite internet providers across {stateName}. Check verified address availability, plan speeds, and promotional rates.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={telHref}
              className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm flex items-center gap-2.5 shadow-lg shadow-blue-600/30 transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Statewide Desk: {phoneNumber}</span>
            </a>
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Free Service &bull; Zero Hold Times</span>
            </div>
          </div>
        </div>

        {/* State Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 pt-8 border-t border-slate-800/80">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Fiber Coverage</div>
            <div className="text-2xl font-black text-emerald-400 mt-1">{fiberCoverage}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Metro &amp; suburban footprint</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Max Speeds</div>
            <div className="text-2xl font-black text-cyan-400 mt-1">{maxSpeed}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Gigabit infrastructure</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Starting Price</div>
            <div className="text-2xl font-black text-amber-400 mt-1">{startingPrice}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Wi-Fi router included</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Carriers Evaluated</div>
            <div className="text-2xl font-black text-blue-400 mt-1">27 Providers</div>
            <div className="text-[11px] text-slate-400 mt-0.5">FCC BDC verified data</div>
          </div>
        </div>
      </div>

      {/* Top Providers in State */}
      <div>
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Leading Internet Providers in {stateName}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Top-ranked fiber, cable, and 5G providers serving residential households in {stateName}.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {stateProviders.map(provider => (
            <div 
              key={provider.id}
              className="bg-white p-6 rounded-3xl border border-slate-200/90 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <span 
                      className="w-3.5 h-3.5 rounded-full" 
                      style={{ backgroundColor: provider.color || '#2563EB' }}
                    />
                    <span className="font-extrabold text-base text-slate-900">
                      {provider.name}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">
                    {provider.type}
                  </span>
                </div>

                <div className="text-xs text-blue-700 font-semibold bg-blue-50 px-2.5 py-1 rounded-lg inline-block mb-4">
                  {provider.badge}
                </div>

                <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
                  <div className="flex justify-between">
                    <span>Starting Rate:</span>
                    <span className="font-black text-slate-900">${provider.plans[0]?.price || 49.99}/mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Download Speeds:</span>
                    <span className="font-bold text-blue-700">{provider.plans[provider.plans.length - 1]?.downloadSpeed || '1000 Mbps'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Equipment Rental:</span>
                    <span className="font-bold text-emerald-600">Included ($0/mo)</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2">
                <a
                  href={telHref}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call to Order</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Crawlable Cities Directory in State */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2.5 mb-2">
          <Building2 className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Browse {stateName} Cities &amp; Metros
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 mb-6 max-w-2xl">
          Select your city below to see exact street address availability, fiber coverage maps, and locked promotional rates.
        </p>

        {citiesInState.length === 0 ? (
          <div className="text-center py-8 text-slate-500 text-sm">
            Top metro markets for {stateName} are available via our 44k ZIP locator. Call {phoneNumber} to check your local city.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {citiesInState.map(city => {
              const slug = createCitySlug(city.city, stateCode);
              const path = city.zip 
                ? `/internet/${stateCode.toLowerCase()}/${createCitySlug(city.city)}/${city.zip}`
                : `/internet/${stateCode.toLowerCase()}/${createCitySlug(city.city)}`;

              return (
                <a
                  key={slug}
                  href={path}
                  onClick={(e) => {
                    if (onSelectCity) {
                      e.preventDefault();
                      onSelectCity(path);
                    }
                  }}
                  className="p-3.5 rounded-2xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 hover:shadow-xs transition-all group flex items-center justify-between text-left"
                >
                  <div className="min-w-0">
                    <div className="font-bold text-xs text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                      {city.city}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Up to {city.speed || '1000 Mbps'}
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                </a>
              );
            })}
          </div>
        )}
      </div>

      {/* State FAQs Accordion */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 mb-6">
          <HelpCircle className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {stateName} Home Broadband FAQ
          </h2>
        </div>

        <div className="space-y-3">
          {stateFaqs.map((faq, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <div 
                key={idx}
                className={`rounded-2xl border transition-all ${
                  isOpen ? 'bg-blue-50/30 border-blue-200' : 'bg-white border-slate-200/90 hover:border-slate-300'
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
                  <span className={`p-1 rounded-lg shrink-0 ${isOpen ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>
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
      </div>

    </div>
  );
}
