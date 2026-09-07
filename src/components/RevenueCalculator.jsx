import React, { useState } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  Zap, 
  Layers, 
  ShieldCheck, 
  ArrowRight,
  PieChart,
  BarChart3,
  Sparkles
} from 'lucide-react';

export function RevenueCalculator({ onOpenPartnerModal }) {
  // Input parameters
  const [monthlyQuals, setMonthlyQuals] = useState(38500);
  const [qcrRate, setQcrRate] = useState(41.8); // % Qualification Close Rate
  const [triplePlayAttach, setTriplePlayAttach] = useState(28); // % multi-product attach
  const [avgCarrierBounty, setAvgCarrierBounty] = useState(165); // $ avg commission
  const [partnerOverridePerRgu, setPartnerOverridePerRgu] = useState(25); // $ Master Partner override fee

  // Calculations
  const monthlyOrders = Math.round(monthlyQuals * (qcrRate / 100));
  // Additional RGUs from triple play (e.g. adding DIRECTV or Mobile to broadband)
  const additionalRgus = Math.round(monthlyOrders * (triplePlayAttach / 100));
  const totalMonthlyRgus = monthlyOrders + additionalRgus;
  const annualTotalRgus = totalMonthlyRgus * 12;

  // Financials
  const monthlyGrossBountyGmv = totalMonthlyRgus * avgCarrierBounty;
  const annualGrossBountyGmv = monthlyGrossBountyGmv * 12;

  const monthlyPartnerOverrideRevenue = totalMonthlyRgus * partnerOverridePerRgu;
  const annualPartnerOverrideRevenue = monthlyPartnerOverrideRevenue * 12;

  const monthlyDealerNet = monthlyGrossBountyGmv - monthlyPartnerOverrideRevenue;
  const annualDealerNet = monthlyDealerNet * 12;

  // Comparison vs average 22% QCR dealer
  const baselineMonthlyOrders = Math.round(monthlyQuals * 0.22);
  const baselineMonthlyRgus = baselineMonthlyOrders + Math.round(baselineMonthlyOrders * 0.12);
  const baselineAnnualPartnerRevenue = baselineMonthlyRgus * partnerOverridePerRgu * 12;
  const partnerRevenueLift = annualPartnerOverrideRevenue - baselineAnnualPartnerRevenue;

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center sm:text-left pb-6 border-b border-slate-800">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-2">
          <Calculator className="w-3.5 h-3.5" />
          <span>Financial Yield &amp; RGU Forecast Model</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Revenue Assurance &amp; Commission Distribution Forecaster
        </h2>
        <p className="mt-1 text-sm text-slate-400 max-w-3xl">
          Simulate the volume, carrier bounties, and master distributor overrides generated when OmniPulse channels high-intent mover traffic and 350 call center seats into unified telecom order management.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive Sliders */}
        <div className="lg:col-span-6 glass-panel p-6 rounded-2xl border border-slate-700/80 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Operational Input Metrics
            </h3>
            <span className="text-[10px] bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded font-mono border border-cyan-800">
              Interactive Sliders
            </span>
          </div>

          {/* Monthly Address Lookups */}
          <div>
            <div className="flex justify-between items-center mb-1 text-xs">
              <span className="text-slate-300 font-semibold">Monthly Inbound Address Lookups</span>
              <span className="font-mono font-bold text-white text-sm">
                {monthlyQuals.toLocaleString()} addresses
              </span>
            </div>
            <input
              type="range"
              min="10000"
              max="100000"
              step="2500"
              value={monthlyQuals}
              onChange={(e) => setMonthlyQuals(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>10k (Pilot)</span>
              <span>38.5k (OmniPulse Current)</span>
              <span>100k (Full Expansion)</span>
            </div>
          </div>

          {/* QCR Close Rate */}
          <div>
            <div className="flex justify-between items-center mb-1 text-xs">
              <span className="text-slate-300 font-semibold">Qualification Close Rate (QCR %)</span>
              <span className="font-mono font-bold text-emerald-400 text-sm">
                {qcrRate}%
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="55"
              step="0.5"
              value={qcrRate}
              onChange={(e) => setQcrRate(Number(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>20% (Industry Low)</span>
              <span>30% (Standard)</span>
              <span>41.8% (OmniPulse Avg)</span>
              <span>55% (High Close)</span>
            </div>
          </div>

          {/* Triple Play Attach */}
          <div>
            <div className="flex justify-between items-center mb-1 text-xs">
              <span className="text-slate-300 font-semibold">Multi-Product Attach Rate (TV / Mobile / Voice)</span>
              <span className="font-mono font-bold text-amber-400 text-sm">
                +{triplePlayAttach}% RGUs
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="50"
              step="2"
              value={triplePlayAttach}
              onChange={(e) => setTriplePlayAttach(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>10% (Broadband Only)</span>
              <span>28% (OmniPulse Avg)</span>
              <span>50% (Max Triple-Play)</span>
            </div>
          </div>

          {/* Average Bounty */}
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-800">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Avg Carrier Bounty</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-slate-500 text-xs font-mono">$</span>
                <input
                  type="number"
                  value={avgCarrierBounty}
                  onChange={(e) => setAvgCarrierBounty(Number(e.target.value))}
                  className="w-full pl-7 pr-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-xs focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Master Override / RGU</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-slate-500 text-xs font-mono">$</span>
                <input
                  type="number"
                  value={partnerOverridePerRgu}
                  onChange={(e) => setPartnerOverridePerRgu(Number(e.target.value))}
                  className="w-full pl-7 pr-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-xs focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* OmniPulse Efficiency Lift Card */}
          <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs space-y-1">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <Sparkles className="w-4 h-4" />
              <span>High-QCR Distribution Yield Surplus</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Because OmniPulse achieves <strong className="text-white">41.8% QCR</strong> (vs. standard dealers at 22%), wholesale partners capture an additional <strong className="text-emerald-400 font-mono font-bold">+${Math.round(partnerRevenueLift).toLocaleString()}</strong> in annual override revenue on the exact same lead volume!
            </p>
          </div>
        </div>

        {/* Right Column: Dynamic Financial Yield Displays */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Main Master Override Revenue Display */}
          <div className="glass-panel p-6 rounded-2xl border border-amber-500/40 bg-gradient-to-br from-[#111827] via-[#1A1A2E] to-[#111827] shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <DollarSign className="w-4 h-4" />
                <span>Master Wholesale Override</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                Net Platform Override
              </span>
            </div>

            <div className="mt-4">
              <div className="text-xs text-slate-400">Annual Master Wholesale Revenue</div>
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-amber-400 mt-0.5">
                ${Math.round(annualPartnerOverrideRevenue).toLocaleString()}
                <span className="text-xs font-normal text-slate-400"> / year</span>
              </div>
              <div className="text-xs font-mono text-slate-300 mt-1">
                (${Math.round(monthlyPartnerOverrideRevenue).toLocaleString()} / month recurring)
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-800 grid grid-cols-2 gap-4 text-xs">
              <div>
                <div className="text-slate-400 text-[11px]">Monthly Installed RGUs</div>
                <div className="text-xl font-bold font-mono text-white mt-0.5">
                  {totalMonthlyRgus.toLocaleString()}
                </div>
                <div className="text-[10px] text-cyan-400 font-mono">
                  ({annualTotalRgus.toLocaleString()} / year)
                </div>
              </div>

              <div>
                <div className="text-slate-400 text-[11px]">Total Carrier GMV</div>
                <div className="text-xl font-bold font-mono text-emerald-400 mt-0.5">
                  ${Math.round(annualGrossBountyGmv / 1000000 * 10) / 10}M
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  Commission Volume Flow
                </div>
              </div>
            </div>
          </div>

          {/* RGU Distribution Breakdown */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-700/80 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                Monthly RGU Yield Composition
              </h4>
              <span className="text-xs font-mono text-cyan-400 font-bold">
                {totalMonthlyRgus.toLocaleString()} Total RGUs
              </span>
            </div>

            {/* Progress Bars */}
            <div className="space-y-2 text-xs">
              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>Core Broadband / Fiber Orders ({qcrRate}% QCR):</span>
                  <span className="font-mono text-white">{monthlyOrders.toLocaleString()} RGUs</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-cyan-400 rounded-full" 
                    style={{ width: `${(monthlyOrders / totalMonthlyRgus) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>Attached Video (DIRECTV / Stream) &amp; Mobile (+{triplePlayAttach}%):</span>
                  <span className="font-mono text-amber-400">+{additionalRgus.toLocaleString()} RGUs</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-400 rounded-full" 
                    style={{ width: `${(additionalRgus / totalMonthlyRgus) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Revenue Assurance Note */}
            <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                Fully reconciled through our automated <strong>Commission Management &amp; Revenue Assurance engine</strong>—sub-dealer payouts with zero administrative leakage.
              </span>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={onOpenPartnerModal}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <span>Lock In Preferred Tier Contract With OmniPulse</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
