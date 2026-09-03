import React, { useState } from 'react';
import { 
  X, 
  Layers, 
  Trash2, 
  Check, 
  ArrowRight, 
  Mail, 
  ShieldCheck, 
  PhoneCall, 
  Wifi, 
  Zap, 
  HelpCircle,
  CheckCircle2
} from 'lucide-react';
import { DEFAULT_PHONE_NUMBER } from '../services/catalogService';

export function ComparisonCart({ 
  isOpen, 
  onClose, 
  cartPlans = [], 
  onRemovePlan, 
  onClearCart, 
  onOpenBuyflowModal,
  currentAddress,
  phoneNumber = DEFAULT_PHONE_NUMBER
}) {
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [agentNotes, setAgentNotes] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  if (!isOpen) return null;

  const handleSendEmail = (e) => {
    e.preventDefault();
    if (!customerEmail) return;
    setEmailSent(true);
    setTimeout(() => {
      // Keep confirmation visible
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-5xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900">
                  Side-by-Side Plan Comparison
                </h3>
                <span className="text-xs font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                  {cartPlans.length} / 3 Selected
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Compare download speeds, monthly pricing, and equipment terms side-by-side.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Address Banner */}
        <div className="px-6 py-2.5 bg-blue-50/60 border-b border-blue-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-700">
            <span className="font-semibold">Selected Address:</span>
            <span className="text-blue-800 font-medium">{currentAddress}</span>
          </div>
          {cartPlans.length > 0 && (
            <button
              onClick={onClearCart}
              className="text-xs text-red-600 hover:text-red-700 font-semibold flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          )}
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1">
          {cartPlans.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <Layers className="w-12 h-12 text-slate-300 mx-auto" />
              <h4 className="text-base font-bold text-slate-800">Your Comparison Cart is Empty</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Click "+ Compare" on any plan card in the marketplace to compare up to 3 options side-by-side.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
              >
                Browse Plans
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Comparison Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {cartPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 flex flex-col justify-between"
                  >
                    <div>
                      {/* Provider Header */}
                      <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-200">
                        <div className="flex items-center gap-2">
                          <span 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: plan.providerColor || '#2563EB' }}
                          />
                          <span className="font-bold text-sm text-slate-900">{plan.providerName}</span>
                        </div>
                        <button
                          onClick={() => onRemovePlan(plan.id)}
                          className="text-slate-400 hover:text-red-600 p-1"
                          title="Remove from compare"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Plan Title */}
                      <h4 className="text-base font-extrabold text-slate-900 leading-snug">
                        {plan.name}
                      </h4>

                      {/* Price Tag */}
                      <div className="mt-3 flex items-baseline gap-1">
                        <span className="text-2xl font-black text-slate-900">${plan.price}</span>
                        <span className="text-xs text-slate-500">/{plan.period}</span>
                        <span className="ml-auto text-xs text-emerald-700 font-semibold">{plan.contract}</span>
                      </div>

                      {/* Specs */}
                      <div className="mt-4 space-y-2 text-xs text-slate-700">
                        <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex justify-between">
                          <span className="text-slate-500">Download Speed:</span>
                          <span className="font-bold text-blue-700">{plan.downloadSpeed}</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex justify-between">
                          <span className="text-slate-500">Upload Speed:</span>
                          <span className="font-bold text-slate-900">{plan.uploadSpeed}</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex justify-between">
                          <span className="text-slate-500">Equipment:</span>
                          <span className="font-medium text-slate-800">{plan.equipmentFee}</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex justify-between">
                          <span className="text-slate-500">Setup Window:</span>
                          <span className="font-medium text-slate-800">{plan.installationSla}</span>
                        </div>
                      </div>

                      {/* Perks */}
                      <div className="mt-4 pt-3 border-t border-slate-200 space-y-1.5">
                        <div className="text-[11px] font-bold text-slate-500 uppercase">Included Perks:</div>
                        {plan.perks.map((perk, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-xs text-slate-700">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{perk}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Button */}
                    <div className="mt-6 pt-3 border-t border-slate-200">
                      <button
                        onClick={() => {
                          onClose();
                          onOpenBuyflowModal(plan, currentAddress);
                        }}
                        className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>Order: {phoneNumber}</span>
                      </button>
                    </div>
                  </div>
                ))}

                {/* Empty Slot Placeholder if < 3 */}
                {cartPlans.length < 3 && (
                  <div className="rounded-2xl border-2 border-dashed border-slate-200 p-6 flex flex-col items-center justify-center text-center text-slate-400 bg-slate-50/40">
                    <Layers className="w-8 h-8 mb-2 opacity-40 text-slate-400" />
                    <div className="text-xs font-bold text-slate-600">Slot {cartPlans.length + 1} Open</div>
                    <p className="text-xs text-slate-500 mt-1 max-w-[200px]">
                      Add {3 - cartPlans.length} more plan{3 - cartPlans.length > 1 ? 's' : ''} to compare side-by-side.
                    </p>
                    <button
                      onClick={onClose}
                      className="mt-3 px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold"
                    >
                      + Browse More Plans
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Actions */}
        {cartPlans.length > 0 && (
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-slate-700 flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-emerald-600" />
              <span>Call <strong className="text-slate-900">{phoneNumber}</strong> with Promo Code <strong className="text-blue-700 font-mono">PROMO-FREE-INSTALL</strong> for Free Setup</span>
            </div>

            <div className="flex items-center gap-3">
              {/* Email Comparison Button */}
              <button
                onClick={() => setEmailModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition-all shadow-xs"
              >
                <Mail className="w-4 h-4" />
                <span>Email My Comparison Quote</span>
              </button>

              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Nested Email Modal */}
      {emailModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-amber-600" />
                <h4 className="text-base font-bold text-slate-900">Email Comparison Quote</h4>
              </div>
              <button
                onClick={() => setEmailModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {emailSent ? (
              <div className="py-8 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-2">
                  <Check className="w-6 h-6" />
                </div>
                <h5 className="text-base font-bold text-slate-900">Comparison Quote Sent!</h5>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  A side-by-side summary with promotional codes has been sent to <strong className="text-slate-900">{customerEmail}</strong>.
                </p>
                <div className="pt-3">
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Rate-Lock Active for 14 Days
                  </span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSendEmail} className="mt-4 space-y-4 text-xs">
                <p className="text-slate-600">
                  Save this {cartPlans.length}-plan comparison to your inbox to review later. All promotional gift cards and discounts will be preserved.
                </p>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Your Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="youremail@example.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Personal Notes (Optional)</label>
                  <textarea
                    rows={2}
                    value={agentNotes}
                    onChange={(e) => setAgentNotes(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div className="pt-3 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEmailModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold"
                  >
                    Send to My Inbox
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
