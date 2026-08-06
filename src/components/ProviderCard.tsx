import React, { useState } from 'react';

export interface ProviderCoverage {
  id: string;
  name: string;
  logo_url?: string;
  phone_number?: string;
  technology_type?: string;
  max_download_speed: number;
  coverage_percentage: number;
  starting_price: number;
}

interface ProviderCardProps {
  provider: ProviderCoverage;
  zipCode: string;
}

export const ProviderCard: React.FC<ProviderCardProps> = ({ provider, zipCode }) => {
  const [imgError, setImgError] = useState(false);

  const displayPhone = provider.phone_number || '855-838-8959';
  const rawPhone = displayPhone.replace(/\D/g, '');

  const techLabel =
    provider.technology_type ||
    (provider.name.toLowerCase().includes('fiber') ? 'FIBER INTERNET' : 'CABLE INTERNET');

  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow gap-4 mb-4">
      <div className="flex items-center space-x-4 w-full md:w-1/3">
        <div className="w-16 h-16 flex items-center justify-center bg-gray-50 rounded-lg p-2 border border-gray-100 flex-shrink-0">
          {!imgError && provider.logo_url ? (
            <img
              src={provider.logo_url}
              alt={`${provider.name} logo`}
              className="max-h-full max-w-full object-contain"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-lg flex items-center justify-center">
              {provider.name.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">{provider.name}</h3>
          <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
            {techLabel}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 w-full md:w-1/2 text-center md:text-left">
        <div>
          <p className="text-xs text-gray-500 font-medium uppercase">Max Speed</p>
          <p className="text-lg font-extrabold text-blue-600">{provider.max_download_speed} Mbps</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 font-medium uppercase">Coverage</p>
          <p className="text-lg font-bold text-gray-800">{provider.coverage_percentage}%</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 font-medium uppercase">Starting At</p>
          <p className="text-lg font-bold text-gray-900">
            ${provider.starting_price.toFixed(2)}<span className="text-xs text-gray-500 font-normal">/mo</span>
          </p>
        </div>
      </div>

      <div className="w-full md:w-auto flex-shrink-0">
        <a
          href={`tel:${rawPhone}`}
          className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-sm"
        >
          Call {displayPhone}
        </a>
      </div>
    </div>
  );
};