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
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-xs">
      {/* Top Customer Announcement Strip with Live City Name & 50 States Trigger */}
      <div className="bg-slate-900 text-slate-300 px-3 sm:px-4 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs truncate">
            <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="font-medium text-slate-200 truncate">
              Deals in <strong className="text-white underline decoration-blue-400 underline-offset-2">{displayArea}</strong>
            </span>
            {onOpenCityDirectory && (
              <button
                type="button"
                onClick={onOpenCityDirectory}
                className="ml-1 text-[10px] font-bold text-cyan-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2 py-0.5 rounded-full border border-slate-700 transition-colors shrink-0"
                title="Browse broadband deals across all 50 US states"
              >
                Browse 50 States
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5 sm:gap-4 text-xs shrink-0">
            <button
              onClick={onOpenSpeedQuiz}
              className="hidden sm:flex text-cyan-400 hover:text-cyan-300 font-medium items-center gap-1 transition-colors text-xs"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Speed Quiz</span>
            </button>
            <span className="hidden sm:inline text-slate-600">|</span>
            <a
              href={telHref}
              className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1.5 transition-colors text-[11px] sm:text-xs"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{phoneNumber}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & City Pill */}
          <div className="flex items-center gap-4">
            <div 
              className="flex items-center gap-2.5 cursor-pointer" 
              onClick={() => setActiveTab('qualifier')}
            >
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
                <Wifi className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-slate-900">
                  Home Tech Dealer <span className="text-blue-600">Inc.</span>
                </span>
                <span className="text-[10px] font-semibold text-slate-500 block -mt-1">
                  Broadband &amp; TV Comparison
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
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 text-xs font-semibold transition-colors"
              title="Click to change city or browse all 50 states"
            >
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>{displayArea}</span>
              <span className="text-[10px] text-blue-600 font-normal underline decoration-dotted ml-0.5">Change</span>
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
                      ? 'bg-blue-50 text-blue-700 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
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
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
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
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
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
                <MapPin className="w-4 h-4 text-blue-600" />
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
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-slate-700 hover:bg-slate-50'
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
  );
}
