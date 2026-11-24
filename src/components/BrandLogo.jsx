import React from 'react';

export function BrandLogo({ className = '' }) {
  return <img src="/hometechdealer-logo.png" alt="HomeTechDealer" width="2160" height="720" className={`block h-10 w-[220px] max-w-full object-cover sm:h-12 sm:w-[280px] ${className}`} />;
}
