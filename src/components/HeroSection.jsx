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
    if (onSearchAddress) {
      onSearchAddress(addressInput);
    }
    const element = document.getElementById('carrier-results-grid') || document.getElementById('plans-marketplace');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleQuickCity = (cityItem) => {
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
  const locationLabel = hasValidCity 
    ? (state ? `${cityName}, ${state}` : `${cityName} Area`)
    : 'Your Area';

  return (
    <section className="relative overflow-hidden pt-7 sm:pt-12 pb-10 sm:pb-16 bg-gradient-to-b from-blue-50/70 via-slate-50/50 to-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 2-Column Luxury Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headline, Trust, and Search Console (7 cols) */}
          <div className="lg:col-span-7">
            
            {/* Top Trust Pills */}
            <div className="flex flex-col xs:flex-row sm:flex-row items-center justify-center sm:justify-start gap-2.5 sm:gap-3 mb-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/70 border border-blue-200/80 text-blue-800 text-xs font-semibold text-center">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Compare 27 Top Home Internet &amp; TV Providers</span>
              </div>

              <a
                href={telHref}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 active:bg-emerald-100 text-xs font-bold transition-all"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Order by Phone: {phoneNumber}</span>
              </a>
            </div>

            {/* Headline & Subtitle */}
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.18] sm:leading-[1.14]">
                Find the Best Internet &amp; TV Deals in{' '}
                <span className="text-blue-600">{locationLabel}.</span>
              </h1>

              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl font-normal">
                See every fiber, cable, 5G, and satellite plan available in{' '}
                <strong className="text-slate-800 font-semibold">{hasValidCity ? (state ? `${cityName}, ${state}` : `${cityName} area`) : 'your area'}</strong>. 
                Compare download speeds, monthly pricing, and exclusive mover gift cards—with free setup assistance.
              </p>
            </div>

            {/* Big Search Box */}
            <div className="mt-6 sm:mt-8 p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-xl shadow-slate-200/60">
              <div className="text-xs font-semibold text-slate-700 mb-2 px-1 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <span>
                  Enter your street address or zip code {hasValidCity ? `in ${cityName}:` : 'in your area:'}
                </span>
                <button
                  onClick={onOpenSpeedQuiz}
                  className="text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1 text-xs py-0.5"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Not sure what speed you need? Take Quiz</span>
                </button>
              </div>

              {/* Search Form */}
              <form onSubmit={handleHeroSubmit} className="relative flex flex-col sm:flex-row items-center gap-2">
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
                    placeholder={hasValidCity ? `Search any street address in ${cityName}${zip ? ` ${zip}` : ''}...` : 'Search any street address or zip code in your area...'}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 transition-all transform active:scale-95 shrink-0"
                >
                  <span>Find Plans</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Dynamic Nearby Radius Cities */}
              {nearbyCities && nearbyCities.length > 0 && (
                <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
                  <span className="text-xs font-semibold text-slate-500 shrink-0 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    <span>Nearby Cities:</span>
                  </span>
                  {nearbyCities.map((cityItem, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickCity(cityItem)}
                      className="shrink-0 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 font-medium text-xs transition-colors flex items-center gap-1.5"
                    >
                      <span>{cityItem.city}, {cityItem.state}</span>
                      {typeof cityItem.distance === 'number' && (
                        <span className="text-[10px] text-slate-500">
                          {cityItem.distance === 0 ? '(Current)' : `(~${cityItem.distance} mi)`}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Live Speedometer Showstopper Visualizer (Desktop Only) */}
          <div className="hidden lg:flex lg:col-span-5 justify-center w-full">
            <LiveSpeedometerHero onSelectSpeedTier={(speedTier) => {
              const element = document.getElementById('carrier-results-grid') || document.getElementById('plans-marketplace');
              if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }} />
          </div>

        </div>

        {/* Bottom Trust Badges (Hidden on mobile phones to prioritize carrier results) */}
        <div className="hidden sm:grid mt-10 pt-8 border-t border-slate-200/80 grid-cols-2 sm:grid-cols-4 gap-6 max-w-5xl">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">{phoneNumber}</h4>
              <p className="text-xs text-slate-500 mt-0.5">Direct phone setup with zero hold time.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">100% Free Comparison</h4>
              <p className="text-xs text-slate-500 mt-0.5">No markups, extra fees, or hidden costs.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Mover Reward Cards</h4>
              <p className="text-xs text-slate-500 mt-0.5">Up to $200 Visa cards with select plans.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Official Carrier Rates</h4>
              <p className="text-xs text-slate-500 mt-0.5">Guaranteed direct introductory pricing.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
