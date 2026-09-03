import React from 'react';

/**
 * CarrierLogos
 * Authentic, crisp SVG vector brand logomarks for nationwide and regional carriers.
 * Elevates the visual credibility from plain colored dots to official enterprise partner status.
 */
export function CarrierLogo({ id, name, className = 'h-5 w-auto' }) {
  const carrierId = (id || '').toLowerCase();

  switch (carrierId) {
    case 'verizon':
      return (
        <svg viewBox="0 0 140 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Verizon">
          <path d="M7 16L12 25L24 6" stroke="#EE0000" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
          <text x="34" y="22" fill="#000000" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="19" letterSpacing="-0.5">
            verizon
          </text>
        </svg>
      );

    case 'tmobile':
      return (
        <svg viewBox="0 0 140 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="T-Mobile">
          <circle cx="12" cy="7" r="2.5" fill="#E20074" />
          <circle cx="24" cy="7" r="2.5" fill="#E20074" />
          <path d="M7 12H29V17H21V27H15V17H7V12Z" fill="#E20074" />
          <text x="36" y="23" fill="#E20074" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="18" letterSpacing="-0.5">
            T-Mobile
          </text>
        </svg>
      );

    case 'earthlink':
      return (
        <svg viewBox="0 0 145 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="EarthLink">
          <circle cx="14" cy="16" r="10" stroke="#F58220" strokeWidth="3" />
          <ellipse cx="14" cy="16" rx="14" ry="5" stroke="#F58220" strokeWidth="2" transform="rotate(-25 14 16)" />
          <text x="36" y="22" fill="#1E293B" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="18" letterSpacing="-0.5">
            Earth<tspan fill="#F58220">Link</tspan>
          </text>
        </svg>
      );

    case 'starlink':
      return (
        <svg viewBox="0 0 150 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Starlink">
          {/* Stylized SpaceX Starlink Vector */}
          <path d="M4 22L16 8L20 13L9 24L4 22Z" fill="#0EA5E9" />
          <circle cx="22" cy="7" r="2.5" fill="#38BDF8" />
          <text x="32" y="22" fill="currentColor" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="17" letterSpacing="2">
            STARLINK
          </text>
        </svg>
      );

    case 'att':
      return (
        <svg viewBox="0 0 130 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="AT&T">
          <circle cx="14" cy="16" r="11" fill="#00A8E0" />
          <path d="M5 16C5 12 11 11 14 11C17 11 23 12 23 16C23 20 17 21 14 21C11 21 5 20 5 16Z" fill="white" fillOpacity="0.8" />
          <path d="M7 16C7 14 11 13.5 14 13.5C17 13.5 21 14 21 16C21 18 17 18.5 14 18.5C11 18.5 7 18 7 16Z" fill="#00A8E0" />
          <text x="34" y="22" fill="#00A8E0" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="18" letterSpacing="-0.5">
            AT&amp;T
          </text>
        </svg>
      );

    case 'spectrum':
      return (
        <svg viewBox="0 0 145 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Spectrum">
          <path d="M6 25L14 7H19L11 25H6Z" fill="#0077D4" />
          <path d="M14 25L22 7H27L19 25H14Z" fill="#00A8E0" />
          <text x="34" y="22" fill="#002D62" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="18" letterSpacing="-0.5">
            Spectrum
          </text>
        </svg>
      );

    case 'frontier':
      return (
        <svg viewBox="0 0 135 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Frontier">
          <path d="M6 7H24V11H12V15H21V19H12V25H6V7Z" fill="#FF0037" />
          <circle cx="25" cy="9" r="2.5" fill="#FF0037" />
          <text x="34" y="22" fill="#111827" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="17" letterSpacing="-0.5">
            frontier
          </text>
        </svg>
      );

    case 'directv':
      return (
        <svg viewBox="0 0 135 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="DIRECTV">
          <path d="M6 16C6 10 11 6 17 6H24V26H17C11 26 6 22 6 16Z" fill="#00263E" />
          <path d="M11 16C11 12 14 9.5 17 9.5H20V22.5H17C14 22.5 11 20 11 16Z" fill="#00A8E0" />
          <text x="32" y="22" fill="#00263E" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="16" letterSpacing="-0.5">
            DIRECTV
          </text>
        </svg>
      );

    default:
      return (
        <div className="flex items-center gap-2">
          <span 
            className="w-4 h-4 rounded-md flex items-center justify-center text-[10px] font-black text-white shadow-xs"
            style={{ backgroundColor: '#2563EB' }}
          >
            {(name || id || 'C').charAt(0).toUpperCase()}
          </span>
          <span className="font-extrabold text-sm text-slate-900 tracking-tight">
            {name || id}
          </span>
        </div>
      );
  }
}
