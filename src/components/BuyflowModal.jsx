import React, { useState } from 'react';
import { 
  X, 
  Check, 
  ArrowRight, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Wifi, 
  Zap, 
  CheckCircle2, 
  ShoppingBag,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export function BuyflowModal({ isOpen, onClose, selectedPlan, currentAddress }) {
  const [step, setStep] = useState(1); // 1: Details, 2: Add-ons, 3: Install Schedule, 4: Confirmed
  const [customerName, setCustomerName] = useState('Sarah Jenkins');
  const [customerPhone, setCustomerPhone] = useState('(512) 555-0199');
  const [customerEmail, setCustomerEmail] = useState('sjenkins@relo-customer.com');
  
  // Add-ons
  const [includeWifiMesh, setIncludeWifiMesh] = useState(true); // +$10/mo
  const [includeSecurityProtection, setIncludeSecurityProtection] = useState(false); // +$5/mo
  const [includeDirectvStream, setIncludeDirectvStream] = useState(false); // +$69.99/mo (multi-RGU attach!)
  
  // Installation Selection
  const [installDate, setInstallDate] = useState('2026-09-06');
  const [installTimeSlot, setInstallTimeSlot] = useState('Morning (8:00 AM - 12:00 PM)');

  if (!isOpen || !selectedPlan) return null;

  // Calculate live total price dynamically
  let totalPrice = selectedPlan.price;
  if (includeWifiMesh) totalPrice += 10;
  if (includeSecurityProtection) totalPrice += 5;
  if (includeDirectvStream) totalPrice += 69.99;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#0F172A] border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Uniform Buyflow Top Header */}
        <div className="bg-[#0A0E17] px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span 
              className="w-4 h-4 rounded-full" 
              style={{ backgroundColor: selectedPlan.providerColor || '#06B6D4' }}
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">
                  Reserve Service: <span className="text-cyan-400">{selectedPlan.providerName}</span>
                </h3>
                <span className="text-[10px] font-mono uppercase bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded font-bold">
                  Official Carrier Checkout
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Official promotional pricing with no markups. Direct technician scheduling.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Indicator */}
        <div className="bg-slate-900/90 border-b border-slate-800 px-6 py-2.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-cyan-400 font-bold' : 'text-slate-500'}`}>
              <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-mono">1</span>
              <span>Account Details</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-cyan-400 font-bold' : 'text-slate-500'}`}>
              <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-mono">2</span>
              <span>Add-ons &amp; Upgrades</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-cyan-400 font-bold' : 'text-slate-500'}`}>
              <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-mono">3</span>
              <span>Install Schedule</span>
            </div>
          </div>

          <span className="text-[11px] text-slate-400 font-mono">
            Address: <strong className="text-slate-200">{currentAddress || 'Your Service Address'}</strong>
          </span>
        </div>

        {/* Body Grid: Step Details + Live Sticky Cart Summary */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-y-auto flex-1">
          
          {/* Left Column: Current Step Interactive Form */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Step 1: Customer Details */}
            {step === 1 && (
              <div className="space-y-4 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="font-bold text-white text-sm">Customer &amp; Service Location Verification</div>
                  <p className="text-slate-400 text-[11px]">
                    Customer details pre-filled from CRM lead token handshake. Soft credit qualification ready.
                  </p>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Subscriber Full Name</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Contact Phone</label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30 flex items-center gap-2 text-emerald-400 text-[11px]">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>Soft Credit Check Passed: No Security Deposit Required for this Customer</span>
                </div>
              </div>
            )}

            {/* Step 2: Add-ons & Upgrades */}
            {step === 2 && (
              <div className="space-y-4 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="font-bold text-white text-sm">Select Add-ons &amp; Product Upgrades</div>
                  <p className="text-slate-400 text-[11px]">
                    Prices refresh dynamically in the uniform order cart on the right.
                  </p>
                </div>

                {/* Add-on 1: Mesh Wi-Fi */}
                <label className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  includeWifiMesh ? 'bg-cyan-950/40 border-cyan-500/60' : 'bg-slate-900 border-slate-800'
                }`}>
                  <input
                    type="checkbox"
                    checked={includeWifiMesh}
                    onChange={(e) => setIncludeWifiMesh(e.target.checked)}
                    className="mt-0.5 rounded bg-slate-800 text-cyan-500"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white">Whole-Home Wi-Fi 6 Mesh Extender</span>
                      <span className="font-mono text-cyan-400 font-bold">+$10.00 / mo</span>
                    </div>
                    <p className="text-slate-400 text-[11px] mt-0.5">
                      Eliminates dead zones up to 4,500 sq ft with intelligent roaming.
                    </p>
                  </div>
                </label>

                {/* Add-on 2: Security Suite */}
                <label className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  includeSecurityProtection ? 'bg-cyan-950/40 border-cyan-500/60' : 'bg-slate-900 border-slate-800'
                }`}>
                  <input
                    type="checkbox"
                    checked={includeSecurityProtection}
                    onChange={(e) => setIncludeSecurityProtection(e.target.checked)}
                    className="mt-0.5 rounded bg-slate-800 text-cyan-500"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white">Advanced Cybersecurity &amp; Identity Guard</span>
                      <span className="font-mono text-cyan-400 font-bold">+$5.00 / mo</span>
                    </div>
                    <p className="text-slate-400 text-[11px] mt-0.5">
                      Network-level malicious site blocking and identity theft insurance.
                    </p>
                  </div>
                </label>

                {/* Add-on 3: Cross-Carrier Attached Video (DIRECTV Stream RGU Attach) */}
                <label className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  includeDirectvStream ? 'bg-amber-950/40 border-amber-500/60' : 'bg-slate-900 border-slate-800'
                }`}>
                  <input
                    type="checkbox"
                    checked={includeDirectvStream}
                    onChange={(e) => setIncludeDirectvStream(e.target.checked)}
                    className="mt-0.5 rounded bg-slate-800 text-amber-500"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white flex items-center gap-1.5">
                        <span>Attach DIRECTV Entertainment Stream</span>
                        <span className="text-[9px] bg-amber-500 text-black px-1.5 py-0.2 rounded font-mono font-bold">+1 RGU</span>
                      </span>
                      <span className="font-mono text-amber-400 font-bold">+$69.99 / mo</span>
                    </div>
                    <p className="text-slate-400 text-[11px] mt-0.5">
                      75+ top live channels + unlimited cloud DVR. Billed uniformly without contracts.
                    </p>
                  </div>
                </label>
              </div>
            )}

            {/* Step 3: Installation Date & Time Selection (as specified in Image 2) */}
            {step === 3 && (
              <div className="space-y-4 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="font-bold text-white text-sm">Choose Installation Date &amp; Time</div>
                  <p className="text-slate-400 text-[11px]">
                    Direct API dispatch into provider technician scheduling calendar.
                  </p>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Preferred Installation Date</label>
                  <input
                    type="date"
                    value={installDate}
                    onChange={(e) => setInstallDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-xs focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Technician Arrival Window</label>
                  <select
                    value={installTimeSlot}
                    onChange={(e) => setInstallTimeSlot(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs focus:border-cyan-400 focus:outline-none"
                  >
                    <option>Morning (8:00 AM - 12:00 PM)</option>
                    <option>Afternoon (1:00 PM - 5:00 PM)</option>
                    <option>Evening / Priority (4:00 PM - 7:00 PM)</option>
                    <option>Self-Install QuickKit (Dispatched 2-Day Priority Mail)</option>
                  </select>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1 text-[11px] text-slate-300">
                  <div className="text-slate-400 font-semibold">Technician Dispatch Instructions:</div>
                  <p>Standard professional fiber install. Customer will receive SMS updates 30 minutes prior to technician arrival.</p>
                </div>
              </div>
            )}

            {/* Step 4: Confirmed Success State */}
            {step === 4 && (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-glow-cyan">
                  <Check className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-extrabold text-white">Installation &amp; Service Reserved!</h4>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  Your order has been booked directly with {selectedPlan.providerName}. You will receive an SMS and email confirmation with your technician details.
                </p>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-left max-w-sm mx-auto space-y-1 text-slate-300">
                  <div>&gt; Confirmation #: <span className="text-cyan-400 font-bold">HP-TX-2026-89412</span></div>
                  <div>&gt; Selected Carrier: <span className="text-white">{selectedPlan.providerName}</span></div>
                  <div>&gt; Confirmed Install Date: <span className="text-emerald-400">{installDate} ({installTimeSlot.split(' ')[0]})</span></div>
                  <div>&gt; Services Included: <span className="text-amber-300 font-bold">{includeDirectvStream ? 'Gigabit Internet + DIRECTV Stream' : selectedPlan.name}</span></div>
                  <div>&gt; Rate Lock: <span className="text-cyan-300">Guaranteed for 12–24 Months</span></div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs shadow-glow-cyan"
                  >
                    Done &bull; Back to Home Tech Dealer Inc.
                  </button>
                </div>
              </div>
            )}

            {/* Navigation Buttons for Steps 1-3 */}
            {step < 4 && (
              <div className="pt-4 flex items-center justify-between border-t border-slate-800">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(prev => prev - 1)}
                    className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
                  >
                    Back
                  </button>
                ) : <div />}

                <button
                  type="button"
                  onClick={() => setStep(prev => prev + 1)}
                  className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs flex items-center gap-1.5 shadow-glow-cyan"
                >
                  <span>{step === 3 ? 'Submit Order to Carrier' : 'Continue'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Dynamic Order Summary Cart (As emphasized in Image 2) */}
          <div className="lg:col-span-5 glass-panel p-5 rounded-xl border border-slate-700/80 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-cyan-400" />
                <h4 className="text-xs font-bold text-white uppercase font-mono">Dynamic Buyflow Cart</h4>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded">
                Live Pricing
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <div className="text-[11px] text-slate-400">Selected Product:</div>
                <div className="font-extrabold text-white text-sm">{selectedPlan.name}</div>
                <div className="text-[11px] text-cyan-400 font-mono">
                  {selectedPlan.downloadSpeed} / {selectedPlan.uploadSpeed}
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="pt-2 border-t border-slate-800 space-y-1.5 text-[11px]">
                <div className="flex justify-between text-slate-300">
                  <span>Base Monthly Service:</span>
                  <span className="font-mono font-semibold text-white">${selectedPlan.price.toFixed(2)}/mo</span>
                </div>

                {includeWifiMesh && (
                  <div className="flex justify-between text-slate-300">
                    <span>Wi-Fi 6 Mesh Extender:</span>
                    <span className="font-mono font-semibold text-cyan-400">+$10.00/mo</span>
                  </div>
                )}

                {includeSecurityProtection && (
                  <div className="flex justify-between text-slate-300">
                    <span>Cybersecurity Suite:</span>
                    <span className="font-mono font-semibold text-cyan-400">+$5.00/mo</span>
                  </div>
                )}

                {includeDirectvStream && (
                  <div className="flex justify-between text-slate-300">
                    <span>DIRECTV Stream Bundle:</span>
                    <span className="font-mono font-semibold text-amber-400">+$69.99/mo</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-300">
                  <span>Standard Installation:</span>
                  <span className="font-mono text-emerald-400 font-semibold">$0.00 (Waived)</span>
                </div>
              </div>

              {/* Dynamic Grand Total */}
              <div className="pt-3 border-t border-slate-800 flex items-baseline justify-between">
                <div>
                  <div className="text-xs text-slate-400 font-semibold">Total Monthly Due:</div>
                  <div className="text-[10px] text-slate-500">Plus applicable state taxes</div>
                </div>
                <div className="text-2xl font-mono font-extrabold text-cyan-400">
                  ${totalPrice.toFixed(2)}
                  <span className="text-xs font-normal text-slate-400">/mo</span>
                </div>
              </div>
            </div>

            {/* Feature Callout Note */}
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <span className="text-slate-300 font-semibold block">Home Tech Dealer Inc. Direct Carrier Guarantee:</span>
              <p>
                No hidden markups or intermediary charges. All equipment warranties, promotional rate locks, and installation appointments are honored directly by the carrier.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
