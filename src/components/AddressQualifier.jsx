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
  ChevronRight,
  Globe
} from 'lucide-react';
import { SAMPLE_MARKETS } from '../data/sampleMarkets';
import { PROVIDERS_CATALOG } from '../data/providersData';
import { FccBroadbandFactsModal } from './FccBroadbandFactsModal';
import { LocalCarrierCarousel } from './LocalCarrierCarousel';
import { CarrierLogo } from './CarrierLogos';
import { DEFAULT_PHONE_NUMBER } from '../services/catalogService';


const getValidUrl = (url) => {
  if (!url) return '';
  const trimmed = url.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  return 'https://' + trimmed;
};

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
  topPicks,
  catalog,
  cityName = '',
  state = '',
  zip = '',
  phoneNumber = DEFAULT_PHONE_NUMBER
}) {
  const [localAddressInput, setLocalAddressInput] = useState(currentAddress || '');

  const toTitleCase = (str) => {
    if (!str) return '';
    return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };
  const formattedCityName = cityName ? toTitleCase(cityName) : '';

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
    const el = document.querySelector('#hero-address-form input');
    if (el) {
      el.focus({ preventScroll: true });
      el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
    }
  };

  // Local carrier details rendered in full for crawlers and visitors
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
    <section id="plans-marketplace" className="storefront-marketplace pt-2 sm:pt-6 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      
      {/* Search Header Bar (Clean & Compact) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {isQualified 
              ? `Plan Options for ${localAddressInput || currentAddress}`
              : (cityName ? `Internet & TV Providers in ${formattedCityName}${state ? `, ${state}` : ''}` : 'Internet & TV Providers in Your Area')}
          </h2>
        </div>

        {/* Speed Quiz Button + Comparison Cart Status */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenSpeedQuiz}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50/50 text-slate-700 border border-slate-200 text-xs font-bold transition-all shadow-xs"
          >
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Speed Quiz</span>
          </button>

          <button
            onClick={onOpenCart}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-xs ${
              comparisonCart.length > 0 
                ? 'bg-amber-500 text-white border-amber-600 shadow-sm' 
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50/50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Compare ({comparisonCart.length}/3)</span>
          </button>
        </div>
      </div>

      {isQualified ? (
        <>
          {/* Qualified Address Banner */}
          <div className="mt-5 p-4 sm:p-5 rounded-3xl bg-emerald-500/10 backdrop-blur-xl border border-emerald-500/20 shadow-lg shadow-emerald-900/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-600 text-white px-2.5 py-0.5 rounded-full">
                    Address Received
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                    {localAddressInput || currentAddress}
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-emerald-800 font-medium mt-0.5">
                  Showing <strong>{filteredPlans.length} plans</strong> to review. Confirm current availability and terms with the selected carrier.
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
              <ArrowLeftRight className="w-3.5 h-3.5 text-indigo-600" />
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
          <Filter className="w-3.5 h-3.5 text-indigo-600" />
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
            <Filter className="w-3.5 h-3.5 text-indigo-600" />
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
              className="w-full pl-7 pr-3 py-1.5 bg-slate-50/50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 text-base sm:text-xs focus:outline-none focus:border-indigo-600"
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
                  expandedPlanIds.size > 0 ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
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

        {isSearching ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 items-start">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="animate-pulse bg-white/60 backdrop-blur-xl rounded-2xl p-4 sm:p-5 border border-white shadow-sm flex items-center justify-between">
                <div className="flex flex-col xs:flex-row xs:items-center gap-3 sm:gap-4 w-full">
                  <div className="w-20 h-6 bg-slate-200/70 rounded-md shrink-0"></div>
                  <div className="flex flex-col gap-2 w-full">
                    <div className="w-32 h-4 bg-slate-200/70 rounded"></div>
                    <div className="w-16 h-3 bg-slate-100/70 rounded"></div>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0 pl-4">
                  <div className="w-14 h-6 bg-slate-200/70 rounded hidden xs:block"></div>
                  <div className="w-8 h-8 rounded-full bg-slate-100/80 shrink-0"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredPlans.length === 0 ? (
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
              className="mt-3 px-4 py-2 rounded-xl bg-indigo-50 text-indigo-700 text-xs font-bold hover:bg-blue-100"
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
              const planProvider = catalog.find(p => p.id === plan.providerId);
              
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
                      title="Review catalog plan details"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span>Plan Details & Fees</span>
                    </button>
                  </div>

                  {/* Actions: Compare & Call */}
                  <div className="mt-4 pt-3 border-t border-slate-800 space-y-2">
                    <div className="flex gap-2">
                      <a
                        href={telHref}
                        onClick={(e) => e.stopPropagation()}
                        className="min-h-[44px] flex-1 py-2 px-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-md shadow-cyan-500/20 transition-all text-center"
                        title={`Call ${phoneNumber} to order`}
                      >
                        <PhoneCall className="w-3.5 h-3.5 shrink-0" />
                        <span>{planProvider?.enrollUrl ? 'Call Now' : `Call: ${phoneNumber}`}</span>
                      </a>
                      
                      {planProvider?.enrollUrl && (
                        <a
                          href={getValidUrl(planProvider.enrollUrl)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="min-h-[44px] flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 font-black text-xs flex items-center justify-center gap-2 border border-slate-700 transition-all text-center"
                        >
                          <Globe className="w-3.5 h-3.5 shrink-0" />
                          <span>Order Online</span>
                        </a>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => onToggleCartPlan(plan)}
                      className={`w-full min-h-[40px] py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border ${
                        isAddedToCompare 
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 ring-2 ring-cyan-400/30' 
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border-slate-700'
                      }`}
                      title={isAddedToCompare ? 'Remove from comparison' : 'Compare with other plans'}
                    >
                      {isAddedToCompare ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-cyan-300 stroke-[3]" />
                          <span>Comparing</span>
                        </>
                      ) : (
                        <>
                          <ArrowLeftRight className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Compare this plan</span>
                        </>
                      )}
                    </button>
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
                        <span className="shrink-0 text-[10px] font-extrabold tracking-wide px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-blue-200">
                          Popular
                        </span>
                      )}
                    </div>

                    {/* Speed Specification */}
                    <div className="mt-4 p-3.5 rounded-2xl bg-slate-50/50/90 border border-slate-100 flex items-center justify-around text-center">
                      <div>
                        <div className="text-[10px] text-slate-500 font-semibold uppercase">Download</div>
                        <div className="text-lg font-black text-indigo-700 font-mono">{plan.downloadSpeed}</div>
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
                        <Wifi className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
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

                    {/* Plan Details & Fees Label Trigger */}
                    <button
                      type="button"
                      onClick={() => {
                        setFccModalPlan(plan);
                        setFccModalProvider(serviceableProviders.find(p => p.id === plan.providerId));
                      }}
                      className="w-full mt-3.5 py-2 px-3 rounded-xl bg-slate-50/50 hover:bg-slate-100 border border-slate-200/80 text-[11px] font-bold text-slate-700 flex items-center justify-center gap-1.5 transition-colors group shadow-2xs"
                      title="View Official Federal Communications Commission Consumer Disclosure"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 group-hover:scale-110 transition-transform" />
                      <span>Plan Details & Fees</span>
                    </button>
                  </div>

                  {/* Actions: Add to Compare & Direct Call Button */}
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                    <div className="flex gap-2">
                      <a
                        href={telHref}
                        onClick={(e) => e.stopPropagation()}
                        className="min-h-[44px] flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-black text-xs flex items-center justify-center gap-2 shadow-sm shadow-emerald-600/20 transition-all text-center"
                        title={`Call ${phoneNumber} to order`}
                      >
                        <PhoneCall className="w-3.5 h-3.5 shrink-0" />
                        <span>{planProvider?.enrollUrl ? 'Call Now' : `Call: ${phoneNumber}`}</span>
                      </a>
                      
                      {planProvider?.enrollUrl && (
                        <a
                          href={getValidUrl(planProvider.enrollUrl)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="min-h-[44px] flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-sm transition-all text-center border border-slate-700"
                        >
                          <Globe className="w-3.5 h-3.5 shrink-0" />
                          <span>Order Online</span>
                        </a>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => onToggleCartPlan(plan)}
                      className={`w-full min-h-[40px] py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border ${
                        isAddedToCompare 
                          ? 'bg-amber-50 text-amber-900 border-amber-300 ring-2 ring-amber-200/60' 
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200/80'
                      }`}
                      title={isAddedToCompare ? 'Remove from comparison' : 'Compare this plan side-by-side'}
                    >
                      {isAddedToCompare ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-amber-700 stroke-[3]" />
                          <span>Comparing</span>
                        </>
                      ) : (
                        <>
                          <ArrowLeftRight className="w-3.5 h-3.5 text-slate-500" />
                          <span>Compare this plan</span>
                        </>
                      )}
                    </button>
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
                      className={`cursor-pointer rounded-2xl p-4 sm:p-5 transition-all duration-300 flex flex-col justify-between bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-2 border-slate-700/80 text-white shadow-md hover:border-cyan-400 hover:shadow-cyan-500/15 group ${carrierAtmosphere} ${
                        isAddedToCompare ? 'ring-2 ring-cyan-400' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex flex-col xs:flex-row xs:items-center gap-3 sm:gap-4 min-w-0">
                          <CarrierLogo id="starlink" name={plan.providerName} className="h-5 sm:h-6 w-auto max-w-[100px] text-white shrink-0" />
                          <div className="min-w-0">
                            <h4 className="font-extrabold text-sm text-white truncate">
                              {plan.name}
                            </h4>
                            <div className="text-[11px] font-mono font-bold text-cyan-400 mt-0.5">
                              {plan.downloadSpeed}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                          <div className="text-right">
                            <div className="flex items-baseline justify-end gap-0.5">
                              <span className="text-lg sm:text-2xl font-black text-white font-mono">${plan.price}</span>
                              <span className="text-[10px] text-slate-400">/{plan.period}</span>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleCardExpansion(plan.id);
                            }}
                            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-all flex items-center justify-center shrink-0"
                            title="Expand plan details"
                          >
                            <ChevronDown className="w-4 h-4" />
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
                    className={`cursor-pointer bg-white/95 backdrop-blur-xl rounded-2xl p-4 sm:p-5 border transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-blue-300 group ${carrierAtmosphere} ${
                      isAddedToCompare ? 'border-amber-500 ring-2 ring-amber-100' : 'border-slate-200/90'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex flex-col xs:flex-row xs:items-center gap-3 sm:gap-4 min-w-0">
                        <CarrierLogo id={plan.providerId} name={plan.providerName} className="h-5 sm:h-6 w-auto max-w-[100px] shrink-0" />
                        <div className="min-w-0">
                          <h4 className="font-extrabold text-sm text-slate-900 truncate">
                            {plan.name}
                          </h4>
                          <div className="text-[11px] font-mono font-bold text-indigo-700 mt-0.5">
                            {plan.downloadSpeed}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                        <div className="text-right">
                          <div className="flex items-baseline justify-end gap-0.5">
                            <span className="text-lg sm:text-2xl font-black text-slate-900 font-mono">${plan.price}</span>
                            <span className="text-[10px] text-slate-500 font-medium">/{plan.period}</span>
                          </div>
                        </div>

                        {/* Expand Details Toggle */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCardExpansion(plan.id);
                          }}
                          className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all flex items-center justify-center shrink-0"
                          title="Expand plan details"
                        >
                          <ChevronDown className="w-4 h-4" />
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
          <LocalCarrierCarousel
            rows={cityComparisonTable}
            location={cityName ? `${formattedCityName}${state ? `, ${state}` : ''}` : 'Your Area'}
            telHref={telHref}
            onCheckAddress={focusAddressInput}
            onShowFacts={(plan, provider) => {
              setFccModalPlan(plan);
              setFccModalProvider(provider);
            }}
          />

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

      {/* Plan Details & Fees Modal */}
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
