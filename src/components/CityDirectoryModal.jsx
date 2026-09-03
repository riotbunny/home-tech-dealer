import React, { useState, useMemo } from 'react';
import { 
  X, 
  Search, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  Compass
} from 'lucide-react';
import { getStatesList, createCitySlug } from '../data/usCitiesData';

export function CityDirectoryModal({ 
  isOpen, 
  onClose, 
  onSelectCity,
  currentCityName = ''
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStateCode, setSelectedStateCode] = useState('ALL');

  const statesList = useMemo(() => getStatesList(), []);

  // Filter cities by search term
  const filteredStates = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) {
      if (selectedStateCode === 'ALL') return statesList;
      return statesList.filter(s => s.code === selectedStateCode);
    }

    return statesList
      .map(state => {
        const matchingCities = state.cities.filter(c => 
          c.city.toLowerCase().includes(q) ||
          c.state.toLowerCase().includes(q) ||
          state.name.toLowerCase().includes(q)
        );
        return {
          ...state,
          cities: matchingCities
        };
      })
      .filter(state => state.cities.length > 0 || state.name.toLowerCase().includes(q));
  }, [statesList, searchQuery, selectedStateCode]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                All 50 States Internet &amp; TV Directory
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Browse verified broadband and fiber availability across all USA metropolitan markets
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100 flex items-center justify-center transition-colors"
            title="Close directory"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & State Filter Controls */}
        <div className="p-4 sm:p-5 border-b border-slate-100 space-y-3 bg-white">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by city (e.g. Austin, Miami, Chicago, Seattle) or state..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
            />
          </div>

          {/* Quick State Pill Scroller */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
            <button
              onClick={() => setSelectedStateCode('ALL')}
              className={`px-3 py-1 rounded-lg font-bold shrink-0 transition-all ${
                selectedStateCode === 'ALL'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All 50 States
            </button>
            {['TX', 'CA', 'FL', 'NY', 'IL', 'OH', 'WA', 'AZ', 'GA', 'NC', 'CO', 'PA'].map(code => (
              <button
                key={code}
                onClick={() => setSelectedStateCode(code)}
                className={`px-2.5 py-1 rounded-lg font-bold shrink-0 transition-all ${
                  selectedStateCode === code
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {code}
              </button>
            ))}
          </div>
        </div>

        {/* Directory Grid with Crawlable <a> Anchor Links */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 divide-y divide-slate-100">
          {filteredStates.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Building2 className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p className="font-bold text-sm text-slate-700">No matching US cities found</p>
              <p className="text-xs text-slate-400 mt-1">Try typing another city name or select a state above.</p>
            </div>
          ) : (
            filteredStates.map(state => (
              <div key={state.code} className="pt-5 first:pt-0">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-extrabold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                      {state.code}
                    </span>
                    <h3 className="font-extrabold text-sm text-slate-900">
                      {state.name}
                    </h3>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400">
                    {state.cities.length} top market{state.cities.length !== 1 ? 's' : ''}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {state.cities.map(city => {
                    const slug = createCitySlug(city.city, city.state);
                    const isCurrent = currentCityName.toLowerCase() === city.city.toLowerCase();
                    const href = city.zip 
                      ? `/internet/${city.state.toLowerCase()}/${createCitySlug(city.city)}/${city.zip}`
                      : `/internet/${city.state.toLowerCase()}/${createCitySlug(city.city)}`;

                    return (
                      <a
                        key={slug}
                        href={href}
                        onClick={(e) => {
                          e.preventDefault();
                          onSelectCity(href);
                          onClose();
                        }}
                        className={`group p-3 rounded-xl border text-left transition-all flex items-center justify-between gap-2 ${
                          isCurrent
                            ? 'bg-blue-50/80 border-blue-300 ring-2 ring-blue-200'
                            : 'bg-white hover:bg-slate-50 border-slate-200/80 hover:border-blue-300 hover:shadow-xs'
                        }`}
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <MapPin className={`w-3.5 h-3.5 shrink-0 ${isCurrent ? 'text-blue-600' : 'text-slate-400 group-hover:text-blue-600'}`} />
                            <span className={`font-bold text-xs truncate ${isCurrent ? 'text-blue-900 font-extrabold' : 'text-slate-800'}`}>
                              {city.city}, {city.state}
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-400 mt-0.5 pl-5 font-mono">
                            Up to {city.speed || '1000 Mbps'} &bull; Fiber
                          </div>
                        </div>

                        {isCurrent ? (
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                        ) : (
                          <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                        )}
                      </a>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <div>
            100% Nationwide Coverage &bull; Top 4 Guaranteed Carriers in All 50 States
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 font-bold text-slate-800 transition-colors"
          >
            Close Directory
          </button>
        </div>
      </div>
    </div>
  );
}
