import React, { useState, useMemo, useEffect, useRef } from 'react';
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
  ChevronUp,
  Sparkles,
  Award,
  ChevronRight
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
  isAddressQualified = false,
  onClearAddress,
  activeProviderIds,
  lookupSource,
  isSearching,
  onExecuteSearch,
  onSelectNearbyCity,
  nearbyCities = [],
  speedFilterOverride,
  techFilter,
  catalog,
  cityName = '',
  state = '',
  zip = '',
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

  // Apply techFilter if provided
  useEffect(() => {
    if (techFilter) {
      if (techFilter.includes('fiber')) setTypeFilter('Fiber');
      else if (techFilter.includes('5g')) setTypeFilter('5G Home Internet');
      else if (techFilter.includes('satellite')) setTypeFilter('Satellite');
    }
  }, [techFilter]);

  // Apply speed filter override if set from speed quiz
  useEffect(() => {
    if (speedFilterOverride) {
      setSpeedFilter(speedFilterOverride);
    }
  }, [speedFilterOverride]);

  // Set of card IDs that are expanded in qualified view
  const [expandedPlanIds, setExpandedPlanIds] = useState(() => new Set());
  const hasAutoExpandedRef = useRef(false);

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

  // Pre-search city view: Top Picks card expansion
  const [expandedPickIds, setExpandedPickIds] = useState(() => new Set());
  const hasAutoExpandedPicksRef = useRef(false);

  useEffect(() => {
    if (cityTopPicks && cityTopPicks.length > 0 && !hasAutoExpandedPicksRef.current) {
      setExpandedPickIds(new Set(cityTopPicks.map(p => p.id)));
      hasAutoExpandedPicksRef.current = true;
    }
  }, [cityTopPicks]);

  const togglePickExpansion = (pickId) => {
    setExpandedPickIds(prev => {
      const next = new Set(prev);
      if (next.has(pickId)) {
        next.delete(pickId);
      } else {
        next.add(pickId);
      }
      return next;
    });
  };

  const handleExpandAllPicks = () => {
    setExpandedPickIds(new Set(cityTopPicks.map(p => p.id)));
  };

  const handleCollapseAllPicks = () => {
    setExpandedPickIds(new Set());
  };

  // Pre-search city view: Table row expansion
  const [expandedTableRowIds, setExpandedTableRowIds] = useState(() => new Set());

  const toggleTableRow = (rowId) => {
    setExpandedTableRowIds(prev => {
      const next = new Set(prev);
      if (next.has(rowId)) {
        next.delete(rowId);
      } else {
        next.add(rowId);
      }
      return next;
    });
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

  // Qualified state evaluation: true only if user searched a specific street address
  const isQualified = Boolean(isAddressQualified && (localAddressInput || currentAddress));

  // Auto-expand first 3 plans upon initial address qualification
  useEffect(() => {
    if (isQualified && !hasAutoExpandedRef.current && filteredPlans.length > 0) {
      setExpandedPlanIds(new Set(filteredPlans.slice(0, 3).map(p => p.id)));
      hasAutoExpandedRef.current = true;
    } else if (!isQualified) {
      hasAutoExpandedRef.current = false;
    }
  }, [isQualified, filteredPlans]);

  const focusAddressInput = () => {
    const el = document.getElementById('marketplace-address-input') || 
               document.querySelector('input[placeholder*="Search your street address"]') ||
               document.querySelector('input[placeholder*="street address"]') ||
               document.querySelector('input[placeholder*="Type any street address"]');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.focus();
    }
  };

  // Curated Top 3 Picks for the City (Fiber Pick, Cable Pick, Value/5G Pick)
  const cityTopPicks = useMemo(() => {
    const activeData = catalog || PROVIDERS_CATALOG;
    const baseList = (activeProviderIds && activeProviderIds.length > 0)
      ? activeProviderIds
      : ['att', 'spectrum', 'verizon', 'tmobile', 'frontier', 'earthlink', 'starlink'];
    
    const marketProviders = activeData.filter(p => !p.paused && baseList.includes(p.id));
    const pool = marketProviders.length >= 3 ? marketProviders : activeData.filter(p => !p.paused);

    // 1. Fiber Pick
    let fiberPick = pool.find(p => p.type?.toLowerCase().includes('fiber') && !p.id.includes('viasat') && !p.id.includes('starlink'));
    if (!fiberPick) {
      fiberPick = pool.find(p => ['att', 'frontier', 'earthlink', 'verizon', 'ziply', 'altafiber'].includes(p.id)) || pool[0];
    }

    // 2. Cable Pick
    let cablePick = pool.find(p => p.type?.toLowerCase().includes('cable') && p.id !== fiberPick?.id);
    if (!cablePick) {
      cablePick = pool.find(p => ['spectrum', 'comcast', 'cox', 'astound', 'breezeline'].includes(p.id) && p.id !== fiberPick?.id) || pool[1] || pool[0];
    }

    // 3. Value / 5G Pick
    let valuePick = pool.find(p => (p.id === 'tmobile' || p.id === 'verizon') && p.id !== fiberPick?.id && p.id !== cablePick?.id);
    if (!valuePick) {
      valuePick = pool.find(p => p.id !== fiberPick?.id && p.id !== cablePick?.id) || pool[2] || pool[0];
    }

    const picks = [];
    if (fiberPick) {
      const bestPlan = fiberPick.plans.find(p => p.popular) || fiberPick.plans[0];
      picks.push({
        id: `pick-${fiberPick.id}`,
        badge: 'Top Pick • Best Fiber Internet',
        badgeColor: 'bg-emerald-600 text-white',
        borderColor: 'hover:border-emerald-500 hover:shadow-emerald-500/10',
        provider: fiberPick,
        plan: bestPlan,
        category: 'Pure Fiber Optic',
        providerPlans: fiberPick.plans
      });
    }
    if (cablePick && cablePick.id !== fiberPick?.id) {
      const bestPlan = cablePick.plans.find(p => p.popular) || cablePick.plans[0];
      picks.push({
        id: `pick-${cablePick.id}`,
        badge: 'Top Pick • Best Cable Broadband',
        badgeColor: 'bg-blue-600 text-white',
        borderColor: 'hover:border-blue-500 hover:shadow-blue-500/10',
        provider: cablePick,
        plan: bestPlan,
        category: 'High-Speed Cable',
        providerPlans: cablePick.plans
      });
    }
    if (valuePick && valuePick.id !== fiberPick?.id && valuePick.id !== cablePick?.id) {
      const bestPlan = valuePick.plans.find(p => p.popular) || valuePick.plans[0];
      picks.push({
        id: `pick-${valuePick.id}`,
        badge: 'Top Pick • Best Value & 5G',
        badgeColor: 'bg-purple-600 text-white',
        borderColor: 'hover:border-purple-500 hover:shadow-purple-500/10',
        provider: valuePick,
        plan: bestPlan,
        category: '5G Home / Wireless',
        providerPlans: valuePick.plans
      });
    }
    return picks;
  }, [catalog, activeProviderIds]);

  // City Providers Comparison Table Data (Crawlable pSEO Entity Data)
  const cityComparisonTable = useMemo(() => {
    const activeData = catalog || PROVIDERS_CATALOG;
    const baseList = (activeProviderIds && activeProviderIds.length > 0)
      ? activeProviderIds
      : ['att', 'spectrum', 'verizon', 'tmobile', 'earthlink', 'starlink', 'directv'];
    
    const providers = activeData.filter(p => !p.paused && baseList.includes(p.id));
    const displayList = providers.length > 0 ? providers : activeData.filter(p => !p.paused).slice(0, 6);

    return displayList.map(p => {
      const sortedPlans = [...p.plans].sort((a, b) => a.price - b.price);
      const startingPrice = sortedPlans[0]?.price || 49.99;
      
      const speeds = p.plans.map(plan => parseInt(plan.downloadSpeed) || 0);
      const maxSpeedNum = Math.max(...speeds, 300);
      const maxSpeedStr = maxSpeedNum >= 1000 ? `${maxSpeedNum / 1000} Gbps` : `${maxSpeedNum} Mbps`;

      return {
        id: p.id,
        name: p.name,
        fullName: p.fullName,
        type: p.type,
        category: p.category,
        startingPrice,
        maxSpeed: maxSpeedStr,
        contract: p.plans[0]?.contract || 'No annual contract',
        samplePlan: sortedPlans[0] || p.plans[0],
        allPlans: p.plans,
        rawProvider: p
      };
    });
  }, [catalog, activeProviderIds]);

  return (
    <section id="plans-marketplace" className="pt-2 sm:pt-6 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      
      {/* Search Header Bar (Clean & Compact) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 mb-0.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isQualified ? 'FCC Verified Service Availability' : 'FCC Speed Benchmarks & Local Carrier Matrix'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {isQualified 
              ? `Plans Available at ${localAddressInput || currentAddress}` 
              : (cityName ? `Internet & TV Providers in ${cityName}${state ? `, ${state}` : ''}` : 'Internet & TV Providers in Your Area')}
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

      {/* Address Search Bar (Always visible for fast qualification) */}
      <div id="marketplace-address-input" className="mt-4 sm:mt-6 p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <div className="text-xs font-semibold text-slate-700 mb-2 flex items-center justify-between">
          <span>Search Exact Street Address:</span>
          <span className="text-xs text-blue-700 font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isQualified ? `${serviceableProviders.length} Providers Verified` : `${cityComparisonTable.length} Top Carriers Featured`}</span>
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

      {isQualified ? (
        <>
          {/* Qualified Address Banner */}
          <div className="mt-5 p-4 sm:p-5 rounded-3xl bg-emerald-50/90 border border-emerald-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-600 text-white px-2.5 py-0.5 rounded-full">
                    Address Verified
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                    {localAddressInput || currentAddress}
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-emerald-800 font-medium mt-0.5">
                  Showing <strong>{filteredPlans.length} plans</strong> serviceable at your location from FCC broadband map data.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                if (onClearAddress) {
                  onClearAddress();
                }
                setLocalAddressInput('');
                focusAddressInput();
              }}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all shrink-0 shadow-2xs"
            >
              <ArrowLeftRight className="w-3.5 h-3.5 text-blue-600" />
              <span>Change Address / Browse City</span>
            </button>
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

            {/* Expand / Collapse All Controls */}
            <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl text-xs font-bold border border-slate-200">
              <button
                type="button"
                onClick={handleExpandAll}
                className={`px-3 py-1 rounded-lg transition-all font-bold ${
                  expandedPlanIds.size > 0 ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Expand All
              </button>
              <span className="text-slate-300">&bull;</span>
              <button
                type="button"
                onClick={handleCollapseAll}
                className={`px-3 py-1 rounded-lg transition-all font-bold ${
                  expandedPlanIds.size === 0 ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
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
              /* (Collapsible & Expandable on All Devices)           */
              /* ---------------------------------------------------- */
              const renderFullStarlink = () => (
                <div
                  key={plan.id}
                  className={`flex rounded-2xl sm:rounded-3xl p-4 sm:p-6 transition-all duration-300 flex-col justify-between bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-2 border-slate-700/80 text-white shadow-[0_20px_50px_rgba(15,23,42,0.45)] ${carrierAtmosphere} ${
                    isAddedToCompare ? 'ring-2 ring-cyan-400' : ''
                  }`}
                >
                  <div>
                    {/* Top Provider Header with Vector Logo and Collapse Trigger */}
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
                        className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1 py-1 px-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700 transition-colors"
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

                  {/* Bottom Quick Collapse Option */}
                  <button
                    type="button"
                    onClick={() => toggleCardExpansion(plan.id)}
                    className="w-full mt-3 text-center text-[11px] text-slate-400 hover:text-slate-200 font-semibold flex items-center justify-center gap-1 transition-colors"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                    <span>Hide Details</span>
                  </button>
                </div>
              );

              const renderFullStandard = () => (
                <div
                  key={plan.id}
                  style={{ borderTop: `4px solid ${plan.providerColor || '#2563EB'}` }}
                  className={`flex bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 border transition-all duration-300 flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] ${carrierAtmosphere} ${
                    isAddedToCompare 
                      ? 'border-amber-500 shadow-md ring-2 ring-amber-100' 
                      : 'border-slate-200/90'
                  }`}
                >
                  <div>
                    {/* Top Provider Header with Vector SVG Logo and Collapse Trigger */}
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
                        className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 py-1 px-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors"
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

                  {/* Bottom Quick Collapse Option */}
                  <button
                    type="button"
                    onClick={() => toggleCardExpansion(plan.id)}
                    className="w-full mt-3 text-center text-[11px] text-slate-400 hover:text-slate-600 font-semibold flex items-center justify-center gap-1 transition-colors"
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
                    <div
                      key={plan.id}
                      onClick={() => toggleCardExpansion(plan.id)}
                      className={`cursor-pointer rounded-2xl p-4 transition-all duration-300 flex flex-col justify-between bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-2 border-slate-700/80 text-white shadow-md hover:border-cyan-400 hover:shadow-cyan-500/15 group ${carrierAtmosphere} ${
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
                            <span className="text-[10px] text-cyan-300 font-mono hidden sm:inline">
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
                  );
                }

                // Expanded Starlink Card
                return renderFullStarlink();
              }

              /* ---------------------------------------------------- */
              /* STANDARD LUXURY CARDS                               */
              /* ---------------------------------------------------- */
              if (!isExpanded) {
                // Collapsed Standard Card
                return (
                  <div
                    key={plan.id}
                    style={{ borderTop: `4px solid ${plan.providerColor || '#2563EB'}` }}
                    onClick={() => toggleCardExpansion(plan.id)}
                    className={`cursor-pointer bg-white/95 backdrop-blur-xl rounded-2xl p-4 border transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-blue-300 group ${carrierAtmosphere} ${
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
                          <span className="text-[10px] text-emerald-600 font-bold hidden sm:inline">
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
                );
              }

              // Expanded Standard Card
              return renderFullStandard();
            })}
          </div>
        )}
      </div>
      </>
      ) : (
        <div className="space-y-8 mt-6">
          {/* Top 3 Curated Market Picks */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                  <Sparkles className="w-3 h-3 text-blue-600" />
                  <span>Curated Local Top Picks</span>
                </span>
                <h3 className="text-lg sm:text-2xl font-black text-slate-900 mt-1 tracking-tight">
                  Top Rated Internet Providers in {cityName ? `${cityName}${state ? `, ${state}` : ''}` : 'Your Area'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Verified against regional FCC speed filings, customer reliability ratings, and contract flexibility.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl text-xs font-bold border border-slate-200">
                  <button
                    type="button"
                    onClick={handleExpandAllPicks}
                    className={`px-2.5 py-1 rounded-lg transition-all font-bold ${
                      expandedPickIds.size > 0 ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Expand All
                  </button>
                  <span className="text-slate-300">&bull;</span>
                  <button
                    type="button"
                    onClick={handleCollapseAllPicks}
                    className={`px-2.5 py-1 rounded-lg transition-all font-bold ${
                      expandedPickIds.size === 0 ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Collapse All
                  </button>
                </div>
                <button
                  type="button"
                  onClick={focusAddressInput}
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3.5 py-2 rounded-xl transition-all shrink-0 border border-blue-100"
                >
                  <span>Check Exact Address</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
              {cityTopPicks.map((pick) => {
                const isPickExpanded = expandedPickIds.has(pick.id);
                return (
                  <div 
                    key={pick.id}
                    className={`rounded-3xl p-5 sm:p-6 bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${pick.borderColor} group relative`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className={`text-[10px] font-extrabold tracking-wide uppercase px-2.5 py-1 rounded-full ${pick.badgeColor}`}>
                          {pick.badge}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-400">
                          {pick.category}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-3 my-2.5">
                        <div className="flex items-center gap-2.5">
                          <CarrierLogo id={pick.provider.id} name={pick.provider.name} className="h-6 w-auto max-w-[130px]" />
                          <div className="text-xs font-extrabold text-slate-800">
                            {pick.provider.name}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => togglePickExpansion(pick.id)}
                          className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 py-1 px-2.5 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
                        >
                          <span>{isPickExpanded ? 'Hide' : 'Details'}</span>
                          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isPickExpanded ? 'rotate-180' : ''}`} />
                        </button>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 mt-1">
                        {pick.plan.name}
                      </h4>

                      <div className="my-3.5 p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-center">
                        <div className="flex-1">
                          <div className="text-[10px] uppercase font-bold text-slate-400">Max Speeds</div>
                          <div className="text-base font-black text-blue-700 font-mono">{pick.plan.downloadSpeed}</div>
                        </div>
                        <div className="h-6 w-px bg-slate-200" />
                        <div className="flex-1">
                          <div className="text-[10px] uppercase font-bold text-slate-400">Starting At</div>
                          <div className="text-base font-black text-slate-900 font-mono">${pick.plan.price}<span className="text-[11px] font-normal text-slate-500">/mo</span></div>
                        </div>
                      </div>

                      <div className="space-y-1.5 my-3">
                        {pick.plan.perks.slice(0, 3).map((perk, pIdx) => (
                          <div key={pIdx} className="flex items-start gap-2 text-xs text-slate-600">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{perk}</span>
                          </div>
                        ))}
                      </div>

                      {/* Expand Details Drawer */}
                      {isPickExpanded && (
                        <div className="mt-4 pt-3.5 border-t border-slate-200/80 space-y-3 animate-fade-in text-xs">
                          <div>
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                              Available Plans from {pick.provider.name}
                            </div>
                            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                              {pick.providerPlans.map((pTier) => (
                                <div key={pTier.id} className="p-2 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between gap-2">
                                  <div className="min-w-0">
                                    <div className="flex items-center gap-1.5 truncate">
                                      <span className="font-bold text-slate-900 truncate">{pTier.name}</span>
                                      {pTier.popular && (
                                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 shrink-0">
                                          Popular
                                        </span>
                                      )}
                                    </div>
                                    <div className="text-[10px] text-slate-500 font-mono">
                                      {pTier.downloadSpeed} down &bull; {pTier.uploadSpeed} up
                                    </div>
                                  </div>
                                  <div className="text-right shrink-0">
                                    <div className="font-mono font-bold text-slate-900">${pTier.price}/mo</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Equipment & Setup Details */}
                          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1 text-[11px] text-slate-600">
                            <div className="flex items-center gap-2">
                              <Wifi className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                              <span>{pick.plan.equipmentFee}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>Setup: {pick.plan.installationSla}</span>
                            </div>
                          </div>

                          {/* FCC Facts Trigger */}
                          <button
                            type="button"
                            onClick={() => {
                              setFccModalPlan(pick.plan);
                              setFccModalProvider(pick.provider);
                            }}
                            className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-[11px] font-bold text-slate-700 flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                            <span>Official FCC Broadband Facts</span>
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                      <button
                        type="button"
                        onClick={() => togglePickExpansion(pick.id)}
                        className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <span>{isPickExpanded ? 'Hide All Plans & Specs ▲' : `View All ${pick.providerPlans.length} Plans & Specs ▼`}</span>
                      </button>
                      <button
                        type="button"
                        onClick={focusAddressInput}
                        className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs"
                      >
                        <span>Check Availability at My Address</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <a
                        href={telHref}
                        className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Order by Phone: {phoneNumber}</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* City Broadband Comparison Table (Critical for pSEO & Crawlers) */}
          <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm overflow-hidden p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Crawlable Market Matrix</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">
                  Internet Providers in {cityName ? `${cityName}${state ? `, ${state}` : ''}` : 'Your Area'} at a Glance
                </h3>
              </div>
              <span className="text-xs font-semibold text-slate-500">
                Comparing {cityComparisonTable.length} Top Carriers
              </span>
            </div>

            {/* Semantic HTML Table for Search Engines */}
            <div className="overflow-x-auto -mx-5 sm:mx-0">
              <table className="w-full text-left border-collapse min-w-[640px]">
                <thead>
                  <tr className="border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-50/70">
                    <th scope="col" className="py-3 px-4">Provider</th>
                    <th scope="col" className="py-3 px-4">Max Speed</th>
                    <th scope="col" className="py-3 px-4">Starting Price</th>
                    <th scope="col" className="py-3 px-4">Connection Type</th>
                    <th scope="col" className="py-3 px-4">Contract Terms</th>
                    <th scope="col" className="py-3 px-4 text-right">Plans & Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                  {cityComparisonTable.map((row) => {
                    const isRowExpanded = expandedTableRowIds.has(row.id);
                    return (
                      <React.Fragment key={row.id}>
                        <tr 
                          onClick={() => toggleTableRow(row.id)}
                          className="hover:bg-blue-50/40 cursor-pointer transition-colors"
                        >
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2.5">
                              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isRowExpanded ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
                              <CarrierLogo id={row.id} name={row.name} className="h-5 w-auto max-w-[90px]" />
                              <div>
                                <div className="font-bold text-slate-900">{row.name}</div>
                                <div className="text-[10px] text-slate-400">{row.category || 'National Carrier'}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 font-mono font-bold text-blue-700">
                            {row.maxSpeed}
                          </td>
                          <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                            ${row.startingPrice}<span className="text-[10px] font-normal text-slate-500">/mo</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-medium">
                              {row.type}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-600">
                            {row.contract}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleTableRow(row.id);
                                }}
                                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 border ${
                                  isRowExpanded 
                                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs' 
                                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200/80'
                                }`}
                              >
                                <span>{isRowExpanded ? 'Hide' : 'Plans'}</span>
                                <ChevronDown className={`w-3 h-3 transition-transform ${isRowExpanded ? 'rotate-180' : ''}`} />
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  focusAddressInput();
                                }}
                                className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 text-xs font-bold transition-all shadow-xs"
                              >
                                Qualify
                              </button>
                            </div>
                          </td>
                        </tr>

                        {/* Expandable Accordion Sub-row */}
                        {isRowExpanded && (
                          <tr className="bg-slate-50/90 border-b border-slate-200 animate-fade-in">
                            <td colSpan={6} className="p-4 sm:p-5">
                              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <CarrierLogo id={row.id} name={row.name} className="h-5 w-auto max-w-[100px]" />
                                      <h5 className="font-extrabold text-sm text-slate-900">
                                        {row.name} Plans & Coverage in {cityName || 'Your Area'}
                                      </h5>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-0.5">
                                      Featuring {row.allPlans.length} available service tiers with download speeds up to {row.maxSpeed}.
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2 shrink-0">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setFccModalPlan(row.samplePlan);
                                        setFccModalProvider(row.rawProvider);
                                      }}
                                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors border border-slate-200/80"
                                      title="View Official FCC Consumer Disclosure"
                                    >
                                      <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                                      <span>FCC Broadband Facts</span>
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => toggleTableRow(row.id)}
                                      className="text-xs font-bold text-slate-500 hover:text-slate-800 px-2 py-1 rounded-lg bg-slate-100"
                                    >
                                      Hide ▲
                                    </button>
                                  </div>
                                </div>

                                {/* Available Tiers Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                  {row.allPlans.map(p => (
                                    <div key={p.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
                                      <div>
                                        <div className="flex items-center justify-between gap-1">
                                          <span className="font-extrabold text-xs text-slate-900">{p.name}</span>
                                          {p.popular && (
                                            <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">
                                              Popular
                                            </span>
                                          )}
                                        </div>
                                        <div className="flex items-baseline gap-2 mt-1.5">
                                          <span className="font-mono font-black text-sm text-blue-700">{p.downloadSpeed}</span>
                                          <span className="text-[11px] text-slate-400">/ {p.uploadSpeed}</span>
                                        </div>
                                        <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">{p.contract}</p>
                                      </div>

                                      <div className="mt-3 pt-2.5 border-t border-slate-200/70 flex items-center justify-between">
                                        <div>
                                          <span className="font-mono font-black text-xs sm:text-sm text-slate-900">${p.price}</span>
                                          <span className="text-[10px] text-slate-500">/mo</span>
                                        </div>
                                        <button
                                          type="button"
                                          onClick={focusAddressInput}
                                          className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold transition-all shadow-2xs"
                                        >
                                          Check Address
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* High-Converting Address Qualification Gate Banner */}
          <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-bold mb-3 border border-white/10">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>Exact Address Qualification</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                Looking for exact plans and live promotions at your address?
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-blue-100/90 leading-relaxed">
                Broadband availability changes street-by-street in {cityName || 'your city'}. Enter your full street address to unlock exact gigabit speeds, promotional price locks, and exclusive mover gift cards for your home.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={focusAddressInput}
                  className="px-5 py-3 rounded-2xl bg-blue-500 hover:bg-blue-400 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-blue-500/30 transition-all active:scale-95"
                >
                  <Search className="w-4 h-4" />
                  <span>Enter Address to Unlock Plans</span>
                </button>
                <a
                  href={telHref}
                  className="px-5 py-3 rounded-2xl bg-white/15 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-2 border border-white/20 transition-all"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                  <span>Call {phoneNumber}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

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
