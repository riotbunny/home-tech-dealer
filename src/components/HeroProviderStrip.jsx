import React, { useState } from 'react';
import { Pause, Play } from 'lucide-react';
import './providerCarousel.css';

const PROVIDERS = [
  ['T-Mobile Internet', '/tmobile-internet-authorized-retailer.png'],
  ['Spectrum', '/spectrum-logo.png'],
  ['AT&T', '/att-authorized-retailer.png'],
  ['Verizon', '/verizon-logo.png'],
  ['EarthLink', '/earthlink-logo.png'],
  ['Frontier', '/frontier-verizon-company-logo.png']
];

export function HeroProviderStrip() {
  const [paused, setPaused] = useState(false);
  return (
    <div className="provider-strip mt-6 border-y border-blue-100 bg-blue-50/70 px-3 py-4 text-left sm:px-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase text-blue-900">Authorized dealer access to leading internet providers</p>
        <button type="button" onClick={() => setPaused(!paused)} aria-label={paused ? 'Play provider carousel' : 'Pause provider carousel'} title={paused ? 'Play provider carousel' : 'Pause provider carousel'} className="provider-carousel-control flex h-11 w-11 shrink-0 items-center justify-center text-blue-800 hover:bg-blue-100">
          {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
        </button>
      </div>
      <div className="provider-carousel mt-3" aria-label="Internet providers" data-paused={paused}>
        <div className="provider-carousel-track">
          {[0, 1].map((copy) => <div className="provider-carousel-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
            {PROVIDERS.map(([name, src]) => (
              <div key={name} className="provider-carousel-logo">
                <img src={src} alt={copy === 0 ? name : ''} width="140" height="48" />
              </div>
            ))}
          </div>)}
        </div>
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-600">Provider availability and plan details vary by address.</p>
    </div>
  );
}
