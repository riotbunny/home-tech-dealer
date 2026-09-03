import React, { useState, useMemo } from 'react';
import { 
  Layers, 
  Search, 
  CheckCircle2, 
  Wifi, 
  Clock, 
  ArrowRight,
  Star
} from 'lucide-react';
import { PROVIDERS_CATALOG } from '../data/providersData';

export function ProviderMatrix({ onSelectProviderForFilter, catalog }) {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const categories = [
    { id: 'all', label: 'All 27 Providers' },
    { id: 'tier1', label: 'Major National Providers' },
    { id: 'regional', label: 'Regional Fiber Providers' },
    { id: 'satellite', label: 'Satellite & TV' }
  ];

  const filteredProviders = useMemo(() => {
    const activeData = catalog || PROVIDERS_CATALOG;
    return activeData.filter(provider => {
      if (provider.paused) return false;
      // Category filter
      if (categoryFilter === 'tier1') {
        if (!provider.category.includes('Tier-1')) return false;
      } else if (categoryFilter === 'regional') {
        if (!provider.category.includes('Regional') && !provider.category.includes('Overbuilder') && !provider.category.includes('Independent') && !provider.category.includes('Mid-Major')) return false;
      } else if (categoryFilter === 'satellite') {
        if (!provider.category.includes('Satellite') && !provider.category.includes('Video')) return false;
      }

      // Search
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          provider.name.toLowerCase().includes(q) ||
          provider.fullName.toLowerCase().includes(q) ||
          provider.type.toLowerCase().includes(q) ||
          provider.badge.toLowerCase().includes(q)
        );
      }

      return true;
    });
  }, [search, categoryFilter]);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="pb-6 border-b border-slate-200">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-2">
          <Layers className="w-3.5 h-3.5" />
          <span>Provider Directory</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Compare 27 Leading Internet &amp; TV Providers
            </h2>
            <p className="mt-1 text-sm text-slate-600 max-w-3xl">
              Browse top national and regional providers. Compare starting prices, maximum download speeds, and customer ratings.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3.5 py-2 rounded-xl shrink-0">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>27 Providers Covered Nationwide</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                categoryFilter === cat.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search providers..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-blue-600"
          />
        </div>
      </div>

      {/* Providers Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredProviders.map((provider) => {
          const startingPrice = provider.plans[0]?.price || 45;
          const maxSpeed = provider.plans[provider.plans.length - 1]?.downloadSpeed || '1000 Mbps';
          return (
            <div
              key={provider.id}
              className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-3.5 h-3.5 rounded-full" 
                      style={{ backgroundColor: provider.color || '#2563EB' }}
                    />
                    <span className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                      {provider.name}
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                    {provider.type.split(' ')[0]}
                  </span>
                </div>

                <div className="text-xs text-slate-500 line-clamp-1 mb-2">
                  {provider.fullName}
                </div>

                <div className="inline-block text-[11px] font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-lg mb-3">
                  {provider.badge}
                </div>

                {/* Specs */}
                <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <div className="flex justify-between items-center text-xs">
                    <span>Starting From:</span>
                    <span className="text-slate-900 font-bold">${startingPrice}/mo</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span>Max Download:</span>
                    <span className="text-blue-700 font-bold">{maxSpeed}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span>Installation:</span>
                    <span>{provider.installationSla}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span>Customer Rating:</span>
                    <span className="text-amber-600 font-semibold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span>4.8 / 5.0</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-3 border-t border-slate-100">
                <button
                  onClick={() => {
                    onSelectProviderForFilter(provider.id);
                    const element = document.getElementById('plans-marketplace');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-2 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Check Availability</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
