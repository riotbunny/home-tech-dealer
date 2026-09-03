import React, { useState } from 'react';
import { 
  Lock, 
  X, 
  Save, 
  RotateCcw, 
  Plus, 
  Trash2, 
  Check, 
  AlertCircle, 
  DollarSign, 
  Wifi, 
  Layers, 
  Clock, 
  ShieldCheck, 
  LogOut,
  Sparkles,
  ExternalLink,
  Search,
  PhoneCall,
  MapPin,
  Globe,
  Eye,
  EyeOff,
  Building2
} from 'lucide-react';

export function AdminPortal({ 
  isOpen, 
  onClose, 
  catalog, 
  onSaveCatalog, 
  onResetCatalog,
  phoneNumber,
  onSavePhoneNumber,
  googleApiKey,
  onSaveGoogleApiKey,
  defaultLocation,
  onSaveDefaultLocation
}) {
  const [activeCatalog, setActiveCatalog] = useState(() => JSON.parse(JSON.stringify(catalog)));
  const [activePhone, setActivePhone] = useState(phoneNumber || '');
  const [activeGoogleKey, setActiveGoogleKey] = useState(googleApiKey || '');
  const [activeBaseCity, setActiveBaseCity] = useState(defaultLocation?.city || '');
  const [activeBaseState, setActiveBaseState] = useState(defaultLocation?.state || '');
  const [selectedProviderId, setSelectedProviderId] = useState(catalog[0]?.id || 'verizon');
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  
  // Add Carrier Modal State
  const [isAddCarrierOpen, setIsAddCarrierOpen] = useState(false);
  const [newCarrierForm, setNewCarrierForm] = useState({
    name: '',
    fullName: '',
    type: 'Fiber Optic',
    category: 'Tier-1 Telco',
    color: '#2563EB',
    badge: 'High-Speed Broadband',
    planName: 'Standard Gigabit',
    downloadSpeed: '1000 Mbps',
    uploadSpeed: '1000 Mbps',
    price: 65,
    contract: 'No Annual Contract'
  });

  if (!isOpen) return null;

  // Currently selected provider
  const selectedProvider = activeCatalog.find(p => p.id === selectedProviderId) || activeCatalog[0];

  // Show temporary toast notification
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  // Toggle Pause status for a carrier
  const handleTogglePauseProvider = (providerId) => {
    setActiveCatalog(prev => {
      return prev.map(p => {
        if (p.id !== providerId) return p;
        const newPaused = !p.paused;
        showToast(`${p.name} is now ${newPaused ? 'PAUSED (Hidden from customers)' : 'ACTIVE (Live on website)'}`);
        return {
          ...p,
          paused: newPaused
        };
      });
    });
  };

  // Delete an entire carrier
  const handleDeleteCarrier = (providerId) => {
    if (!window.confirm(`Are you sure you want to completely remove ${selectedProvider?.name} from the catalog? This will delete all its plans.`)) return;
    setActiveCatalog(prev => {
      const filtered = prev.filter(p => p.id !== providerId);
      if (filtered.length > 0) {
        setSelectedProviderId(filtered[0].id);
      }
      return filtered;
    });
    showToast(`${selectedProvider?.name} removed from catalog.`);
  };

  // Create a brand new carrier
  const handleCreateCarrier = (e) => {
    e.preventDefault();
    if (!newCarrierForm.name.trim()) {
      alert('Please enter a carrier name.');
      return;
    }

    const cleanId = newCarrierForm.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    const existing = activeCatalog.find(p => p.id === cleanId);
    const carrierId = existing ? `${cleanId}-${Date.now()}` : cleanId;

    const newCarrier = {
      id: carrierId,
      name: newCarrierForm.name.trim(),
      fullName: newCarrierForm.fullName.trim() || `${newCarrierForm.name.trim()} High-Speed Internet`,
      category: newCarrierForm.category,
      type: newCarrierForm.type,
      color: newCarrierForm.color,
      badge: newCarrierForm.badge || 'Verified High-Speed Network',
      tokenStatus: 'Direct Token API Active',
      rguAttachPotential: 'High',
      installationSla: 'Professional 48-Hour Setup',
      complianceScore: '99.9%',
      paused: false,
      plans: [
        {
          id: `${carrierId}-plan-1`,
          name: newCarrierForm.planName.trim() || `${newCarrierForm.name} Premier Tier`,
          downloadSpeed: newCarrierForm.downloadSpeed.trim() || '500 Mbps',
          uploadSpeed: newCarrierForm.uploadSpeed.trim() || '500 Mbps',
          price: Number(newCarrierForm.price) || 55,
          period: 'mo.',
          contract: newCarrierForm.contract || 'No Annual Contract',
          equipmentFee: '$0 / mo (Router Included)',
          dataCap: 'Unlimited High-Speed Data',
          perks: [
            'No annual contract or hidden equipment fees',
            'Free standard equipment and Wi-Fi setup',
            '24/7 dedicated customer care'
          ],
          bountyEstimate: 140,
          popular: true
        }
      ]
    };

    setActiveCatalog(prev => [newCarrier, ...prev]);
    setSelectedProviderId(carrierId);
    setIsAddCarrierOpen(false);
    setNewCarrierForm({
      name: '',
      fullName: '',
      type: 'Fiber Optic',
      category: 'Tier-1 Telco',
      color: '#2563EB',
      badge: 'High-Speed Broadband',
      planName: 'Standard Gigabit',
      downloadSpeed: '1000 Mbps',
      uploadSpeed: '1000 Mbps',
      price: 65,
      contract: 'No Annual Contract'
    });
    showToast(`${newCarrier.name} successfully created and ready to publish!`);
  };

  // Update a field for a specific plan
  const handleUpdatePlanField = (planId, field, value) => {
    setActiveCatalog(prev => {
      return prev.map(provider => {
        if (provider.id !== selectedProviderId) return provider;
        return {
          ...provider,
          plans: provider.plans.map(plan => {
            if (plan.id !== planId) return plan;
            return {
              ...plan,
              [field]: value
            };
          })
        };
      });
    });
  };

  // Add perk to a plan
  const handleAddPerk = (planId) => {
    const perkText = window.prompt('Enter new promotional perk or gift card offer:');
    if (!perkText || !perkText.trim()) return;

    setActiveCatalog(prev => {
      return prev.map(provider => {
        if (provider.id !== selectedProviderId) return provider;
        return {
          ...provider,
          plans: provider.plans.map(plan => {
            if (plan.id !== planId) return plan;
            return {
              ...plan,
              perks: [...plan.perks, perkText.trim()]
            };
          })
        };
      });
    });
  };

  // Remove perk from a plan
  const handleRemovePerk = (planId, perkIndex) => {
    setActiveCatalog(prev => {
      return prev.map(provider => {
        if (provider.id !== selectedProviderId) return provider;
        return {
          ...provider,
          plans: provider.plans.map(plan => {
            if (plan.id !== planId) return plan;
            return {
              ...plan,
              perks: plan.perks.filter((_, idx) => idx !== perkIndex)
            };
          })
        };
      });
    });
  };

  // Delete a plan
  const handleDeletePlan = (planId) => {
    if (!window.confirm('Are you sure you want to delete this plan?')) return;
    setActiveCatalog(prev => {
      return prev.map(provider => {
        if (provider.id !== selectedProviderId) return provider;
        return {
          ...provider,
          plans: provider.plans.filter(plan => plan.id !== planId)
        };
      });
    });
  };

  // Add a new plan for selected provider
  const handleAddNewPlan = () => {
    const newId = `${selectedProvider.id}-custom-${Date.now()}`;
    const newPlan = {
      id: newId,
      name: `${selectedProvider.name} Custom Tier`,
      downloadSpeed: '500 Mbps',
      uploadSpeed: '500 Mbps',
      price: 59,
      period: 'mo',
      contract: 'No annual contract',
      equipmentFee: 'Wi-Fi 6 Router Included',
      installationSla: '24-48 Hours',
      perks: ['$100 Visa Reward Card', 'Unlimited Internet Data'],
      popular: false
    };

    setActiveCatalog(prev => {
      return prev.map(provider => {
        if (provider.id !== selectedProviderId) return provider;
        return {
          ...provider,
          plans: [...provider.plans, newPlan]
        };
      });
    });
    showToast(`Added new package to ${selectedProvider.name}`);
  };

  // Save changes across the board
  const handleSaveAll = () => {
    onSaveCatalog(activeCatalog);
    if (onSavePhoneNumber) {
      onSavePhoneNumber(activePhone);
    }
    if (onSaveGoogleApiKey) {
      onSaveGoogleApiKey(activeGoogleKey);
    }
    if (onSaveDefaultLocation) {
      onSaveDefaultLocation({
        city: activeBaseCity.trim(),
        state: activeBaseState.trim().toUpperCase(),
        address: ''
      });
    }
    showToast(`Saved! Pricing, hotline, and dynamic location settings are now live.`);
  };

  // Reset to factory baseline
  const handleResetToDefaults = () => {
    const defaultCat = onResetCatalog();
    setActiveCatalog(JSON.parse(JSON.stringify(defaultCat)));
    setShowResetConfirm(false);
    showToast('Catalog successfully reset to factory defaults.');
  };

  // Filter providers in sidebar
  const filteredProviders = activeCatalog.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-100 animate-fade-in overflow-hidden">
      
      {/* Top Admin Header Bar */}
      <header className="bg-slate-900 text-white px-4 sm:px-6 py-3.5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 shadow-md shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base text-white tracking-tight">
                Home Tech Dealer Inc. Admin
              </span>
              <span className="text-[10px] uppercase font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                Authenticated
              </span>
            </div>
            <p className="text-xs text-slate-400 -mt-0.5">
              Live Carrier Package &amp; Pricing Management
            </p>
          </div>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowResetConfirm(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
            title="Reset to original default catalog"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Defaults</span>
          </button>

          <button
            onClick={handleSaveAll}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-all transform active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes Live</span>
          </button>

          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Exit Portal</span>
          </button>
        </div>
      </header>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="bg-emerald-600 text-white text-xs font-bold px-4 py-2.5 flex items-center justify-between shadow-md shrink-0 animate-fade-in">
          <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
            <Check className="w-4 h-4 stroke-[3]" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage('')} className="text-white/80 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Admin Workspace (Sidebar + Package Editor) */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Sidebar: Carriers List */}
        <aside className="w-full md:w-72 bg-white border-r border-slate-200 flex flex-col shrink-0">
          <div className="p-3 border-b border-slate-200 bg-slate-50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Carriers ({activeCatalog.length})
              </span>
              <button
                type="button"
                onClick={() => setIsAddCarrierOpen(true)}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-2 py-1 rounded-lg transition-colors"
                title="Add a new custom carrier"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Carrier</span>
              </button>
            </div>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search carriers..."
                className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-300 rounded-xl text-slate-900 text-xs focus:outline-none focus:border-blue-600 placeholder-slate-400"
              />
            </div>
          </div>

          {/* Carrier Navigation List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {filteredProviders.map(provider => {
              const isSelected = provider.id === selectedProviderId;
              const isPaused = !!provider.paused;

              return (
                <button
                  key={provider.id}
                  onClick={() => setSelectedProviderId(provider.id)}
                  className={`w-full text-left p-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                    isSelected 
                      ? 'bg-blue-50 text-blue-800 border border-blue-200 shadow-xs' 
                      : isPaused
                        ? 'text-slate-400 bg-slate-50/50 hover:bg-slate-100/80 border border-transparent'
                        : 'text-slate-700 hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span 
                      className={`w-2.5 h-2.5 rounded-full shrink-0 ${isPaused ? 'opacity-40' : ''}`}
                      style={{ backgroundColor: provider.color || '#2563EB' }}
                    />
                    <span className={`truncate ${isPaused ? 'line-through text-slate-400' : ''}`}>
                      {provider.name}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 shrink-0">
                    {isPaused && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded font-bold bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-0.5">
                        <EyeOff className="w-2.5 h-2.5" />
                        Paused
                      </span>
                    )}
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                      isSelected ? 'bg-blue-200/60 text-blue-900 font-bold' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {provider.plans.length} plans
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Right Main Editor: Plans for Selected Carrier */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50">
          <div className="max-w-5xl mx-auto space-y-6">
            
            {/* Global Sales Hotline Phone Number Card */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-emerald-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Global Sales Hotline &amp; Call-to-Order Number
                  </h3>
                  <p className="text-xs text-slate-500">
                    Dynamically updates all click-to-call buttons, headers, plan cards, modals, and footers across the entire site.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={activePhone}
                  onChange={(e) => setActivePhone(e.target.value)}
                  placeholder="e.g. 1 (888) 482-6192"
                  className="px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono font-bold text-sm focus:outline-none focus:border-emerald-600 w-48 sm:w-56"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (onSavePhoneNumber) onSavePhoneNumber(activePhone);
                    showToast(`Phone number updated to ${activePhone} across the website!`);
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all shrink-0"
                >
                  Update Phone
                </button>
              </div>
            </div>

            {/* Google Maps Platform API Key Card */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-blue-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">
                      Google Maps Platform Address Autocomplete API Key
                    </h3>
                    <span className="text-[10px] uppercase font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full">
                      Active
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Powers live address autocomplete in the search bars with Google Places API.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="password"
                  value={activeGoogleKey}
                  onChange={(e) => setActiveGoogleKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono font-medium text-xs focus:outline-none focus:border-blue-600 w-48 sm:w-64"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (onSaveGoogleApiKey) onSaveGoogleApiKey(activeGoogleKey);
                    showToast('Google Maps API key updated across the website!');
                  }}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all shrink-0"
                >
                  Save Key
                </button>
              </div>
            </div>

            {/* Base Location & Geolocation Fallback Card */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-indigo-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">
                      Fallback Base Metro &amp; Dynamic Geolocation
                    </h3>
                    <span className="text-[10px] uppercase font-mono font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded-full">
                      Automatic Geolocation Active
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Home Tech Dealer Inc. dynamically resolves each visitor's real city, state, and nearby radius via their IP and Google Places API. Leave empty for 100% dynamic auto-detection, or specify a fallback city.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={activeBaseCity}
                  onChange={(e) => setActiveBaseCity(e.target.value)}
                  placeholder="e.g. Austin or leave empty"
                  className="px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium text-xs focus:outline-none focus:border-indigo-600 w-36 sm:w-44"
                />
                <input
                  type="text"
                  value={activeBaseState}
                  onChange={(e) => setActiveBaseState(e.target.value)}
                  placeholder="TX"
                  maxLength={2}
                  className="px-2.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium text-xs text-center uppercase focus:outline-none focus:border-indigo-600 w-14"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (onSaveDefaultLocation) {
                      onSaveDefaultLocation({
                        city: activeBaseCity.trim(),
                        state: activeBaseState.trim().toUpperCase(),
                        address: ''
                      });
                    }
                    showToast('Base location settings saved!');
                  }}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-all shrink-0"
                >
                  Save Location
                </button>
              </div>
            </div>

            {/* Selected Carrier Header */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span 
                    className="w-3.5 h-3.5 rounded-full" 
                    style={{ backgroundColor: selectedProvider.color || '#2563EB' }}
                  />
                  <h2 className="text-xl font-extrabold text-slate-900">
                    {selectedProvider.name} Packages
                  </h2>
                  <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                    {selectedProvider.type}
                  </span>
                  {selectedProvider.paused ? (
                    <span className="text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <EyeOff className="w-3 h-3" />
                      Paused (Hidden)
                    </span>
                  ) : (
                    <span className="text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Active (Live)
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500">
                  {selectedProvider.fullName} &bull; Manage rates, speeds, and promotional perks.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                {/* Pause / Resume Button */}
                <button
                  type="button"
                  onClick={() => handleTogglePauseProvider(selectedProvider.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all ${
                    selectedProvider.paused
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600 shadow-sm'
                      : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300'
                  }`}
                  title={selectedProvider.paused ? 'Click to show this carrier on the website' : 'Click to hide this carrier from the website'}
                >
                  {selectedProvider.paused ? (
                    <>
                      <Eye className="w-4 h-4" />
                      <span>Resume Carrier</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-4 h-4 text-amber-700" />
                      <span>Pause Carrier</span>
                    </>
                  )}
                </button>

                {/* Add New Package */}
                <button
                  type="button"
                  onClick={handleAddNewPlan}
                  className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Package</span>
                </button>

                {/* Delete Carrier */}
                <button
                  type="button"
                  onClick={() => handleDeleteCarrier(selectedProvider.id)}
                  className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 border border-slate-200 transition-all"
                  title="Remove this carrier from catalog"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Carrier Paused Alert Notice */}
            {selectedProvider.paused && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-3 animate-fade-in shadow-xs">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                <div>
                  <strong className="font-bold">Carrier Is Currently Paused:</strong> {selectedProvider.name} and all its plans are currently hidden from public customer search results, address qualifiers, and plan cards. Click <strong>"Resume Carrier"</strong> above anytime to restore it live across the website.
                </div>
              </div>
            )}

            {/* Plans Grid */}
            <div className="space-y-4">
              {selectedProvider.plans.map((plan, planIdx) => (
                <div 
                  key={plan.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4 hover:border-slate-300 transition-all"
                >
                  {/* Top Bar: Plan Title & Quick Controls */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-3 flex-1 min-w-[200px]">
                      <span className="text-xs font-mono font-bold text-slate-400 bg-slate-100 w-6 h-6 rounded-lg flex items-center justify-center">
                        #{planIdx + 1}
                      </span>
                      <input
                        type="text"
                        value={plan.name}
                        onChange={(e) => handleUpdatePlanField(plan.id, 'name', e.target.value)}
                        className="text-base font-extrabold text-slate-900 border-b border-transparent hover:border-slate-300 focus:border-blue-600 focus:outline-none bg-transparent px-1 flex-1"
                        placeholder="Package Name"
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Popular Toggle */}
                      <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={!!plan.popular}
                          onChange={(e) => handleUpdatePlanField(plan.id, 'popular', e.target.checked)}
                          className="rounded text-blue-600 w-4 h-4"
                        />
                        <span>Best Value Badge</span>
                      </label>

                      {/* Delete Plan Button */}
                      <button
                        onClick={() => handleDeletePlan(plan.id)}
                        className="text-slate-400 hover:text-red-600 p-1 rounded-lg transition-colors"
                        title="Delete Plan"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Pricing, Speeds & Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                    
                    {/* Monthly Price Field */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <label className="block text-slate-500 font-bold mb-1 uppercase text-[10px]">
                        Monthly Price ($)
                      </label>
                      <div className="flex items-center gap-1">
                        <span className="font-extrabold text-lg text-slate-900">$</span>
                        <input
                          type="number"
                          step="1"
                          min="10"
                          max="500"
                          value={plan.price}
                          onChange={(e) => handleUpdatePlanField(plan.id, 'price', Number(e.target.value))}
                          className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-base font-extrabold text-slate-900 focus:outline-none focus:border-blue-600"
                        />
                        <span className="text-slate-500 text-xs">/mo</span>
                      </div>
                    </div>

                    {/* Download Speed */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <label className="block text-slate-500 font-bold mb-1 uppercase text-[10px]">
                        Download Speed
                      </label>
                      <input
                        type="text"
                        value={plan.downloadSpeed}
                        onChange={(e) => handleUpdatePlanField(plan.id, 'downloadSpeed', e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 font-bold text-blue-700 text-xs focus:outline-none focus:border-blue-600"
                        placeholder="e.g. 500 Mbps"
                      />
                    </div>

                    {/* Upload Speed */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <label className="block text-slate-500 font-bold mb-1 uppercase text-[10px]">
                        Upload Speed
                      </label>
                      <input
                        type="text"
                        value={plan.uploadSpeed}
                        onChange={(e) => handleUpdatePlanField(plan.id, 'uploadSpeed', e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 font-bold text-slate-800 text-xs focus:outline-none focus:border-blue-600"
                        placeholder="e.g. 500 Mbps"
                      />
                    </div>

                    {/* Contract Terms */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <label className="block text-slate-500 font-bold mb-1 uppercase text-[10px]">
                        Contract Terms
                      </label>
                      <input
                        type="text"
                        value={plan.contract}
                        onChange={(e) => handleUpdatePlanField(plan.id, 'contract', e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 font-medium text-slate-800 text-xs focus:outline-none focus:border-blue-600"
                        placeholder="e.g. No annual contract"
                      />
                    </div>
                  </div>

                  {/* Secondary Details: Equipment & Install SLA */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-slate-500 font-bold mb-1 uppercase text-[10px]">
                        Equipment Fee &amp; Router
                      </label>
                      <input
                        type="text"
                        value={plan.equipmentFee}
                        onChange={(e) => handleUpdatePlanField(plan.id, 'equipmentFee', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 text-xs focus:outline-none focus:border-blue-600"
                        placeholder="e.g. Wi-Fi 6 Router Included"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-500 font-bold mb-1 uppercase text-[10px]">
                        Installation Window
                      </label>
                      <input
                        type="text"
                        value={plan.installationSla}
                        onChange={(e) => handleUpdatePlanField(plan.id, 'installationSla', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 text-xs focus:outline-none focus:border-blue-600"
                        placeholder="e.g. 24-48 Hours"
                      />
                    </div>
                  </div>

                  {/* Perks / Reward Cards List */}
                  <div className="pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-slate-600 font-bold text-xs flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>Included Perks &amp; Mover Gift Cards:</span>
                      </label>
                      <button
                        onClick={() => handleAddPerk(plan.id)}
                        className="text-xs text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Perk</span>
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {plan.perks.map((perk, perkIdx) => (
                        <span 
                          key={perkIdx}
                          className="inline-flex items-center gap-1.5 bg-slate-100 border border-slate-200 text-slate-800 text-xs px-2.5 py-1 rounded-lg"
                        >
                          <span>{perk}</span>
                          <button
                            onClick={() => handleRemovePerk(plan.id, perkIdx)}
                            className="text-slate-400 hover:text-red-600 ml-1"
                            title="Remove Perk"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Save Bar */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-center justify-between">
              <div className="text-xs text-slate-500">
                Ready to publish your updates to the live site?
              </div>
              <button
                onClick={handleSaveAll}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Save All Changes Live</span>
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Confirmation Dialog for Reset */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full border border-slate-200 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Reset All Packages to Defaults?</h4>
            <p className="text-xs text-slate-500">
              This will erase all custom pricing and perk modifications across all 27 carriers and restore factory baseline values.
            </p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={handleResetToDefaults}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-sm"
              >
                Yes, Reset Defaults
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Carrier Modal */}
      {isAddCarrierOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-400" />
                <h3 className="text-base font-extrabold text-white">Add New Broadband Carrier</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddCarrierOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCarrier} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Carrier Short Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newCarrierForm.name}
                    onChange={(e) => setNewCarrierForm({ ...newCarrierForm, name: e.target.value })}
                    placeholder="e.g. Google Fiber"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 text-xs focus:outline-none focus:border-blue-600 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Technology Type
                  </label>
                  <select
                    value={newCarrierForm.type}
                    onChange={(e) => setNewCarrierForm({ ...newCarrierForm, type: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 text-xs focus:outline-none focus:border-blue-600 font-semibold"
                  >
                    <option value="Fiber Optic">Fiber Optic</option>
                    <option value="5G Home Internet">5G Home Internet</option>
                    <option value="Cable Broadband">Cable Broadband</option>
                    <option value="Satellite Broadband">Satellite Broadband</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Official Full Name
                </label>
                <input
                  type="text"
                  value={newCarrierForm.fullName}
                  onChange={(e) => setNewCarrierForm({ ...newCarrierForm, fullName: e.target.value })}
                  placeholder="e.g. Google Fiber Gigabit Optical Network"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 text-xs focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Carrier Brand Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={newCarrierForm.color}
                      onChange={(e) => setNewCarrierForm({ ...newCarrierForm, color: e.target.value })}
                      className="w-8 h-8 rounded-lg border border-slate-300 cursor-pointer p-0.5 bg-white"
                    />
                    <input
                      type="text"
                      value={newCarrierForm.color}
                      onChange={(e) => setNewCarrierForm({ ...newCarrierForm, color: e.target.value })}
                      className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-slate-900 text-xs font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Highlight Badge
                  </label>
                  <input
                    type="text"
                    value={newCarrierForm.badge}
                    onChange={(e) => setNewCarrierForm({ ...newCarrierForm, badge: e.target.value })}
                    placeholder="e.g. 100% Symmetrical Gigabit"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 text-xs focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              {/* Initial Plan Setup */}
              <div className="pt-3 border-t border-slate-200">
                <h4 className="text-xs font-extrabold text-slate-900 mb-2 uppercase tracking-wide">
                  Initial Plan Details
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-600 font-bold mb-1 text-[11px]">
                      Plan Name
                    </label>
                    <input
                      type="text"
                      value={newCarrierForm.planName}
                      onChange={(e) => setNewCarrierForm({ ...newCarrierForm, planName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-1.5 text-slate-900 text-xs font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-bold mb-1 text-[11px]">
                      Download Speed
                    </label>
                    <input
                      type="text"
                      value={newCarrierForm.downloadSpeed}
                      onChange={(e) => setNewCarrierForm({ ...newCarrierForm, downloadSpeed: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-1.5 text-slate-900 text-xs font-bold text-blue-700"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-bold mb-1 text-[11px]">
                      Monthly Price ($)
                    </label>
                    <input
                      type="number"
                      value={newCarrierForm.price}
                      onChange={(e) => setNewCarrierForm({ ...newCarrierForm, price: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-1.5 text-slate-900 text-xs font-black text-emerald-700 font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddCarrierOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Carrier &amp; Launch</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
