import React, { useState } from 'react';
import { 
  MapPin, 
  Search, 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Gift, 
  PhoneCall, 
  Star 
} from 'lucide-react';
import { GoogleAddressAutocomplete } from './GoogleAddressAutocomplete';
import { LiveSpeedometerHero } from './LiveSpeedometerHero';
import { DEFAULT_PHONE_NUMBER } from '../services/catalogService';
import { triggerHaptic } from '../utils/haptics';

export function HeroSection({ 
  onSelectNearbyCity, 
  nearbyCities = [], 
  cityName = '', 
  state = '',
  zip = '',
  phoneNumber = DEFAULT_PHONE_NUMBER,
  onSearchAddress, 
  onOpenSpeedQuiz 
}) {
  const [addressInput, setAddressInput] = useState('');
  const telHref = `tel:${phoneNumber.replace(/\D/g, '')}`;

  const handleHeroSubmit = (e) => {
    e.preventDefault();
    if (!addressInput.trim()) return;
    triggerHaptic('heavy');
    if (onSearchAddress) {
      onSearchAddress(addressInput);
    }
    const element = document.getElementById('carrier-results-grid') || document.getElementById('plans-marketplace');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleQuickCity = (cityItem) => {
    triggerHaptic('light');
    setAddressInput(`${cityItem.city}, ${cityItem.state}`);
    if (onSelectNearbyCity) {
      onSelectNearbyCity(cityItem);
    }
    const element = document.getElementById('carrier-results-grid') || document.getElementById('plans-marketplace');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const hasValidCity = Boolean(cityName && cityName.trim() && cityName.toLowerCase() !== 'your area' && cityName.toLowerCase() !== 'your local');
  
  const toTitleCase = (str) => {
    if (!str) return '';
    return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };
  
  const formattedCityName = hasValidCity ? toTitleCase(cityName) : '';
  const locationLabel = hasValidCity 
    ? (state ? `${formattedCityName}, ${state}` : `${formattedCityName} Area`)
    : 'Your Area';

  return (
    <section className="relative overflow-hidden pt-10 sm:pt-16 pb-12 sm:pb-24">
      {/* Abstract Glowing Background Mesh */}
      <div className="absolute top-0 left-0 right-0 h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[120px]"></div>
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2-Column Luxury Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Left Column: Headline, Trust, and Search Console (7 cols) */}
          <div className="lg:col-span-7">
            
            {/* Top Trust Pills */}
            <div className="flex flex-col xs:flex-row sm:flex-row items-center justify-center sm:justify-start gap-3 mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-slate-200/50 shadow-sm text-indigo-900 text-xs font-bold tracking-wide uppercase">
                <Sparkles className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>Compare 27 Top Providers</span>
              </div>

              <a
                href={telHref}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-700 hover:text-emerald-800 text-xs font-bold transition-all shadow-sm"
              >
                <PhoneCall className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Order: {phoneNumber}</span>
              </a>
            </div>

            {/* Headline & Subtitle */}
            <div className="text-center sm:text-left mb-8 sm:mb-10">
              <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-extrabold text-slate-900 tracking-tighter leading-[1.1] mb-5">
                Find the Best <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500">
                  Internet & TV
                </span>
                {' '}in {locationLabel}.
              </h1>

              <p className="text-base sm:text-lg text-slate-600/90 leading-relaxed max-w-lg font-medium">
                See every fiber, cable, 5G, and satellite plan available in{' '}
                <strong className="text-slate-900 font-bold">{hasValidCity ? (state ? `${formattedCityName}, ${state}` : `${formattedCityName} area`) : 'your area'}</strong>. 
                Compare speeds, exclusive pricing, and secure your mover reward cards.
              </p>
            </div>

            {/* Big Search Box (Glassmorphic) */}
            <div className="p-4 sm:p-6 rounded-[2rem] bg-white/70 backdrop-blur-xl border border-white shadow-2xl shadow-indigo-900/10 transition-all hover:shadow-indigo-900/15">
              <div className="text-sm font-bold text-slate-800 mb-3 px-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span>
                  Enter your address in {hasValidCity ? formattedCityName : 'your area'}:
                </span>
                <button
                  onClick={onOpenSpeedQuiz}
                  className="text-indigo-600 hover:text-indigo-700 font-bold flex items-center gap-1.5 text-xs bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-full transition-colors"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Take the Speed Quiz</span>
                </button>
              </div>

              {/* Search Form */}
              <form onSubmit={handleHeroSubmit} className="relative flex flex-col sm:flex-row items-center gap-3">
                <div className="relative w-full">
                  <GoogleAddressAutocomplete
                    value={addressInput}
                    onChange={(val) => setAddressInput(val)}
                    onSelectAddress={(chosen) => {
                      setAddressInput(chosen);
                      if (onSearchAddress) {
                        onSearchAddress(chosen);
                      }
                      const element = document.getElementById('carrier-results-grid') || document.getElementById('plans-marketplace');
                      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    placeholder={hasValidCity ? `Search any street in ${cityName}...` : 'Search any street address...'}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-[1.25rem] bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all transform hover:scale-105 active:scale-95 shrink-0"
                >
                  <span>Find Plans</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Dynamic Nearby Radius Cities */}
              {nearbyCities && nearbyCities.length > 0 && (
                <div className="mt-5 pt-4 border-t border-slate-200/60 flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none text-xs">
                  <span className="text-xs font-bold text-slate-400 shrink-0 flex items-center gap-1.5 tracking-wider uppercase">
                    <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Nearby:</span>
                  </span>
                  {nearbyCities.map((cityItem, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickCity(cityItem)}
                      className="shrink-0 px-3 py-1.5 rounded-full bg-slate-100/80 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 font-bold text-xs transition-colors flex items-center gap-1.5 border border-slate-200/50"
                    >
                      <span>{cityItem.city}, {cityItem.state}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Live Speedometer Showstopper Visualizer (Desktop Only) */}
          <div className="hidden lg:flex lg:col-span-5 justify-center w-full relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100 to-transparent rounded-full blur-[80px] -z-10 opacity-70"></div>
            <LiveSpeedometerHero onSelectSpeedTier={(speedTier) => {
              const element = document.getElementById('carrier-results-grid') || document.getElementById('plans-marketplace');
              if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }} />
          </div>

        </div>

        {/* Bottom Trust Badges (Hidden on mobile phones to prioritize carrier results) */}
        <div className="hidden sm:grid mt-16 pt-8 grid-cols-2 sm:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center gap-3 group">
            <div className="relative w-14 h-14 rounded-[1.25rem] bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/30 overflow-hidden group-hover:-translate-y-1 transition-transform duration-300">
              <div className="absolute inset-0 bg-white/20 backdrop-blur-sm border border-white/40 rounded-[1.25rem]"></div>
              <PhoneCall className="w-6 h-6 text-white relative z-10 stroke-[2.5]" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-slate-900 tracking-tight">{phoneNumber}</h4>
              <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">Direct phone setup with zero hold time.</p>
            </div>
          </div>

          <div className="flex flex-col items-center text-center gap-3 group">
            <div className="relative w-14 h-14 rounded-[1.25rem] bg-gradient-to-tr from-indigo-500 to-blue-400 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/30 overflow-hidden group-hover:-translate-y-1 transition-transform duration-300">
              <div className="absolute inset-0 bg-white/20 backdrop-blur-sm border border-white/40 rounded-[1.25rem]"></div>
              <CheckCircle2 className="w-6 h-6 text-white relative z-10 stroke-[2.5]" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-slate-900 tracking-tight">100% Free Service</h4>
              <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">No markups, extra fees, or hidden costs.</p>
            </div>
          </div>

          <div className="flex flex-col items-center text-center gap-3 group">
            <div className="relative w-14 h-14 rounded-[1.25rem] bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/30 overflow-hidden group-hover:-translate-y-1 transition-transform duration-300">
              <div className="absolute inset-0 bg-white/20 backdrop-blur-sm border border-white/40 rounded-[1.25rem]"></div>
              <Gift className="w-6 h-6 text-white relative z-10 stroke-[2.5]" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-slate-900 tracking-tight">Mover Reward Cards</h4>
              <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">Up to $200 Visa cards with select plans.</p>
            </div>
          </div>

          <div className="flex flex-col items-center text-center gap-3 group">
            <div className="relative w-14 h-14 rounded-[1.25rem] bg-gradient-to-tr from-purple-500 to-pink-400 flex items-center justify-center shrink-0 shadow-lg shadow-purple-500/30 overflow-hidden group-hover:-translate-y-1 transition-transform duration-300">
              <div className="absolute inset-0 bg-white/20 backdrop-blur-sm border border-white/40 rounded-[1.25rem]"></div>
              <ShieldCheck className="w-6 h-6 text-white relative z-10 stroke-[2.5]" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-slate-900 tracking-tight">Official Carrier Rates</h4>
              <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">Guaranteed direct introductory pricing.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
