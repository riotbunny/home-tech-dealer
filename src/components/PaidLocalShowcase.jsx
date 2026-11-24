import React from 'react';

const LOGOS = [
  ['T-Mobile', '/tmobile-internet-authorized-retailer.png'],
  ['Spectrum', '/spectrum-logo.png'],
  ['AT&T', '/att-authorized-retailer.png'],
  ['Verizon', '/verizon-logo.png']
];

export function PaidLocalShowcase() {
  return <aside className="paid-showcase">
    <h2>Internet providers.<br />One place to call.</h2>
    <p>Call HomeTechDealer to discuss service, plan details and installation.</p>
    <div className="paid-showcase-logos">{LOGOS.map(([name, src]) => <div key={name}><img src={src} alt={name} width="140" height="48" /></div>)}</div>
    <p className="paid-small">Service and installation are subject to provider confirmation.</p>
  </aside>;
}

export function PaidLocalProviderBand() {
  return <div className="paid-provider-band">
    <div className="paid-inner">
      <p className="paid-eyebrow">Authorized dealer access</p>
      <div className="paid-band-logos">{LOGOS.slice(0, 3).map(([name, src]) => <div key={name}><img src={src} alt={name} width="140" height="48" /></div>)}</div>
      <p className="paid-small">Plus other leading providers. Availability varies by address.</p>
    </div>
  </div>;
}
