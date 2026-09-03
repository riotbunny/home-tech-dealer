import React, { useState } from 'react';
import { 
  X, 
  PhoneCall, 
  Check, 
  Gift, 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  CheckCircle2
} from 'lucide-react';
import { DEFAULT_PHONE_NUMBER } from '../services/catalogService';

export function CallToOrderModal({ 
  isOpen, 
  onClose, 
  selectedPlan, 
  currentAddress,
  phoneNumber = DEFAULT_PHONE_NUMBER
}) {
  const [callbackRequested, setCallbackRequested] = useState(false);
  const [customerPhone, setCustomerPhone] = useState('');
  const [callTime, setCallTime] = useState('Call me right now');
  const telHref = `tel:${phoneNumber.replace(/\D/g, '')}`;

  if (!isOpen || !selectedPlan) return null;

  const handleCallbackSubmit = (e) => {
    e.preventDefault();
    if (!customerPhone) return;
    setCallbackRequested(true);
  };

  const resetModal = () => {
    setCallbackRequested(false);
    setCustomerPhone('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto">
        
        {/* Top Header */}
        <div className="bg-slate-50 px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <PhoneCall className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                Order by Phone &amp; Lock In Promo Rate
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500">
                Speak directly with an authorized specialist with zero hold time.
              </p>
            </div>
          </div>

          <button
            onClick={resetModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto max-h-[85vh]">
          
          {/* Selected Plan Summary Card */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: selectedPlan.providerColor || '#2563EB' }}
                />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  {selectedPlan.providerName}
                </span>
                <span className="text-[10px] bg-white border border-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-medium">
                  {selectedPlan.providerType}
                </span>
              </div>
              <h4 className="text-sm sm:text-base font-extrabold text-slate-900">
                {selectedPlan.name}
              </h4>
              <div className="text-xs text-slate-500 mt-1">
                Speed: <strong className="text-blue-700">{selectedPlan.downloadSpeed}</strong> / {selectedPlan.uploadSpeed}
              </div>
            </div>

            <div className="text-right shrink-0">
              <div className="text-xl sm:text-2xl font-extrabold text-slate-900">
                ${selectedPlan.price}
                <span className="text-xs font-normal text-slate-500">/{selectedPlan.period}</span>
              </div>
              <div className="text-xs text-emerald-700 font-semibold mt-0.5">
                {selectedPlan.contract}
              </div>
            </div>
          </div>

          {/* Primary Action: Direct Click to Call */}
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-center space-y-3">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              Toll-Free Direct Order Desk
            </div>

            <a
              href={telHref}
              className="inline-flex items-center justify-center gap-2.5 w-full py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold text-xl sm:text-2xl tracking-tight shadow-md transition-all"
            >
              <PhoneCall className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse shrink-0" />
              <span className="truncate">{phoneNumber}</span>
            </a>

            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-600 pt-1">
              <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                <Check className="w-3.5 h-3.5" />
                <span>Zero Hold Time</span>
              </span>
              <span className="text-slate-300">&bull;</span>
              <span className="flex items-center gap-1 text-blue-700 font-semibold">
                <Gift className="w-3.5 h-3.5" />
                <span>$100–$200 Reward Card Code</span>
              </span>
              <span className="text-slate-300">&bull;</span>
              <span>Open 7 Days a Week</span>
            </div>

            <div className="p-2.5 rounded-xl bg-white border border-emerald-200 text-xs text-slate-700 flex items-center justify-between">
              <span className="font-medium">Mention Promo Code:</span>
              <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                PROMO-FREE-INSTALL
              </span>
            </div>
          </div>

          {/* Secondary Option: Request a Callback */}
          <div className="pt-2 border-t border-slate-100">
            {callbackRequested ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h5 className="text-sm font-bold text-slate-900">Callback Scheduled!</h5>
                <p className="text-xs text-slate-600 max-w-xs mx-auto">
                  A specialist will call <strong className="text-slate-900 font-semibold">{customerPhone}</strong> {callTime.toLowerCase()} to finalize your {selectedPlan.providerName} order.
                </p>
                <div className="text-xs text-slate-500 pt-1">
                  Caller ID will display: {phoneNumber}
                </div>
              </div>
            ) : (
              <form onSubmit={handleCallbackSubmit} className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">Can't call right now? We'll call you:</span>
                  <span className="text-xs text-emerald-700 font-semibold">Free Callback</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="tel"
                    required
                    placeholder="Your Phone (e.g. 512-555-0199)"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 text-base sm:text-xs focus:outline-none focus:border-blue-600"
                  />
                  <select
                    value={callTime}
                    onChange={(e) => setCallTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-base sm:text-xs focus:outline-none focus:border-blue-600"
                  >
                    <option>Call me right now</option>
                    <option>Call me in 15 minutes</option>
                    <option>Call me in 1 hour</option>
                    <option>Call me this evening</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Request Callback from {phoneNumber}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
