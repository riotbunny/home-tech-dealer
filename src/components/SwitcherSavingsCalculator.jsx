import React, { useState } from 'react';
import { DollarSign, ArrowRight, Sparkles, PhoneCall, Gift, CheckCircle2 } from 'lucide-react';
import { DEFAULT_PHONE_NUMBER } from '../services/catalogService';

/**
 * SwitcherSavingsCalculator
 * Interactive bill comparison & switcher savings engine.
 * Demonstrates the annual cash return and upfront gift cards unlocked by ditching old legacy cable.
 */
export function SwitcherSavingsCalculator({ phoneNumber = DEFAULT_PHONE_NUMBER, onScrollToMarketplace }) {
  const [currentProvider, setCurrentProvider] = useState('Spectrum / Charter');
  const [currentBill, setCurrentBill] = useState(85);

  const telHref = `tel:${phoneNumber.replace(/\D/g, '')}`;

  // Benchmark rate: $50/mo for modern 5G or high-speed fiber
  const newBaselinePlanPrice = 50;
  const monthlySavings = Math.max(0, currentBill - newBaselinePlanPrice);
  const annualCashSavings = monthlySavings * 12;
  const hardwareSavingsPerYear = 14 * 12; // Typical cable modem rental fee ($14/mo)
  const averageGiftCard = 100;
  const totalFirstYearValue = annualCashSavings + hardwareSavingsPerYear + averageGiftCard;

  const currentProvidersList = [
    'Spectrum / Charter',
    'Xfinity (Comcast)',
    'Cox Communications',
    'Optimum / Suddenlink',
    'CenturyLink / Brightspeed',
    'Mediacom Cable',
    'Other Legacy Provider'
  ];

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="rounded-3xl bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-10 shadow-2xl border border-blue-500/20 relative overflow-hidden">
        
        {/* Subtle Background Glow */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Interactive Inputs */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>Cable Switcher Calculator</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Overpaying for Cable Internet? See How Much You Keep.
              </h2>
              <p className="mt-2 text-sm text-slate-300 max-w-xl">
                Legacy cable operators average <strong>$85–$115/month</strong> after teaser rates expire. Modern 5G and fiber networks start at <strong>$50/month</strong> with zero rental charges.
              </p>
            </div>

            {/* Provider Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                1. Select your current provider:
              </label>
              <select
                value={currentProvider}
                onChange={(e) => setCurrentProvider(e.target.value)}
                className="w-full max-w-md px-4 py-3 rounded-2xl bg-slate-900/90 border border-slate-700 text-white text-sm font-semibold focus:outline-none focus:border-blue-400"
              >
                {currentProvidersList.map((p) => (
                  <option key={p} value={p} className="bg-slate-900 text-white">
                    {p}
                  </option>
                ))}
              </select>
            </div>

            {/* Monthly Bill Slider */}
            <div className="space-y-3 max-w-md">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  2. What do you pay each month?
                </label>
                <span className="text-2xl font-black text-emerald-400 font-mono">
                  ${currentBill}
                  <span className="text-xs font-normal text-slate-400">/mo</span>
                </span>
              </div>
              
              <input
                type="range"
                min="50"
                max="160"
                step="5"
                value={currentBill}
                onChange={(e) => setCurrentBill(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>$50/mo</span>
                <span>$85 (National Avg)</span>
                <span>$160/mo</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Savings Result Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-white text-slate-900 p-6 sm:p-8 shadow-2xl border border-slate-100 flex flex-col justify-between space-y-6">
              
              {/* Top Savings Callout */}
              <div>
                <div className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1">
                  Estimated 1st-Year Benefit
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black tracking-tight text-emerald-600 font-mono">
                    +${totalFirstYearValue.toLocaleString()}
                  </span>
                  <span className="text-xs font-bold text-slate-600 uppercase">
                    Combined Value
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  By switching from {currentProvider} to a $50/mo rate lock.
                </p>
              </div>

              {/* Value Breakdown List */}
              <div className="space-y-2.5 py-3 border-y border-slate-100 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Direct Monthly Bill Savings:</span>
                  </span>
                  <span className="font-extrabold text-slate-900 font-mono">
                    ${annualCashSavings}/yr (${monthlySavings}/mo)
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-600 flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>$0 Wi-Fi 6 Router Rental:</span>
                  </span>
                  <span className="font-extrabold text-emerald-700 font-mono">
                    +${hardwareSavingsPerYear}/yr Saved
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-600 flex items-center gap-1.5 font-medium">
                    <Gift className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Promotional Reward Card:</span>
                  </span>
                  <span className="font-extrabold text-blue-700 font-mono">
                    +${averageGiftCard} Visa Card
                  </span>
                </div>
              </div>

              {/* Call to Order CTA */}
              <div className="space-y-2">
                <a
                  href={telHref}
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all text-center"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call {phoneNumber} to Lock In Rate</span>
                </a>

                {onScrollToMarketplace && (
                  <button
                    type="button"
                    onClick={onScrollToMarketplace}
                    className="w-full py-2 text-center text-xs text-blue-600 hover:text-blue-800 font-bold transition-colors"
                  >
                    Or compare all plans at your address &darr;
                  </button>
                )}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
