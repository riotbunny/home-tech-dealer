import React from 'react';

export function BrandLogo({ className = '' }) {
  return <img src="/hometechdealer-logo.png" alt="HomeTechDealer" width="2172" height="724" className={`block h-14 w-[240px] max-w-full object-contain sm:h-16 sm:w-[300px] ${className}`} />;
}
