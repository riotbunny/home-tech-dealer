import React, { useState } from 'react';
import { 
  Wifi, 
  Layers, 
  Zap, 
  Truck, 
  HelpCircle, 
  PhoneCall, 
  Menu,
  X,
  MapPin
} from 'lucide-react';

import { DEFAULT_PHONE_NUMBER } from '../services/catalogService';

export function Header({ 
  activeTab, 
  setActiveTab, 
  comparisonCartCount = 0, 
  onOpenCart, 
  onOpenSpeedQuiz,
  detectedLocation,
  cityName,
  state = '',
  zip = '',
  phoneNumber = DEFAULT_PHONE_NUMBER,
  onAddressClick,
  onOpenCityDirectory
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const telHref = `tel:${phoneNumber.replace(/\D/g, '')}`;

  const navItems = [
    { id: 'qualifier', label: 'Find Plans', icon: Wifi },
    { id: 'mover', label: 'Moving Guide', icon: Truck, badge: 'Mover Deals' },
    { id: 'providers', label: 'All Providers', icon: Layers },
    { id: 'faq', label: 'FAQs & Help', icon: HelpCircle }
  ];

  const hasValidCity = Boolean(cityName && cityName.trim() && cityName !== 'Your Local' && cityName !== 'Your Area');
  const displayArea = hasValidCity 
    ? (state ? `${cityName}, ${state}` : `${cityName} Area`)
    : 'Your Area';

  return (
    <div className="w-full pt-4 px-4 sticky top-0 z-50">
      <header className="max-w-7xl mx-auto rounded-[2rem] bg-white/70 backdrop-blur-xl border border-white/50 shadow-xl shadow-indigo-900/5 transition-all">
        
        {/* Main Nav */}
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Logo & City Pill */}
            <div className="flex items-center gap-4">
              <div 
                className="flex items-center gap-2 cursor-pointer group" 
                onClick={() => setActiveTab('qualifier')}
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
                  <Wifi className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <span className="font-extrabold text-lg sm:text-xl tracking-tighter text-slate-900">
                    Home Tech Dealer <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-600">Inc.</span>
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 block -mt-1 tracking-wider uppercase">
                    Broadband & TV Comparison
                  </span>
                </div>
              </div>

              {/* Automatically Detected City Pill */}
              <button
                onClick={() => {
                  if (onOpenCityDirectory) {
                    onOpenCityDirectory();
                  } else {
                    setActiveTab('qualifier');
                    const el = document.getElementById('carrier-results-grid') || document.getElementById('plans-marketplace');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50/50/50 hover:bg-white border border-slate-200/50 text-slate-700 hover:text-indigo-600 text-xs font-semibold shadow-sm transition-all hover:shadow-md hover:shadow-indigo-500/10"
                title="Click to change city or browse all 50 states"
              >
                <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                <span>{displayArea}</span>
                <span className="text-[10px] text-indigo-500/70 font-bold ml-0.5">CHANGE</span>
              </button>
            </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-50 text-indigo-700 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Compare Cart */}
            <button
              onClick={onOpenCart}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all ${
                comparisonCartCount > 0 
                  ? 'bg-amber-500 text-white border-amber-600 shadow-sm' 
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50/50'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Compare ({comparisonCartCount}/3)</span>
            </button>

            {/* Toll Free Phone Button */}
            <a
              href={telHref}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-all transform active:scale-95"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{phoneNumber}</span>
            </a>
          </div>

          {/* Mobile Right Action Bar */}
          <div className="lg:hidden flex items-center gap-2">
            {/* Mobile Cart Button */}
            {comparisonCartCount > 0 && (
              <button
                onClick={onOpenCart}
                className="p-2.5 bg-amber-50 active:bg-amber-100 text-amber-800 rounded-xl border border-amber-300 flex items-center gap-1.5 text-xs font-bold"
                title="View Compare Cart"
              >
                <Layers className="w-4 h-4 text-amber-600" />
                <span>{comparisonCartCount}</span>
              </button>
            )}

            {/* Mobile Click-to-Call */}
            <a
              href={telHref}
              className="p-2.5 bg-emerald-50 active:bg-emerald-100 text-emerald-700 rounded-xl border border-emerald-200 flex items-center justify-center"
              title={`Call ${phoneNumber}`}
              aria-label={`Call ${phoneNumber}`}
            >
              <PhoneCall className="w-5 h-5 text-emerald-600" />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-slate-600 active:text-slate-900 rounded-xl hover:bg-slate-100"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-2 shadow-lg">
          {detectedLocation && (
            <div className="px-3 py-2 bg-blue-50 rounded-xl text-xs font-semibold text-blue-800 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-indigo-600" />
              <span>{detectedLocation.label}</span>
            </div>
          )}
          {onOpenCityDirectory && (
            <button
              onClick={() => {
                onOpenCityDirectory();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold bg-blue-50 text-blue-800 hover:bg-blue-100 transition-colors"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-600" />
                <span>Change City / Browse 50 States</span>
              </div>
              <span className="text-[10px] bg-blue-600 text-white font-mono px-1.5 py-0.5 rounded">
                All USA
              </span>
            </button>
          )}
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                  isActive 
                    ? 'bg-blue-50 text-indigo-600' 
                    : 'text-slate-700 hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
          <div className="pt-2 space-y-2">
            <a
              href={telHref}
              className="w-full py-3 rounded-xl text-xs font-bold text-white bg-emerald-600 flex items-center justify-center gap-2 shadow-sm"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call a Specialist: {phoneNumber}</span>
            </a>
          </div>
        </div>
      )}
      </header>
    </div>
  );
}
