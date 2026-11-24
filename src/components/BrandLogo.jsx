import React from 'react';

export function BrandLogo({ className = '' }) {
  return <img src="/hometechdealer-logo.png" alt="HomeTechDealer" width="2172" height="724" className={`block h-12 w-[220px] max-w-full object-contain sm:h-14 sm:w-[280px] ${className}`} />;
}
