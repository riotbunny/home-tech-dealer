import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

const StickyMobileCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isZipFocused, setIsZipFocused] = useState(false);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      // Debounce scroll events for performance
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollY = window.scrollY;
        const isAtTop = scrollY < 10;
        const hasScrolled = scrollY > 120;
        
        // Show if scrolled enough and not at top, hide if zip is focused
        setIsVisible(hasScrolled && !isAtTop && !isZipFocused);
      }, 10);
    };

    const handleZipFocus = () => setIsZipFocused(true);
    const handleZipBlur = () => setIsZipFocused(false);

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Add focus/blur listeners for ZIP input
    const zipInput = document.querySelector('#zip-input') as HTMLInputElement;
    if (zipInput) {
      zipInput.addEventListener('focus', handleZipFocus);
      zipInput.addEventListener('blur', handleZipBlur);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
      if (zipInput) {
        zipInput.removeEventListener('focus', handleZipFocus);
        zipInput.removeEventListener('blur', handleZipBlur);
      }
    };
  }, [isZipFocused]);

  const handleClick = () => {
    // Fire analytics event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'sticky_cta_click', {
        event_category: 'engagement',
        event_label: 'mobile_sticky_bar'
      });
    }

    // Find and scroll to ZIP input
    const zipInput = document.querySelector('#zip-input') as HTMLInputElement;
    if (zipInput) {
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      zipInput.scrollIntoView({ 
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'center'
      });
      
      // Focus after scroll completes
      setTimeout(() => {
        zipInput.focus();
      }, prefersReducedMotion ? 0 : 500);
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Add bottom padding to page when CTA is visible */}
      <style>
        {`
          @media (max-width: 767px) {
            body {
              padding-bottom: 80px;
            }
          }
        `}
      </style>
      
      <div
        role="region"
        aria-label="Sticky action bar"
        className={`
          fixed bottom-0 left-0 right-0 z-50 md:hidden
          bg-white border-t border-gray-200 shadow-lg
          rounded-t-xl transition-all duration-300 ease-in-out
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}
        `}
        style={{
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          maxHeight: '64px'
        }}
        onClick={handleClick}
      >
        <div className="flex items-center justify-between px-4 py-3 h-16">
          {/* Left side - Trust copy */}
          <div className="flex-1">
            <p className="text-gray-700 font-medium text-sm leading-tight">
              Check plans in your area
            </p>
            <p className="text-gray-500 text-xs">
              Compare providers instantly
            </p>
          </div>
          
          {/* Right side - CTA Button */}
          <button
            aria-label="Check availability"
            className="
              bg-[#28A745] hover:bg-[#218838] text-white 
              px-4 py-2 rounded-lg font-semibold text-sm
              transition-all duration-200 transform active:scale-95
              shadow-md hover:shadow-lg
              flex items-center gap-1
              focus:outline-none focus:ring-2 focus:ring-[#28A745] focus:ring-offset-2
            "
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            Check Availability
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </>
  );
};

export default StickyMobileCTA;