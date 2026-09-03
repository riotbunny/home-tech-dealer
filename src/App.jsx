import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AddressQualifier } from './components/AddressQualifier';
import { ComparisonCart } from './components/ComparisonCart';
import { CallToOrderModal } from './components/CallToOrderModal';
import { MovingConcierge } from './components/MovingConcierge';
import { ProviderMatrix } from './components/ProviderMatrix';
import { CustomerFaq } from './components/CustomerFaq';
import { SpeedQuizModal } from './components/SpeedQuizModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminPortal } from './components/AdminPortal';
import { MobileStickyActionBar } from './components/MobileStickyActionBar';
import { SwitcherSavingsCalculator } from './components/SwitcherSavingsCalculator';
import { VerifiedSocialProof } from './components/VerifiedSocialProof';
import { Footer } from './components/Footer';
import { LocalMarketGuide } from './components/LocalMarketGuide';
import { CityDirectoryModal } from './components/CityDirectoryModal';
import { useCityRoute } from './hooks/useCityRoute';
import { updateCitySEO } from './services/seoService';
import { getNearbyCities, createCitySlug } from './data/usCitiesData';
import { SAMPLE_MARKETS } from './data/sampleMarkets';
import { lookupBroadbandAvailability, detectUserLocation, getDisplayCityName } from './services/broadbandLookupService';
import { getNearbyRadiusCities } from './data/usCitiesRadiusData';
import { 
  getStoredCatalog, 
  saveCatalog, 
  resetCatalogToDefault, 
  getStoredPhoneNumber, 
  saveStoredPhoneNumber,
  getStoredGoogleApiKey,
  saveStoredGoogleApiKey,
  getStoredDefaultLocation,
  saveStoredDefaultLocation,
  DEFAULT_PHONE_NUMBER
} from './services/catalogService';
import { APIProvider } from '@vis.gl/react-google-maps';
import { Layers, ArrowRight, X, PhoneCall } from 'lucide-react';

export function App() {
  const initialLoc = getStoredDefaultLocation();
  const [activeTab, setActiveTab] = useState('qualifier');
  const [catalog, setCatalog] = useState(getStoredCatalog);
  const [phoneNumber, setPhoneNumber] = useState(getStoredPhoneNumber);
  const [googleApiKey, setGoogleApiKey] = useState(getStoredGoogleApiKey);
  const [defaultLocation, setDefaultLocation] = useState(initialLoc);
  const [selectedMarket, setSelectedMarket] = useState(SAMPLE_MARKETS[0]);
  const [currentAddress, setCurrentAddress] = useState('');
  const [activeProviderIds, setActiveProviderIds] = useState(SAMPLE_MARKETS[0].serviceableProviderIds);
  const [lookupSource, setLookupSource] = useState('Local Provider Network');
  const [isSearching, setIsSearching] = useState(false);
  const [detectedLocation, setDetectedLocation] = useState(null);
  const [cityName, setCityName] = useState(initialLoc.city || '');

  // Admin Tool State
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);
  const [isCityDirectoryOpen, setIsCityDirectoryOpen] = useState(false);

  // Dynamic nearby radius cities (populated purely from geolocation or state data)
  const [nearbyCities, setNearbyCities] = useState([]);

  const [comparisonCart, setComparisonCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSpeedQuizOpen, setIsSpeedQuizOpen] = useState(false);
  const [speedFilterOverride, setSpeedFilterOverride] = useState(null);

  const [callToOrderState, setCallToOrderState] = useState({
    isOpen: false,
    plan: null,
    address: ''
  });

  // Programmatic SEO (pSEO) Dynamic City & 44k ZIP Resolver Callback
  const handleCityResolved = useCallback((cityData) => {
    if (!cityData) return;
    setCityName(cityData.cityName);
    // Keep currentAddress empty so search bar shows inviting placeholder instead of pre-filled address
    setCurrentAddress('');
    setActiveProviderIds(cityData.serviceableProviderIds);
    setLookupSource('Local Provider Network');

    // Update selected market
    setSelectedMarket({
      id: cityData.id,
      city: cityData.cityName,
      state: cityData.state,
      zip: cityData.zip,
      street: cityData.street,
      serviceableProviderIds: cityData.serviceableProviderIds
    });

    // Update nearby cities in that state
    const nearby = getNearbyCities(cityData.cityName, cityData.state);
    if (nearby && nearby.length > 0) {
      setNearbyCities(nearby.map(c => {
        const [ci, st] = c.split(',');
        return { city: ci.trim(), state: st ? st.trim() : cityData.state };
      }));
    }

    // Synchronize dynamic SEO metadata & JSON-LD schema
    updateCitySEO(cityData, phoneNumber);
  }, [phoneNumber]);

  const { currentCityData, navigateToCity } = useCityRoute(handleCityResolved);

  // Synchronize SEO if phone number changes in admin
  useEffect(() => {
    if (currentCityData) {
      updateCitySEO(currentCityData, phoneNumber);
    }
  }, [phoneNumber, currentCityData]);

  // Automatically detect user's city via Geo IP on initial load (only if no specific pSEO slug in URL)
  useEffect(() => {
    async function initUserLocation() {
      // If a specific pSEO city slug is already in the URL or query, let pSEO take priority
      if (typeof window !== 'undefined') {
        const path = window.location.pathname;
        const search = window.location.search;
        if (path.startsWith('/internet/') || (path.includes('-') && path.length > 3) || search.includes('city=') || search.includes('market=')) {
          return;
        }
      }

      try {
        const geo = await detectUserLocation();
        if (geo && geo.city) {
          setDetectedLocation(geo);
          const clean = getDisplayCityName(geo.city, geo.state);
          if (clean) {
            setCityName(clean);
          } else {
            setCityName('');
          }

          if (geo.latitude && geo.longitude) {
            const nearby = getNearbyRadiusCities(geo.latitude, geo.longitude, geo.city, 6);
            if (nearby && nearby.length > 0) {
              setNearbyCities(nearby);
            }
          }

          // Auto-run lookup for user's detected local city and state (do not prefill search bar)
          if (clean) {
            const initialAddr = `${clean}, ${geo.state || ''}`.trim();
            handlePerformAddressSearch(initialAddr, false);
          }
        } else if (defaultLocation.city) {
          const clean = getDisplayCityName(defaultLocation.city, defaultLocation.state);
          setCityName(clean || '');
          if (clean) {
            const initialAddr = defaultLocation.address || `${clean}, ${defaultLocation.state || ''}`.trim();
            handlePerformAddressSearch(initialAddr, false);
          }
        } else {
          setCityName('');
        }
      } catch (err) {
        console.warn('Could not auto-detect location:', err);
        if (defaultLocation.city) {
          const clean = getDisplayCityName(defaultLocation.city, defaultLocation.state);
          setCityName(clean || '');
        } else {
          setCityName('');
        }
      }
    }

    initUserLocation();
  }, []);

  // Execute live address lookup for ANY US address or zip code
  const handlePerformAddressSearch = async (addressQuery, isUserInitiated = true) => {
    if (!addressQuery || !addressQuery.trim()) return;
    setIsSearching(true);
    try {
      const result = await lookupBroadbandAvailability(addressQuery);
      setActiveProviderIds(result.serviceableProviderIds);
      setLookupSource(result.source);
      if (isUserInitiated) {
        setCurrentAddress(result.address || addressQuery);
      }
      
      const clean = getDisplayCityName(result.city, result.state);
      if (clean) {
        setCityName(clean);
      }

      // Update nearby radius cities if coordinates available
      if (result.latitude && result.longitude) {
        const nearby = getNearbyRadiusCities(result.latitude, result.longitude, result.city || clean, 6);
        if (nearby && nearby.length > 0) {
          setNearbyCities(nearby);
        }
      }

      // If the address search identified a valid city and state, synchronize canonical pSEO route and metadata
      if (result.city && result.state) {
        const stateCode = result.state.toUpperCase();
        const citySlug = createCitySlug(result.city);
        const cleanUrl = result.zip 
          ? `/internet/${stateCode.toLowerCase()}/${citySlug}/${result.zip}`
          : `/internet/${stateCode.toLowerCase()}/${citySlug}`;
        
        if (typeof window !== 'undefined' && window.location.pathname !== cleanUrl) {
          window.history.pushState({ canonicalPath: cleanUrl }, '', cleanUrl);
        }
        updateCitySEO({
          cityName: result.city,
          state: stateCode,
          zip: result.zip,
          id: citySlug,
          canonicalPath: cleanUrl,
          city: `${result.city}, ${stateCode}`
        }, phoneNumber);
      }

      const matchingMarket = SAMPLE_MARKETS.find(m => m.city.toLowerCase() === (result.city || '').toLowerCase());
      if (matchingMarket) {
        setSelectedMarket(matchingMarket);
      } else {
        setSelectedMarket({
          id: 'custom-location',
          city: clean,
          state: result.state,
          street: result.address,
          zip: result.zip,
          serviceableProviderIds: result.serviceableProviderIds
        });
      }
    } catch (err) {
      console.warn('Address lookup error:', err);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle clicking a nearby radius city
  const handleSelectNearbyCity = (nearbyCity) => {
    navigateToCity(nearbyCity.city, nearbyCity.state, null, true);
  };

  // Handle quick sample market select
  const handleMarketSelect = (market) => {
    setSelectedMarket(market);
    const addr = `${market.street}, ${market.city} ${market.zip}`;
    setCurrentAddress(addr);
    setActiveProviderIds(market.serviceableProviderIds);
    setLookupSource('Local Provider Network');
  };

  // Toggle plan in comparison cart (max 3)
  const handleToggleCartPlan = (plan) => {
    setComparisonCart(prev => {
      const exists = prev.some(item => item.id === plan.id);
      if (exists) {
        return prev.filter(item => item.id !== plan.id);
      } else {
        if (prev.length >= 3) {
          return [...prev.slice(1), plan];
        }
        return [...prev, plan];
      }
    });
  };

  const handleRemoveCartPlan = (planId) => {
    setComparisonCart(prev => prev.filter(p => p.id !== planId));
  };

  const handleClearCart = () => {
    setComparisonCart([]);
  };

  const handleOpenCallToOrder = (plan, address) => {
    setCallToOrderState({
      isOpen: true,
      plan: plan,
      address: address || currentAddress
    });
  };

  const handleCloseCallToOrder = () => {
    setCallToOrderState(prev => ({ ...prev, isOpen: false }));
  };

  const handleApplySpeedFilter = (tier) => {
    setActiveTab('qualifier');
    setSpeedFilterOverride(tier);
    const element = document.getElementById('plans-marketplace');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  // Admin: Save updated catalog to storage and cascade across UI
  const handleSaveCatalog = (newCatalog) => {
    saveCatalog(newCatalog);
    setCatalog(newCatalog);

    // Sync comparison cart with updated prices & perks
    setComparisonCart(prev => prev.map(cartPlan => {
      const provider = newCatalog.find(p => p.id === cartPlan.providerId);
      const updatedPlan = provider?.plans?.find(p => p.id === cartPlan.id);
      if (updatedPlan) {
        return {
          ...cartPlan,
          ...updatedPlan,
          providerName: provider.name
        };
      }
      return cartPlan;
    }));
  };

  // Admin: Save updated phone number to storage
  const handleSavePhoneNumber = (newPhone) => {
    if (newPhone && newPhone.trim()) {
      saveStoredPhoneNumber(newPhone.trim());
      setPhoneNumber(newPhone.trim());
    }
  };

  // Admin: Save updated Google Maps API key
  const handleSaveGoogleApiKey = (newKey) => {
    if (newKey && newKey.trim()) {
      saveStoredGoogleApiKey(newKey.trim());
      setGoogleApiKey(newKey.trim());
    }
  };

  // Admin: Save default base location
  const handleSaveDefaultLocation = (newLoc) => {
    saveStoredDefaultLocation(newLoc);
    setDefaultLocation(newLoc);
    if (newLoc.city) {
      setCityName(newLoc.city);
    }
    if (newLoc.address) {
      setCurrentAddress(newLoc.address);
    }
  };

  // Admin: Reset catalog to factory defaults
  const handleResetCatalog = () => {
    const defaultCat = resetCatalogToDefault();
    setCatalog(defaultCat);
    return defaultCat;
  };

  return (
    <APIProvider 
      apiKey={googleApiKey} 
      solutionChannel="gmp_git_agentskills_v1"
    >
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white pb-20 lg:pb-0">
      {/* Consumer Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        comparisonCartCount={comparisonCart.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSpeedQuiz={() => setIsSpeedQuizOpen(true)}
        detectedLocation={detectedLocation}
        cityName={cityName}
        state={selectedMarket?.state || currentCityData?.state || ''}
        zip={selectedMarket?.zip || currentCityData?.zip || ''}
        phoneNumber={phoneNumber}
        onOpenCityDirectory={() => setIsCityDirectoryOpen(true)}
      />

      {/* Hero Section */}
      <HeroSection
        onSelectNearbyCity={handleSelectNearbyCity}
        nearbyCities={nearbyCities}
        cityName={cityName}
        state={selectedMarket?.state || currentCityData?.state || ''}
        zip={selectedMarket?.zip || currentCityData?.zip || ''}
        phoneNumber={phoneNumber}
        onSearchAddress={(addr) => {
          setActiveTab('qualifier');
          handlePerformAddressSearch(addr);
          setTimeout(() => {
            const gridEl = document.getElementById('carrier-results-grid') || document.getElementById('plans-marketplace');
            if (gridEl) gridEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 200);
        }}
        onOpenSpeedQuiz={() => setIsSpeedQuizOpen(true)}
      />

      {/* Verified Customer Social Proof & Trust Architecture Ribbon */}
      <VerifiedSocialProof />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'qualifier' && (
          <>
            <AddressQualifier
              comparisonCart={comparisonCart}
              onToggleCartPlan={handleToggleCartPlan}
              onOpenCart={() => setIsCartOpen(true)}
              onOpenCallToOrder={handleOpenCallToOrder}
              onOpenSpeedQuiz={() => setIsSpeedQuizOpen(true)}
              currentAddress={currentAddress}
              setCurrentAddress={setCurrentAddress}
              activeProviderIds={activeProviderIds}
              lookupSource={lookupSource}
              isSearching={isSearching}
              onExecuteSearch={handlePerformAddressSearch}
              onSelectNearbyCity={handleSelectNearbyCity}
              nearbyCities={nearbyCities}
              speedFilterOverride={speedFilterOverride}
              catalog={catalog}
              cityName={cityName}
              phoneNumber={phoneNumber}
            />

            {/* Interactive Switcher Savings Calculator (Positioned below plans as an objection handler) */}
            <SwitcherSavingsCalculator
              phoneNumber={phoneNumber}
              onScrollToMarketplace={() => {
                const el = document.getElementById('carrier-results-grid') || document.getElementById('plans-marketplace');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            />
            {/* Embedded Mover Teaser Banner */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider bg-white/20 text-white px-2.5 py-1 rounded-full">
                    Moving Soon?
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-2.5">
                    Let our Moving Concierge handle your internet setup for free.
                  </h3>
                  <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-xl">
                    Save up to $480/year with exclusive mover bundle discounts, waived setup fees, and gift cards.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={`tel:${phoneNumber.replace(/\D/g, '')}`}
                    className="px-5 py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs flex items-center gap-2 shadow-sm shrink-0 transition-all"
                  >
                    <PhoneCall className="w-4 h-4 text-emerald-600" />
                    <span>Call {phoneNumber}</span>
                  </a>
                  <button
                    onClick={() => setActiveTab('mover')}
                    className="px-5 py-3 rounded-2xl bg-blue-700/80 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 border border-white/20 shrink-0 transition-all"
                  >
                    <span>Moving Guide</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Local Market Overview Guide & Hyper-Targeted Local FAQs for pSEO Authority */}
            <LocalMarketGuide
              cityName={cityName}
              state={selectedMarket?.state || currentCityData?.state || ''}
              zip={selectedMarket?.zip || currentCityData?.zip || ''}
              marketData={selectedMarket || currentCityData}
              phoneNumber={phoneNumber}
            />

            {/* General Consumer Service FAQs */}
            <CustomerFaq />
          </>
        )}

        {activeTab === 'mover' && (
          <MovingConcierge
            onNavigateToSearch={() => {
              setActiveTab('qualifier');
              window.scrollTo({ top: 350, behavior: 'smooth' });
            }}
            phoneNumber={phoneNumber}
          />
        )}

        {activeTab === 'providers' && (
          <ProviderMatrix
            onSelectProviderForFilter={() => setActiveTab('qualifier')}
            catalog={catalog}
          />
        )}

        {activeTab === 'faq' && (
          <CustomerFaq />
        )}
      </main>

      {/* Floating Bottom Comparison Dock */}
      {comparisonCart.length > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-2xl bg-slate-900 text-white border border-slate-700 rounded-2xl p-3.5 shadow-2xl flex items-center justify-between gap-4 animate-slide-up">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-900 flex items-center justify-center font-bold text-xs">
              {comparisonCart.length}/3
            </div>
            <div>
              <div className="text-xs font-bold flex items-center gap-1.5">
                <span>Comparison Cart</span>
                <span className="text-xs text-amber-400 font-medium">({comparisonCart.map(p => p.providerName).join(', ')})</span>
              </div>
              <div className="text-xs text-slate-400 hidden sm:block">
                Compare speeds, prices, and perks side-by-side.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCartOpen(true)}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Compare Side-by-Side</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleClearCart}
              className="p-2 text-slate-400 hover:text-red-400 transition-colors"
              title="Clear comparison"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 3-Way Plan Comparison Modal */}
      <ComparisonCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartPlans={comparisonCart}
        onRemovePlan={handleRemoveCartPlan}
        onClearCart={handleClearCart}
        onOpenBuyflowModal={(plan) => handleOpenCallToOrder(plan)}
        currentAddress={currentAddress}
        phoneNumber={phoneNumber}
      />

      {/* Customer Call-To-Order & Immediate Callback Modal */}
      <CallToOrderModal
        isOpen={callToOrderState.isOpen}
        onClose={handleCloseCallToOrder}
        selectedPlan={callToOrderState.plan}
        currentAddress={callToOrderState.address}
        phoneNumber={phoneNumber}
      />

      {/* 30-Second Speed Matcher Quiz Modal */}
      <SpeedQuizModal
        isOpen={isSpeedQuizOpen}
        onClose={() => setIsSpeedQuizOpen(false)}
        onApplySpeedFilter={handleApplySpeedFilter}
      />

      {/* Admin Authentication Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={() => {
          setIsAdminLoginOpen(false);
          setIsAdminPortalOpen(true);
        }}
      />

      {/* Backend Admin Management Portal */}
      <AdminPortal
        isOpen={isAdminPortalOpen}
        onClose={() => setIsAdminPortalOpen(false)}
        catalog={catalog}
        onSaveCatalog={handleSaveCatalog}
        onResetCatalog={handleResetCatalog}
        phoneNumber={phoneNumber}
        onSavePhoneNumber={handleSavePhoneNumber}
        googleApiKey={googleApiKey}
        onSaveGoogleApiKey={handleSaveGoogleApiKey}
        defaultLocation={defaultLocation}
        onSaveDefaultLocation={handleSaveDefaultLocation}
      />

      {/* Consumer Footer with discreet admin shortcut & crawlable pSEO links */}
      <Footer
        onNavigate={setActiveTab}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        phoneNumber={phoneNumber}
        onOpenCityDirectory={() => setIsCityDirectoryOpen(true)}
        onSelectCity={(slug) => navigateToCity(slug, null, true)}
      />

      {/* 50 States & Cities Directory Modal for pSEO & User Navigation */}
      <CityDirectoryModal
        isOpen={isCityDirectoryOpen}
        onClose={() => setIsCityDirectoryOpen(false)}
        onSelectCity={(slug) => navigateToCity(slug, null, true)}
        currentCityName={cityName}
      />

      {/* Mobile Floating Sticky Action Bar for Instant 1-Tap Calling & Compare */}
      <MobileStickyActionBar
        phoneNumber={phoneNumber}
        comparisonCartCount={comparisonCart.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSpeedQuiz={() => setIsSpeedQuizOpen(true)}
      />
      </div>
    </APIProvider>
  );
}

export default App;
