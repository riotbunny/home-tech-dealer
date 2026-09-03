import React, { useState, useEffect } from 'react';
import { PhoneCall, Layers, Zap } from 'lucide-react';
import { DEFAULT_PHONE_NUMBER } from '../services/catalogService';

/**
 * MobileStickyActionBar
 * High-conversion floating action bar optimized for smartphones and touch devices.
 * Stays docked at the bottom of the viewport for effortless 1-tap ordering and cart access.
 * Automatically hides when mobile virtual keyboard pops up to prevent obstructing typing or suggestions.
 */
export function MobileStickyActionBar({
  phoneNumber = DEFAULT_PHONE_NUMBER,
  comparisonCartCount = 0,
  onOpenCart,
  onOpenSpeedQuiz
}) {
  const telHref = `tel:${phoneNumber.replace(/\D/g, '')}`;
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.visualViewport) return;

    const handleResize = () => {
      // On mobile devices, virtual keyboards occupy 35%–55% of the screen
      const keyboardActive = window.visualViewport.height < window.innerHeight * 0.78;
      setIsKeyboardOpen(keyboardActive);
    };

    window.visualViewport.addEventListener('resize', handleResize);
    return () => window.visualViewport.removeEventListener('resize', handleResize);
  }, []);

  // Suppress bottom bar while keyboard is open to give 100% space to autocomplete suggestions
  if (isKeyboardOpen) return null;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-3.5 py-2.5 shadow-2xl flex items-center justify-between gap-2.5 animate-fade-in">
      {/* 1-Tap Direct Call-to-Order Hotline */}
      <a
        href={telHref}
        className="flex-1 min-h-[46px] px-3.5 py-2.5 rounded-xl bg-emerald-600 active:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
        title={`Call ${phoneNumber} to order`}
      >
        <PhoneCall className="w-4 h-4 text-emerald-100 shrink-0 animate-pulse" />
        <span className="truncate font-black">Call to Order: {phoneNumber}</span>
      </a>

      {/* Dynamic Secondary Action */}
      {comparisonCartCount > 0 ? (
        <button
          type="button"
          onClick={onOpenCart}
          className="min-h-[46px] px-3.5 py-2.5 rounded-xl bg-amber-500 active:bg-amber-600 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all shrink-0"
          title="Open Comparison Cart"
        >
          <Layers className="w-4 h-4 shrink-0" />
          <span>Compare ({comparisonCartCount})</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={onOpenSpeedQuiz}
          className="min-h-[46px] px-3 py-2.5 rounded-xl bg-blue-50 active:bg-blue-100 border border-blue-200 text-blue-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shrink-0"
          title="Take Speed Matcher Quiz"
        >
          <Zap className="w-4 h-4 text-amber-500 shrink-0" />
          <span>Speed Quiz</span>
        </button>
      )}
    </div>
  );
}
