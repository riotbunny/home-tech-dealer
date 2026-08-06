import React, { useState } from 'react';

export interface ProviderPlan {
  id: string;
  name: string;
  price?: number;
  speed?: string;
  contract_length?: string;
  connection_type?: string;
  special_promo?: string;
}

export interface ProviderCoverage {
  id: string;
  name: string;
  technology_type?: string;
  max_download_speed?: number;
  coverage_percentage?: number;
  starting_price?: number;
  plans?: ProviderPlan[];
}

export const ProviderCard: React.FC<{ provider: ProviderCoverage; zipCode: string }> = ({
  provider,
  zipCode,
}) => {
  const [showPlans, setShowPlans] = useState(false);
  const startingPrice = Number(provider.starting_price || 0).toFixed(2);

  const scrollToWidget = () => {
    const container = document.getElementById('myfinance-container');
    if (container) {
      container.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6">
      <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Brand Identity */}
        <div className="flex items-center space-x-4 w-full md:w-1/3">
          <div className="w-16 h-16 bg-blue-900 text-white rounded-xl flex items-center justify-center shadow-sm font-extrabold text-xl flex-shrink-0">
            {(provider.name || 'PR').substring(0, 2).toUpperCase()}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{provider.name}</h3>
            <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
              {provider.technology_type || 'BROADBAND'}
            </span>
          </div>
        </div>

        {/* Middle: Provider Specs */}
        <div className="grid grid-cols-3 gap-4 w-full md:w-1/2 text-center md:text-left">
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase">Max Speed</p>
            <p className="text-lg font-extrabold text-blue-600">{provider.max_download_speed || 0} Mbps</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase">Coverage</p>
            <p className="text-lg font-bold text-gray-800">{provider.coverage_percentage || 0}%</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase">Starting At</p>
            <p className="text-lg font-bold text-gray-900">
              ${startingPrice}<span className="text-xs text-gray-500">/mo</span>
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-3 w-full md:w-auto">
          {provider.plans && provider.plans.length > 0 && (
            <button
              onClick={() => setShowPlans(!showPlans)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {showPlans ? 'Hide Plans ▲' : 'All Plans ▼'}
            </button>
          )}

          <button
            onClick={scrollToWidget}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm whitespace-nowrap"
          >
            Check Live Offers ⇡
          </button>
        </div>
      </div>

      {/* Expandable SEO Details */}
      {showPlans && provider.plans && provider.plans.length > 0 && (
        <div className="border-t border-gray-100 bg-gray-50 p-6 space-y-4">
          <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">
            Available {provider.name} Plans in {zipCode}
          </h4>

          {provider.plans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white p-5 rounded-lg border border-gray-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm"
            >
              <div>
                <h5 className="text-lg font-bold text-gray-900">{plan.name}</h5>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div>
                  <span className="text-gray-400 block text-xs uppercase">Speed</span>
                  <strong className="text-gray-900">{plan.speed || 'N/A'}</strong>
                </div>
                <div>
                  <span className="text-gray-400 block text-xs uppercase">Type</span>
                  <strong className="text-gray-900">{plan.connection_type || 'Broadband'}</strong>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <span className="text-2xl font-black text-gray-900">
                    ${Number(plan.price || 0).toFixed(2)}
                  </span>
                  <span className="text-xs text-gray-500 block">/mo*</span>
                </div>
                <button
                  onClick={scrollToWidget}
                  className="px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold rounded border border-blue-200 transition-colors"
                >
                  Select ⇡
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProviderCard;