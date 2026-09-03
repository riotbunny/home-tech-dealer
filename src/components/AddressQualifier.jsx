import React, { useState, useMemo, useEffect } from 'react';
import { 
  MapPin, 
  Search, 
  Filter, 
  Layers, 
  Check, 
  Zap, 
  Wifi, 
  ShieldCheck, 
  Clock, 
  ArrowRight,
  ArrowLeftRight,
  Plus,
  PhoneCall,
  Gift,
  Radio,
  Loader2,
  CheckCircle2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { SAMPLE_MARKETS } from '../data/sampleMarkets';
import { PROVIDERS_CATALOG } from '../data/providersData';
import { GoogleAddressAutocomplete } from './GoogleAddressAutocomplete';
import { FccBroadbandFactsModal } from './FccBroadbandFactsModal';
import { TechSignalDiagnostics } from './TechSignalDiagnostics';
import { CarrierLogo } from './CarrierLogos';
import { DEFAULT_PHONE_NUMBER } from '../services/catalogService';

export function AddressQualifier({ 
  comparisonCart, 
  onToggleCartPlan, 
  onOpenCart, 
  onOpenCallToOrder,
  onOpenSpeedQuiz,
  currentAddress,
  setCurrentAddress,
  activeProviderIds,
  lookupSource,
  isSearching,
  onExecuteSearch,
  onSelectNearbyCity,
  nearbyCities = [],
  speedFilterOverride,
  catalog,
  cityName = '',
  phoneNumber = DEFAULT_PHONE_NUMBER
}) {
  const [localAddressInput, setLocalAddressInput] = useState(currentAddress || '');
  const [fccModalPlan, setFccModalPlan] = useState(null);
  const [fccModalProvider, setFccModalProvider] = useState(null);
  const telHref = `tel:${phoneNumber.replace(/\D/g, '')}`;
  
  // Filters
  const [speedFilter, setSpeedFilter] = useState('all'); // all, 300, 500, 1000
  const [typeFilter, setTypeFilter] = useState('all'); // all, Fiber, Cable, Satellite
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(120);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Sync address input when currentAddress changes in parent
  useEffect(() => {
    setLocalAddressInput(currentAddress || '');
  }, [currentAddress]);

  // Apply speed filter override if set from speed quiz
  useEffect(() => {
    if (speedFilterOverride) {
      setSpeedFilter(speedFilterOverride);
    }
  }, [speedFilterOverride]);

  // Set of card IDs that are expanded. Closed by default to show clean carrier summary.
  const [expandedPlanIds, setExpandedPlanIds] = useState(() => new Set());

  const toggleCardExpansion = (planId) => {
    setExpandedPlanIds(prev => {
      const next = new Set(prev);
      if (next.has(planId)) {
        next.delete(planId);
      } else {
        next.add(planId);
      }
      return next;
    });
  };

  const handleExpandAll = () => {
    const allIds = new Set(filteredPlans.map(p => p.id));
    setExpandedPlanIds(allIds);
  };

  const handleCollapseAll = () => {
    setExpandedPlanIds(new Set());
  };

  const scrollToCarriers = () => {
    setTimeout(() => {
      const gridEl = document.getElementById('carrier-results-grid') || document.getElementById('plans-marketplace');
      if (gridEl) {
        gridEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  };

  // Handle address form submit
  const handleFormSubmit = (e) => {
    e?.preventDefault();
    if (onExecuteSearch) {
      onExecuteSearch(localAddressInput);
    }
    scrollToCarriers();
  };

  // Serviceable providers for current address (Verizon, T-Mobile, EarthLink, Starlink guaranteed nationwide)
  const serviceableProviders = useMemo(() => {
    const defaultList = ['verizon', 'tmobile', 'earthlink', 'starlink', 'att', 'spectrum', 'frontier', 'directv', 'viasat'];
    const baseList = activeProviderIds || defaultList;
    const combinedList = Array.from(new Set(['verizon', 'tmobile', 'earthlink', 'starlink', ...baseList]));
    const activeData = catalog || PROVIDERS_CATALOG;
    return activeData.filter(p => !p.paused && combinedList.includes(p.id));
  }, [activeProviderIds, catalog]);

  // Flatten plans with provider metadata and apply filters
  const filteredPlans = useMemo(() => {
    const plans = [];
    serviceableProviders.forEach(provider => {
      provider.plans.forEach(plan => {
        // Speed filter
        const speedNum = parseInt(plan.downloadSpeed) || 0;
        if (speedFilter === '300' && speedNum < 300) return;
        if (speedFilter === '500' && speedNum < 500) return;
        if (speedFilter === '1000' && speedNum < 900) return;

        // Type filter
        if (typeFilter !== 'all' && !provider.type.toLowerCase().includes(typeFilter.toLowerCase())) {
          return;
        }

        // Max price filter
        if (plan.price > maxPrice) return;

        // Text search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matches = 
            provider.name.toLowerCase().includes(q) ||
            plan.name.toLowerCase().includes(q) ||
            plan.downloadSpeed.toLowerCase().includes(q);
          if (!matches) return;
        }

        plans.push({
          ...plan,
          providerId: provider.id,
          providerName: provider.name,
          providerFullName: provider.fullName,
          providerType: provider.type,
          providerBadge: provider.badge,
          providerRating: provider.rating,
          providerColor: provider.color
        });
      });
    });

    // Ensure the first cards in the marketplace feature the 4 nationwide carriers:
    // 1. Verizon, 2. T-Mobile, 3. EarthLink, 4. Starlink
    const topNationwideCarriers = ['verizon', 'tmobile', 'earthlink', 'starlink'];
    const firstCards = [];
    const usedPlanIds = new Set();

    topNationwideCarriers.forEach(carrierId => {
      const carrierPlans = plans.filter(p => p.providerId === carrierId);
      if (carrierPlans.length > 0) {
        // Pick popular plan or first plan
        const topPlan = carrierPlans.find(p => p.popular) || carrierPlans[0];
        firstCards.push(topPlan);
        usedPlanIds.add(topPlan.id);
      }
    });

    // All remaining plans sorted by price
    const remainingPlans = plans.filter(p => !usedPlanIds.has(p.id));
    remainingPlans.sort((a, b) => a.price - b.price);

    return [...firstCards, ...remainingPlans];
  }, [serviceableProviders, speedFilter, typeFilter, searchQuery, maxPrice]);

  return (
    <section id="plans-marketplace" className="pt-2 sm:pt-6 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      
      {/* Search Header Bar (Clean & Compact) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 mb-0.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>FCC Verified Service Availability</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {localAddressInput ? `Plans Available at ${localAddressInput}` : (cityName ? `Plans Available in ${cityName}` : 'Plans Available in Your Area')}
          </h2>
        </div>

        {/* Speed Quiz Button + Comparison Cart Status */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenSpeedQuiz}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold transition-all shadow-xs"
          >
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Speed Quiz</span>
          </button>

          <button
            onClick={onOpenCart}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-xs ${
              comparisonCart.length > 0 
                ? 'bg-amber-500 text-white border-amber-600 shadow-sm' 
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Compare ({comparisonCart.length}/3)</span>
          </button>
        </div>
      </div>

      {/* Mobile Address Location Pill (Avoids redundant search input taking up screen height) */}
      <div className="md:hidden mt-3 p-3 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
          <span className="text-xs font-bold text-slate-800 truncate">
            {localAddressInput || (cityName ? `${cityName} Area` : 'Your Address')}
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            const heroInput = document.querySelector('input[placeholder*="Search any street address"]');
            if (heroInput) {
              heroInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
              heroInput.focus();
            }
          }}
          className="text-[11px] font-bold text-blue-600 hover:text-blue-700 shrink-0 bg-blue-50 px-2.5 py-1 rounded-lg"
        >
          Change
        </button>
      </div>

      {/* Desktop Address Search Bar (Hidden on mobile phones) */}
      <div className="hidden md:block mt-6 p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <div className="text-xs font-semibold text-slate-700 mb-2 flex items-center justify-between">
          <span>Search Address:</span>
          <span className="text-xs text-blue-700 font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{serviceableProviders.length} Providers Available</span>
          </span>
        </div>

        {/* Search Input Form */}
        <form 
          onSubmit={handleFormSubmit}
          className="relative flex flex-col sm:flex-row items-center gap-2"
        >
          <div className="relative w-full">
            <GoogleAddressAutocomplete
              value={localAddressInput}
              onChange={(val) => setLocalAddressInput(val)}
              onSelectAddress={(chosen) => {
                setLocalAddressInput(chosen);
                if (onExecuteSearch) onExecuteSearch(chosen);
                scrollToCarriers();
              }}
              placeholder={cityName ? `Search your street address in ${cityName} or zip code...` : "Type any street address, city, state, or 5-digit zip code..."}
            />
          </div>
          <button
            type="submit"
            disabled={isSearching}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs shrink-0"
          >
            {isSearching ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Checking...</span>
              </>
            ) : (
              <>
                <Search className="w-3.5 h-3.5" />
                <span>Search Plans</span>
              </>
            )}
          </button>
        </form>

        {/* Dynamic Nearby Radius Cities */}
        {nearbyCities && nearbyCities.length > 0 && (
          <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className="text-xs font-semibold text-slate-500 shrink-0 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>Nearby Cities:</span>
            </span>
            {nearbyCities.map((cityItem, idx) => {
              const isCurrent = localAddressInput.toLowerCase().includes(cityItem.city.toLowerCase());
              return (
                <button
                  key={idx}
                  onClick={() => {
                    const addr = `${cityItem.city}, ${cityItem.state}`;
                    setLocalAddressInput(addr);
                    if (onSelectNearbyCity) onSelectNearbyCity(cityItem);
                    if (onExecuteSearch) onExecuteSearch(addr);
                    scrollToCarriers();
                  }}
                  className={`shrink-0 px-3 py-1 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                    isCurrent
                      ? 'bg-blue-600 text-white font-bold shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <span>{cityItem.city}, {cityItem.state}</span>
                  {typeof cityItem.distance === 'number' && (
                    <span className={`text-[10px] ${isCurrent ? 'text-blue-100' : 'text-slate-500'}`}>
                      {cityItem.distance === 0 ? '(Current)' : `(~${cityItem.distance} mi)`}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Mobile Filter Toggle Button */}
      <div className="sm:hidden mt-3 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => setIsMobileFiltersOpen(prev => !prev)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
        >
          <Filter className="w-3.5 h-3.5 text-blue-600" />
          <span>{isMobileFiltersOpen ? 'Hide Filters ▲' : 'Filter Speeds & Pricing ▼'}</span>
        </button>

        <span className="text-xs font-bold text-slate-500">
          {filteredPlans.length} Plans Found
        </span>
      </div>

      {/* Product Filtering Bar (Collapsible on mobile, always visible on tablet/desktop) */}
      <div className={`${isMobileFiltersOpen ? 'flex' : 'hidden sm:flex'} mt-3 sm:mt-6 flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200 shadow-xs`}>
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1.5 scrollbar-none touch-pan-x w-full">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold shrink-0">
            <Filter className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden xs:inline">Filter:</span>
          </div>

          {/* Speed Filter */}
          <div className="flex items-center rounded-xl bg-slate-100 p-0.5 border border-slate-200 text-xs shrink-0">
            {[
              { id: 'all', label: 'All Speeds' },
              { id: '300', label: '300 Mbps' },
              { id: '500', label: '500 Mbps' },
              { id: '1000', label: '1 Gig+' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSpeedFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg transition-all font-semibold ${
                  speedFilter === tab.id ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Connection Type Filter */}
          <div className="flex items-center rounded-xl bg-slate-100 p-0.5 border border-slate-200 text-xs shrink-0">
            {[
              { id: 'all', label: 'All Types' },
              { id: 'Fiber', label: 'Fiber' },
              { id: 'Cable', label: 'Cable' },
              { id: 'Satellite', label: 'Satellite / TV' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setTypeFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg transition-all font-semibold ${
                  typeFilter === tab.id ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Max Price Slider & Search */}
        <div className="flex items-center gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100 w-full lg:w-auto justify-between">
          <div className="flex items-center gap-2 text-xs shrink-0">
            <span className="text-slate-600 font-medium">Budget:</span>
            <span className="font-bold text-slate-900">${maxPrice}/mo</span>
            <input
              type="range"
              min="40"
              max="120"
              step="5"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-20 sm:w-28 accent-blue-600 cursor-pointer"
            />
          </div>

          <div className="relative flex-1 max-w-[200px] sm:max-w-xs">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search perks..."
              className="w-full pl-7 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 text-base sm:text-xs focus:outline-none focus:border-blue-600"
            />
            <Search className="w-3 h-3 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
        </div>
      </div>

      {/* Plans Grid */}
      <div id="carrier-results-grid" className="mt-4 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="text-xs text-slate-600 font-medium">
              Showing <strong className="text-slate-900">{filteredPlans.length}</strong> available plans
            </div>

            {/* Expand / Collapse All Controls (Mobile Only) */}
            <div className="md:hidden flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-[11px] font-semibold border border-slate-200/80">
              <button
                type="button"
                onClick={handleExpandAll}
                className="px-2.5 py-1 rounded-md hover:bg-white text-slate-700 hover:text-blue-700 transition-all font-bold"
              >
                Expand All
              </button>
              <span className="text-slate-300">&bull;</span>
              <button
                type="button"
                onClick={handleCollapseAll}
                className="px-2.5 py-1 rounded-md hover:bg-white text-slate-700 hover:text-blue-700 transition-all font-bold"
              >
                Collapse All
              </button>
            </div>
          </div>

          <a
            href={telHref}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Call {phoneNumber} to order with promo rate lock</span>
          </a>
        </div>

        {filteredPlans.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white border border-slate-200 text-slate-500 shadow-xs">
            <Filter className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-800">No plans matched your filter criteria.</p>
            <p className="text-xs text-slate-500 mt-1">Try broadening your price limit or selecting "All Speeds".</p>
            <button
              onClick={() => {
                setSpeedFilter('all');
                setTypeFilter('all');
                setMaxPrice(120);
                setSearchQuery('');
              }}
              className="mt-3 px-4 py-2 rounded-xl bg-blue-50 text-blue-700 text-xs font-bold hover:bg-blue-100"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 items-start">
            {filteredPlans.map((plan) => {
              const isAddedToCompare = comparisonCart.some(item => item.id === plan.id);
              const isStarlink = plan.providerId === 'starlink';
              const isExpanded = expandedPlanIds.has(plan.id);
              
              // Signature atmospheric glow
              const carrierAtmosphere = 
                plan.providerId === 'verizon' ? 'hover:shadow-red-500/15 hover:border-red-400' :
                plan.providerId === 'tmobile' ? 'hover:shadow-pink-500/15 hover:border-pink-400' :
                plan.providerId === 'earthlink' ? 'hover:shadow-orange-500/15 hover:border-orange-400' :
                plan.providerId === 'starlink' ? 'hover:shadow-cyan-500/20 hover:border-cyan-400/80' :
                'hover:shadow-blue-500/10 hover:border-blue-300';

              /* ---------------------------------------------------- */
              /* HELPER RENDERERS FOR FULL LUXURY CARDS              */
              /* (Always open on Desktop; collapsible on Mobile)     */
              /* ---------------------------------------------------- */
              const renderFullStarlink = (isDesktopOnly = false) => (
                <div
                  key={plan.id + (isDesktopOnly ? '-desktop' : '')}
                  className={`${isDesktopOnly ? 'hidden md:flex' : 'flex'} rounded-2xl sm:rounded-3xl p-4 sm:p-6 transition-all duration-300 flex-col justify-between bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-2 border-slate-700/80 text-white shadow-[0_20px_50px_rgba(15,23,42,0.45)] ${carrierAtmosphere} ${
                    isAddedToCompare ? 'ring-2 ring-cyan-400' : ''
                  }`}
                >
                  <div>
                    {/* Top Provider Header with Vector Logo and Mobile-Only Collapse Trigger */}
                    <div className="flex items-center justify-between gap-2 mb-3.5">
                      <div className="flex items-center gap-2">
                        <CarrierLogo id="starlink" name={plan.providerName} className="h-5 w-auto text-white" />
                        <span className="text-[10px] font-mono uppercase tracking-wider font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 px-2 py-0.5 rounded-full">
                          LEO Orbit
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleCardExpansion(plan.id)}
                        className="md:hidden text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1 py-1 px-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700 transition-colors"
                        title="Collapse card"
                      >
                        <span>Hide</span>
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Plan Name & Popular Badge */}
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-black text-white tracking-tight leading-snug">
                        {plan.name}
                      </h3>
                      {plan.popular && (
                        <span className="shrink-0 text-[10px] font-extrabold tracking-wide px-2 py-0.5 rounded-full bg-cyan-400 text-slate-950 font-mono">
                          SpaceX Tier
                        </span>
                      )}
                    </div>

                    {/* Speed Specification */}
                    <div className="mt-4 p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-around text-center">
                      <div>
                        <div className="text-[10px] text-slate-400 font-semibold uppercase">Download</div>
                        <div className="text-lg font-black text-cyan-300 font-mono">{plan.downloadSpeed}</div>
                      </div>
                      <div className="h-6 w-px bg-slate-700"></div>
                      <div>
                        <div className="text-[10px] text-slate-400 font-semibold uppercase">Upload</div>
                        <div className="text-lg font-black text-slate-200 font-mono">{plan.uploadSpeed}</div>
                      </div>
                    </div>

                    {/* Pricing & Terms */}
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-3xl font-black text-white font-mono">${plan.price}</span>
                      <span className="text-xs text-slate-400 font-medium">/{plan.period}</span>
                      <span className="ml-auto text-xs text-cyan-300 font-semibold">
                        {plan.contract}
                      </span>
                    </div>

                    {/* Equipment & Details */}
                    <div className="mt-3 space-y-1.5 text-xs text-slate-300">
                      <div className="flex items-center gap-2">
                        <Wifi className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{plan.equipmentFee}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Delivery: {plan.installationSla}</span>
                      </div>
                    </div>

                    {/* Perks List */}
                    <div className="mt-4 pt-3 border-t border-slate-800 space-y-2">
                      {plan.perks.map((perk, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{perk}</span>
                        </div>
                      ))}
                    </div>

                    {/* Official FCC Facts Trigger */}
                    <button
                      type="button"
                      onClick={() => {
                        setFccModalPlan(plan);
                        setFccModalProvider(serviceableProviders.find(p => p.id === plan.providerId));
                      }}
                      className="w-full mt-3.5 py-2 px-3 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700 text-[11px] font-bold text-slate-200 flex items-center justify-center gap-1.5 transition-colors group"
                      title="View Official FCC Consumer Disclosure"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span>Official FCC Broadband Facts</span>
                    </button>
                  </div>

                  {/* Actions: Compare & Call */}
                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onToggleCartPlan(plan)}
                      className={`min-h-[44px] py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shrink-0 border ${
                        isAddedToCompare 
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 ring-2 ring-cyan-400/30' 
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border-slate-700'
                      }`}
                      title={isAddedToCompare ? 'Remove from comparison' : 'Compare with other plans'}
                      aria-label="Add to comparison"
                    >
                      {isAddedToCompare ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-cyan-300 stroke-[3]" />
                          <span>Comparing</span>
                        </>
                      ) : (
                        <>
                          <ArrowLeftRight className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Compare</span>
                        </>
                      )}
                    </button>

                    <a
                      href={telHref}
                      onClick={(e) => e.stopPropagation()}
                      className="min-h-[44px] flex-1 py-2 px-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-md shadow-cyan-500/20 transition-all text-center"
                      title={`Call ${phoneNumber} to order ${plan.name}`}
                    >
                      <PhoneCall className="w-3.5 h-3.5 shrink-0" />
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-1.5 truncate">
                        <span className="font-black text-xs">Call to Order:</span>
                        <span className="text-[11px] font-mono font-bold text-cyan-100">{phoneNumber}</span>
                      </div>
                    </a>
                  </div>

                  {/* Bottom Quick Collapse Option (Mobile Only) */}
                  <button
                    type="button"
                    onClick={() => toggleCardExpansion(plan.id)}
                    className="md:hidden w-full mt-3 text-center text-[11px] text-slate-400 hover:text-slate-200 font-semibold flex items-center justify-center gap-1 transition-colors"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                    <span>Hide Details</span>
                  </button>
                </div>
              );

              const renderFullStandard = (isDesktopOnly = false) => (
                <div
                  key={plan.id + (isDesktopOnly ? '-desktop' : '')}
                  style={{ borderTop: `4px solid ${plan.providerColor || '#2563EB'}` }}
                  className={`${isDesktopOnly ? 'hidden md:flex' : 'flex'} bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 border transition-all duration-300 flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] ${carrierAtmosphere} ${
                    isAddedToCompare 
                      ? 'border-amber-500 shadow-md ring-2 ring-amber-100' 
                      : 'border-slate-200/90'
                  }`}
                >
                  <div>
                    {/* Top Provider Header with Vector SVG Logo and Mobile-Only Collapse Trigger */}
                    <div className="flex items-center justify-between gap-2 mb-3.5">
                      <div className="flex items-center gap-2">
                        <CarrierLogo id={plan.providerId} name={plan.providerName} className="h-5 w-auto max-w-[130px]" />
                        <span className="text-[11px] font-semibold bg-slate-100/90 text-slate-700 px-2.5 py-0.5 rounded-full border border-slate-200/60">
                          {plan.providerType}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleCardExpansion(plan.id)}
                        className="md:hidden text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 py-1 px-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors"
                        title="Collapse card"
                      >
                        <span>Hide</span>
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Plan Name & Popular Badge */}
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-black text-slate-900 tracking-tight leading-snug">
                        {plan.name}
                      </h3>
                      {plan.popular && (
                        <span className="shrink-0 text-[10px] font-extrabold tracking-wide px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                          Popular
                        </span>
                      )}
                    </div>

                    {/* Speed Specification */}
                    <div className="mt-4 p-3.5 rounded-2xl bg-slate-50/90 border border-slate-100 flex items-center justify-around text-center">
                      <div>
                        <div className="text-[10px] text-slate-500 font-semibold uppercase">Download</div>
                        <div className="text-lg font-black text-blue-700 font-mono">{plan.downloadSpeed}</div>
                      </div>
                      <div className="h-6 w-px bg-slate-200"></div>
                      <div>
                        <div className="text-[10px] text-slate-500 font-semibold uppercase">Upload</div>
                        <div className="text-lg font-black text-slate-800 font-mono">{plan.uploadSpeed}</div>
                      </div>
                    </div>

                    {/* Pricing & Terms */}
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-900 font-mono">${plan.price}</span>
                      <span className="text-xs text-slate-500 font-medium">/{plan.period}</span>
                      <span className="ml-auto text-xs text-emerald-700 font-bold">
                        {plan.contract}
                      </span>
                    </div>

                    {/* Equipment & Details */}
                    <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                      <div className="flex items-center gap-2">
                        <Wifi className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>{plan.equipmentFee}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Setup: {plan.installationSla}</span>
                      </div>
                    </div>

                    {/* Perks List */}
                    <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                      {plan.perks.map((perk, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{perk}</span>
                        </div>
                      ))}
                    </div>

                    {/* Official FCC Broadband Facts Label Trigger */}
                    <button
                      type="button"
                      onClick={() => {
                        setFccModalPlan(plan);
                        setFccModalProvider(serviceableProviders.find(p => p.id === plan.providerId));
                      }}
                      className="w-full mt-3.5 py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-[11px] font-bold text-slate-700 flex items-center justify-center gap-1.5 transition-colors group shadow-2xs"
                      title="View Official Federal Communications Commission Consumer Disclosure"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-600 group-hover:scale-110 transition-transform" />
                      <span>Official FCC Broadband Facts</span>
                    </button>
                  </div>

                  {/* Actions: Add to Compare & Direct Call Button */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onToggleCartPlan(plan)}
                      className={`min-h-[44px] py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shrink-0 border ${
                        isAddedToCompare 
                          ? 'bg-amber-50 text-amber-900 border-amber-300 ring-2 ring-amber-200/60' 
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200/80'
                      }`}
                      title={isAddedToCompare ? 'Remove from comparison' : 'Compare this plan side-by-side'}
                      aria-label="Add to comparison"
                    >
                      {isAddedToCompare ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-amber-700 stroke-[3]" />
                          <span>Comparing</span>
                        </>
                      ) : (
                        <>
                          <ArrowLeftRight className="w-3.5 h-3.5 text-slate-500" />
                          <span>Compare</span>
                        </>
                      )}
                    </button>

                    <a
                      href={telHref}
                      onClick={(e) => e.stopPropagation()}
                      className="min-h-[44px] flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-black text-xs flex items-center justify-center gap-2 shadow-sm shadow-emerald-600/20 transition-all text-center"
                      title={`Call ${phoneNumber} to order ${plan.name}`}
                    >
                      <PhoneCall className="w-3.5 h-3.5 shrink-0" />
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-1.5 truncate">
                        <span className="font-black text-xs">Call to Order:</span>
                        <span className="text-[11px] font-mono font-bold text-emerald-100">{phoneNumber}</span>
                      </div>
                    </a>
                  </div>

                  {/* Bottom Quick Collapse Option (Mobile Only) */}
                  <button
                    type="button"
                    onClick={() => toggleCardExpansion(plan.id)}
                    className="md:hidden w-full mt-3 text-center text-[11px] text-slate-400 hover:text-slate-600 font-semibold flex items-center justify-center gap-1 transition-colors"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                    <span>Hide Details</span>
                  </button>
                </div>
              );

              /* ---------------------------------------------------- */
              /* STARLINK BESPOKE OBSIDIAN CARDS                     */
              /* ---------------------------------------------------- */
              if (isStarlink) {
                if (!isExpanded) {
                  return (
                    <React.Fragment key={plan.id}>
                      {/* Collapsed Starlink Card (Mobile Only) */}
                      <div
                        onClick={() => toggleCardExpansion(plan.id)}
                        className={`md:hidden cursor-pointer rounded-2xl p-4 transition-all duration-300 flex flex-col justify-between bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-2 border-slate-700/80 text-white shadow-md hover:border-cyan-400 hover:shadow-cyan-500/15 group ${carrierAtmosphere} ${
                          isAddedToCompare ? 'ring-2 ring-cyan-400' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3 min-w-0">
                            <CarrierLogo id="starlink" name={plan.providerName} className="h-5 w-auto text-white shrink-0" />
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <h4 className="font-black text-xs sm:text-sm text-white truncate">
                                  {plan.name}
                                </h4>
                                <span className="text-[10px] font-mono uppercase tracking-wider font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 px-2 py-0.5 rounded-full shrink-0">
                                  LEO Orbit
                                </span>
                              </div>
                              <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                                <span className="font-mono font-bold text-cyan-300">{plan.downloadSpeed}</span>
                                <span>&bull;</span>
                                <span className="truncate text-slate-300">{plan.contract}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
                            <div className="text-right pr-0.5 sm:pr-1">
                              <div className="flex items-baseline justify-end gap-0.5">
                                <span className="text-lg sm:text-2xl font-black text-white font-mono">${plan.price}</span>
                                <span className="text-[10px] text-slate-400">/{plan.period}</span>
                              </div>
                              <span className="text-[10px] text-cyan-300 font-mono hidden md:inline">
                                SpaceX LEO
                              </span>
                            </div>

                            {/* 1-Tap Direct Native Call Button on Collapsed Card */}
                            <a
                              href={telHref}
                              onClick={(e) => e.stopPropagation()}
                              className="min-h-[38px] sm:min-h-[40px] px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 active:scale-95 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all shrink-0"
                              title={`Call ${phoneNumber} to order ${plan.name}`}
                            >
                              <PhoneCall className="w-3.5 h-3.5 shrink-0" />
                              <span className="font-black text-xs">Call</span>
                              <span className="hidden sm:inline font-mono text-[11px] text-cyan-100 font-bold">to Order</span>
                            </a>

                            {/* Expand Details Toggle */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleCardExpansion(plan.id);
                              }}
                              className="min-h-[38px] sm:min-h-[40px] px-2 sm:px-2.5 py-1.5 sm:py-2 rounded-xl bg-slate-800 text-cyan-300 hover:bg-slate-700 border border-slate-700 transition-all flex items-center gap-1 text-xs font-bold shrink-0"
                              title="Expand plan details"
                            >
                              <span className="hidden xs:inline">Details</span>
                              <ChevronDown className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Expanded Starlink Card (Always Open on Desktop Browsers) */}
                      {renderFullStarlink(true)}
                    </React.Fragment>
                  );
                }

                // Expanded Starlink Card (Mobile Expanded View & Desktop View)
                return renderFullStarlink(false);
              }

              /* ---------------------------------------------------- */
              /* STANDARD LUXURY CARDS                               */
              /* ---------------------------------------------------- */
              if (!isExpanded) {
                // Collapsed Standard Card
                return (
                  <React.Fragment key={plan.id}>
                    {/* Collapsed Standard Card (Mobile Only) */}
                    <div
                      style={{ borderTop: `4px solid ${plan.providerColor || '#2563EB'}` }}
                      onClick={() => toggleCardExpansion(plan.id)}
                      className={`md:hidden cursor-pointer bg-white/95 backdrop-blur-xl rounded-2xl p-4 border transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-blue-300 group ${carrierAtmosphere} ${
                        isAddedToCompare ? 'border-amber-500 ring-2 ring-amber-100' : 'border-slate-200/90'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <CarrierLogo id={plan.providerId} name={plan.providerName} className="h-5 w-auto max-w-[120px] shrink-0" />
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 truncate">
                                {plan.name}
                              </h4>
                              <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full shrink-0 hidden xs:inline-block">
                                {plan.providerType}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                              <span className="font-mono font-bold text-blue-700">{plan.downloadSpeed}</span>
                              <span>&bull;</span>
                              <span className="truncate text-slate-500">{plan.contract}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
                          <div className="text-right pr-0.5 sm:pr-1">
                            <div className="flex items-baseline justify-end gap-0.5">
                              <span className="text-lg sm:text-2xl font-black text-slate-900 font-mono">${plan.price}</span>
                              <span className="text-[10px] text-slate-500 font-medium">/{plan.period}</span>
                            </div>
                            <span className="text-[10px] text-emerald-600 font-bold hidden md:inline">
                              Promo locked
                            </span>
                          </div>

                          {/* 1-Tap Direct Native Call Button on Collapsed Card */}
                          <a
                            href={telHref}
                            onClick={(e) => e.stopPropagation()}
                            className="min-h-[38px] sm:min-h-[40px] px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 active:scale-95 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm shadow-emerald-600/20 transition-all shrink-0"
                            title={`Call ${phoneNumber} to order ${plan.name}`}
                          >
                            <PhoneCall className="w-3.5 h-3.5 shrink-0" />
                            <span className="font-black text-xs">Call</span>
                            <span className="hidden sm:inline font-mono text-[11px] text-emerald-100 font-bold">to Order</span>
                          </a>

                          {/* Expand Details Toggle */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleCardExpansion(plan.id);
                            }}
                            className="min-h-[38px] sm:min-h-[40px] px-2 sm:px-2.5 py-1.5 sm:py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-all flex items-center gap-1 text-xs font-bold shrink-0"
                            title="Expand plan details"
                          >
                            <span className="hidden xs:inline">Details</span>
                            <ChevronDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Standard Card (Always Open on Desktop Browsers) */}
                    {renderFullStandard(true)}
                  </React.Fragment>
                );
              }

              // Expanded Standard Card (Mobile Expanded View & Desktop View)
              return renderFullStandard(false);
            })}
          </div>
        )}
      </div>

      {/* Live Tech Infrastructure Diagnostics Strip (Positioned below carrier results) */}
      <div className="mt-10">
        <TechSignalDiagnostics cityName={cityName} address={localAddressInput} />
      </div>

      {/* Official FCC Broadband Facts Modal */}
      <FccBroadbandFactsModal
        isOpen={!!fccModalPlan}
        onClose={() => {
          setFccModalPlan(null);
          setFccModalProvider(null);
        }}
        plan={fccModalPlan}
        provider={fccModalProvider}
        cityName={cityName}
      />
    </section>
  );
}
