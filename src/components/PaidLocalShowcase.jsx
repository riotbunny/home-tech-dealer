import React from 'react';

const LOGOS = [
  ['T-Mobile', '/tmobile-internet-authorized-retailer.png'],
  ['Spectrum', '/spectrum-logo.png'],
  ['AT&T', '/att-authorized-retailer.png'],
  ['Verizon', '/verizon-logo.png']
];

export function PaidLocalShowcase() {
  return <aside className="paid-showcase">
    <h2>Your next internet offer<br />starts with a call.</h2>
    <p>Ask about available promotions from leading providers—all in one conversation.</p>
    <div className="paid-showcase-logos">{LOGOS.map(([name, src]) => <div key={name}><img src={src} alt={name} width="140" height="48" /></div>)}</div>
    <p className="paid-small">Offers and availability vary by provider and address.</p>
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
