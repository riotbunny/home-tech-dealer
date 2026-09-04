import React from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  PhoneCall, 
  Zap, 
  Layers, 
  ArrowRight, 
  Star, 
  Trophy,
  HelpCircle
} from 'lucide-react';
import { PROVIDERS_CATALOG } from '../data/providersData';
import { POPULAR_COMPARISONS } from '../data/usCitiesData';
import { DEFAULT_PHONE_NUMBER } from '../services/catalogService';

export function CarrierComparisonView({
  carrierAId = 'spectrum',
  carrierBId = 'att',
  phoneNumber = DEFAULT_PHONE_NUMBER,
  onNavigateComparison
}) {
  const telHref = `tel:${phoneNumber.replace(/\D/g, '')}`;

  // Find provider records
  const provA = PROVIDERS_CATALOG.find(p => p.id === carrierAId) || PROVIDERS_CATALOG.find(p => p.id === 'spectrum');
  const provB = PROVIDERS_CATALOG.find(p => p.id === carrierBId) || PROVIDERS_CATALOG.find(p => p.id === 'att');

  const startPriceA = provA?.plans[0]?.price || 49.99;
  const startPriceB = provB?.plans[0]?.price || 55.00;
  const maxSpeedA = provA?.plans[provA.plans.length - 1]?.downloadSpeed || '1000 Mbps';
  const maxSpeedB = provB?.plans[provB.plans.length - 1]?.downloadSpeed || '5000 Mbps';

  const otherComparisons = POPULAR_COMPARISONS.filter(c => c.id !== `${carrierAId}-vs-${carrierBId}`).slice(0, 6);

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Head-to-Head Hero Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-4">
          <Trophy className="w-3.5 h-3.5 text-amber-500" />
          <span>2026 Head-to-Head Carrier Faceoff</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          <span style={{ color: provA?.color || '#2563EB' }}>{provA?.name}</span>
          {' '}vs.{' '}
          <span style={{ color: provB?.color || '#00A8E0' }}>{provB?.name}</span>
        </h1>

        <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
          Comprehensive comparison of monthly pricing, real-world speeds, contract commitments, and equipment fees to help you decide which provider is right for your home.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <a
            href={telHref}
            className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-blue-600/25 transition-all"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Check Both at Your Address: {phoneNumber}</span>
          </a>
        </div>
      </div>

      {/* Side-by-Side Comparison Matrix Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Provider A Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 hover:border-blue-400 shadow-xs transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <span className="w-4 h-4 rounded-full" style={{ backgroundColor: provA?.color || '#2563EB' }} />
                <h2 className="text-2xl font-black text-slate-900">{provA?.name}</h2>
              </div>
              <span className="text-xs font-bold bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-100">
                {provA?.type}
              </span>
            </div>

            <p className="text-xs text-slate-500 mb-6">{provA?.fullName}</p>

            <div className="space-y-4 text-xs sm:text-sm divide-y divide-slate-100">
              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-500">Starting Price</span>
                <span className="font-black text-slate-900 text-lg">${startPriceA}/mo</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-500">Maximum Speeds</span>
                <span className="font-extrabold text-blue-700">{maxSpeedA}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-500">Contracts</span>
                <span className="font-semibold text-slate-800">No Annual Contract</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-500">Data Caps</span>
                <span className="font-bold text-emerald-600">100% Unlimited</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-500">Equipment Fees</span>
                <span className="font-semibold text-slate-800">Wi-Fi Router Included</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-500">Customer Satisfaction</span>
                <div className="flex items-center gap-1 font-bold text-amber-600">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>4.8 / 5.0</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-100">
            <a
              href={telHref}
              className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Order {provA?.name}: {phoneNumber}</span>
            </a>
          </div>
        </div>

        {/* Provider B Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 hover:border-blue-400 shadow-xs transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <span className="w-4 h-4 rounded-full" style={{ backgroundColor: provB?.color || '#00A8E0' }} />
                <h2 className="text-2xl font-black text-slate-900">{provB?.name}</h2>
              </div>
              <span className="text-xs font-bold bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-100">
                {provB?.type}
              </span>
            </div>

            <p className="text-xs text-slate-500 mb-6">{provB?.fullName}</p>

            <div className="space-y-4 text-xs sm:text-sm divide-y divide-slate-100">
              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-500">Starting Price</span>
                <span className="font-black text-slate-900 text-lg">${startPriceB}/mo</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-500">Maximum Speeds</span>
                <span className="font-extrabold text-blue-700">{maxSpeedB}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-500">Contracts</span>
                <span className="font-semibold text-slate-800">No Annual Contract</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-500">Data Caps</span>
                <span className="font-bold text-emerald-600">100% Unlimited</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-500">Equipment Fees</span>
                <span className="font-semibold text-slate-800">Included ($0/mo)</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-500">Customer Satisfaction</span>
                <div className="flex items-center gap-1 font-bold text-amber-600">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>4.9 / 5.0</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-100">
            <a
              href={telHref}
              className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Order {provB?.name}: {phoneNumber}</span>
            </a>
          </div>
        </div>

      </div>

      {/* Editorial Verdict Breakdown */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 space-y-4">
        <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight flex items-center gap-2 text-white">
          <ShieldCheck className="w-6 h-6 text-emerald-400" />
          <span>The Verdict: Which Provider Wins?</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Choosing between <strong>{provA?.name}</strong> and <strong>{provB?.name}</strong> primarily comes down to what is physically installed at your specific street address. If symmetrical pure fiber optic is connected to your home, fiber offers the highest upload speeds and lowest latency for gaming and heavy remote work. If fiber is not yet laid on your block, high-speed hybrid coaxial cable or 5G home internet delivers reliable gigabit connectivity with zero installation delays.
        </p>
        <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-300">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Both provide no-contract terms</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Both include Wi-Fi equipment</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Mover promotional gift cards available</span>
          </div>
        </div>
      </div>

      {/* Other Popular Head-to-Head Comparisons (Crawl Mesh) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200">
        <h3 className="text-lg font-black text-slate-900 mb-2 flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-600" />
          <span>More High-Traffic Provider Comparisons</span>
        </h3>
        <p className="text-xs text-slate-500 mb-6">
          Compare leading national and regional telecom providers side-by-side.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {otherComparisons.map(comp => {
            const path = `/compare/${comp.id}`;
            return (
              <a
                key={comp.id}
                href={path}
                onClick={(e) => {
                  if (onNavigateComparison) {
                    e.preventDefault();
                    onNavigateComparison(path);
                  }
                }}
                className="p-3.5 rounded-2xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="font-bold text-xs text-slate-900 group-hover:text-blue-600 transition-colors">
                    {comp.nameA} vs {comp.nameB}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5 font-medium">
                    {comp.tag}
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
              </a>
            );
          })}
        </div>
      </div>

    </div>
  );
}
