import React from 'react';

const PROVIDERS = [
  ['T-Mobile Internet', '/tmobile-internet-authorized-retailer.png'],
  ['Spectrum', '/spectrum-logo.png'],
  ['AT&T', '/att-authorized-retailer.png'],
  ['Verizon', '/verizon-logo.png'],
  ['EarthLink', '/earthlink-logo.png'],
  ['Frontier', '/frontier-verizon-company-logo.png']
];

export function HeroProviderStrip() {
  return (
    <div className="mt-6 border-y border-blue-100 bg-blue-50/70 px-3 py-4 text-left sm:px-4">
      <p className="text-xs font-bold uppercase text-blue-900">Authorized dealer access to leading internet providers</p>
      <div className="mt-3 grid grid-cols-3 gap-x-3 gap-y-2 sm:grid-cols-6" aria-label="Internet providers">
        {PROVIDERS.map(([name, src]) => (
          <div key={name} className="flex h-12 min-w-0 items-center justify-center bg-white px-2">
            <img src={src} alt={name} width="140" height="48" className="max-h-8 w-full object-contain" />
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-600">Provider availability and plan details vary by address.</p>
    </div>
  );
}
