import React, { useState } from 'react';
import { 
  Truck, 
  Check, 
  Sparkles, 
  DollarSign, 
  Calendar, 
  ShieldCheck, 
  ArrowRight, 
  PhoneCall, 
  Wifi, 
  Tv, 
  Smartphone, 
  Home
} from 'lucide-react';
import { DEFAULT_PHONE_NUMBER } from '../services/catalogService';

export function MovingConcierge({ 
  onNavigateToSearch,
  phoneNumber = DEFAULT_PHONE_NUMBER
}) {
  const telHref = `tel:${phoneNumber.replace(/\D/g, '')}`;
  const [hasMobile, setHasMobile] = useState(true);
  const [hasStreaming, setHasStreaming] = useState(true);
  const [hasSecurity, setHasSecurity] = useState(false);
  const [checklist, setChecklist] = useState({
    checkAddress: true,
    orderNew: false,
    cancelOld: false,
    returnModem: false,
    speedTest: false
  });

  const toggleChecklist = (key) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  let monthlySavings = 0;
  if (hasMobile) monthlySavings += 25;
  if (hasStreaming) monthlySavings += 15;
  if (hasSecurity) monthlySavings += 10;
  const annualSavings = monthlySavings * 12;

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="pb-6 border-b border-slate-200">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-2">
          <Truck className="w-3.5 h-3.5" />
          <span>Moving Concierge Service</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Moving Soon? Set Up Internet with Zero Stress
        </h2>
        <p className="mt-1 text-sm text-slate-600 max-w-3xl">
          Don't wait until moving day to find out your new home has slow Wi-Fi. We compare local providers, book your installation before you move in, and unlock exclusive mover gift cards.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Bundle Savings Calculator */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">Mover Bundle Savings Calculator</h3>
              <p className="text-xs text-slate-500">Select the services you need at your new home</p>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              Exclusive Discounts
            </span>
          </div>

          {/* Bundle Options */}
          <div className="space-y-3">
            {/* Core Internet */}
            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                  <Wifi className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">High-Speed Fiber or Cable Internet</div>
                  <div className="text-xs text-slate-500">Primary home connection</div>
                </div>
              </div>
              <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2.5 py-1 rounded-lg">
                Included
              </span>
            </div>

            {/* Mobile Line */}
            <label className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
              hasMobile ? 'bg-emerald-50/40 border-emerald-300' : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={hasMobile}
                  onChange={(e) => setHasMobile(e.target.checked)}
                  className="rounded text-emerald-600 w-4 h-4"
                />
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Bundle Unlimited Mobile Line</div>
                  <div className="text-xs text-slate-500">Save up to $25/mo on your phone bill when paired with home internet</div>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-700">Save $25/mo</span>
            </label>

            {/* Live TV */}
            <label className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
              hasStreaming ? 'bg-emerald-50/40 border-emerald-300' : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={hasStreaming}
                  onChange={(e) => setHasStreaming(e.target.checked)}
                  className="rounded text-emerald-600 w-4 h-4"
                />
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Tv className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Add Live TV &amp; Sports Streaming</div>
                  <div className="text-xs text-slate-500">Local channels &amp; live sports with contract-free cloud DVR</div>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-700">Save $15/mo</span>
            </label>

            {/* Smart Home */}
            <label className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
              hasSecurity ? 'bg-emerald-50/40 border-emerald-300' : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={hasSecurity}
                  onChange={(e) => setHasSecurity(e.target.checked)}
                  className="rounded text-emerald-600 w-4 h-4"
                />
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                  <Home className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Smart Home Security &amp; Doorbell</div>
                  <div className="text-xs text-slate-500">Video monitoring discount for new movers</div>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-700">Save $10/mo</span>
            </label>
          </div>

          {/* Dynamic Savings Display */}
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs text-slate-600 font-semibold">Your Estimated Mover Savings:</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 mt-0.5">
                ${annualSavings}
                <span className="text-xs font-normal text-slate-600"> / year in bundle discounts</span>
              </div>
              <div className="text-xs text-slate-500">
                (${monthlySavings}/mo ongoing savings + up to $200 in gift cards)
              </div>
            </div>

            <button
              onClick={onNavigateToSearch}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
            >
              <span>Check Deals at My New Home</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column: Moving Checklist */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>Moving Day Tech Checklist</span>
            </h3>
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
              Interactive
            </span>
          </div>

          <p className="text-xs text-slate-500">
            Click tasks as you complete them to ensure your Wi-Fi is ready the moment you move in:
          </p>

          <div className="space-y-2.5 text-xs">
            {[
              { id: 'checkAddress', text: '1. Check internet availability at your new address (2-3 weeks out)' },
              { id: 'orderNew', text: '2. Reserve your provider installation window before time slots fill up' },
              { id: 'cancelOld', text: '3. Schedule disconnection of service at your old home' },
              { id: 'returnModem', text: '4. Pack and return old carrier equipment to avoid fee charges' },
              { id: 'speedTest', text: '5. Run a speed test on move-in day and set up Wi-Fi' }
            ].map(item => {
              const done = checklist[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => toggleChecklist(item.id)}
                  className={`p-3 rounded-xl border cursor-pointer flex items-start gap-3 transition-all ${
                    done ? 'bg-emerald-50 border-emerald-200 text-slate-600' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                    done ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'
                  }`}>
                    {done && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span className={`text-xs ${done ? 'line-through text-slate-400' : 'text-slate-800 font-medium'}`}>
                    {item.text}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Phone Assistance */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-500">Need help over the phone?</div>
              <div className="text-xs font-bold text-slate-900">Toll-Free Mover Setup Desk</div>
            </div>
            <a
              href={telHref}
              className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5 border border-emerald-200 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
              <span>{phoneNumber}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
