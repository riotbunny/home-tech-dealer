import React, { useState } from 'react';
import { 
  X, 
  Handshake, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  ShieldCheck, 
  Zap, 
  Code, 
  Calendar,
  Sparkles,
  Download
} from 'lucide-react';

export function PartnershipPortal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    companyRole: 'Master Wholesale Partner / Carrier Representative',
    email: '',
    phone: '',
    requestedTokens: 'Production + Staging Sandbox',
    message: 'We are ready to initiate tokenized buyflow integration and configure authorized carrier rosters.'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Keep message up for confirmation
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#0F172A] border border-cyan-500/40 rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-cyan-950/80 via-slate-900 to-indigo-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-glow-cyan">
              <Handshake className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-extrabold text-white">
                  Enterprise Distribution Partnership
                </h3>
                <span className="text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">
                  48-Hr SLA
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Initiate master distribution onboarding, request token sandbox keys, or schedule an executive review.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[80vh]">
          {submitted ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-glow-cyan">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-extrabold text-white">Partner Handshake Request Dispatched!</h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you. Our partnership integration team has received your inquiry. A preliminary technical dossier with webhook endpoints and token configurations has been assigned.
              </p>
              
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 max-w-sm mx-auto space-y-1 text-left">
                <div className="text-slate-500">// Handshake Ticket Initialized</div>
                <div>&gt; Ticket ID: <span className="text-white">OMNI-PARTNER-2026-094</span></div>
                <div>&gt; Target System: <span className="text-emerald-400">api.omnipulseconnect.com/buyflow</span></div>
                <div>&gt; Contact: <span className="text-amber-300">{formData.email}</span></div>
                <div>&gt; SLA Response: <span className="text-cyan-400">&lt; 4 Business Hours</span></div>
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs shadow-glow-cyan"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Value Highlight Banner */}
              <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-slate-300 space-y-1">
                <div className="text-cyan-400 font-bold flex items-center gap-1.5 text-xs">
                  <Sparkles className="w-4 h-4" />
                  <span>Immediate Value for Master Wholesale &amp; Carrier Partners:</span>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-1 text-[11px] font-mono text-center">
                  <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
                    <div className="text-white font-bold">38.5K</div>
                    <div className="text-[10px] text-slate-400">Monthly Quals</div>
                  </div>
                  <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
                    <div className="text-emerald-400 font-bold">41.8%</div>
                    <div className="text-[10px] text-slate-400">Avg QCR Rate</div>
                  </div>
                  <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
                    <div className="text-amber-400 font-bold">$1.8M+</div>
                    <div className="text-[10px] text-slate-400">Annual Commission GMV</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Role / Department</label>
                  <input
                    type="text"
                    required
                    value={formData.companyRole}
                    onChange={(e) => setFormData({...formData, companyRole: e.target.value})}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Corporate Email</label>
                  <input
                    type="email"
                    required
                    placeholder="partner@telecom-network.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Direct Phone</label>
                  <input
                    type="tel"
                    placeholder="(555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Desired Integration Access</label>
                <select
                  value={formData.requestedTokens}
                  onChange={(e) => setFormData({...formData, requestedTokens: e.target.value})}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                >
                  <option value="Production + Staging Sandbox">Full Production + Staging Token API Access</option>
                  <option value="Direct Master Dealer Contract">Master Dealer Agreement &amp; Override Review</option>
                  <option value="Provider Suppression Roster Config">23-Provider Roster &amp; Suppression Rules Handshake</option>
                  <option value="Executive Intro Call">Executive Intro Call with Managing Partners</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Partnership Notes / Custom Terms</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Strict NDA &amp; Master Partner Privacy Protected</span>
                </span>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-extrabold flex items-center gap-1.5 shadow-glow-cyan"
                  >
                    <span>Submit Onboarding Request</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
