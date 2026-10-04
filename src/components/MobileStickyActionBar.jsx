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
    <div className="fixed inset-x-0 bottom-0 z-40 flex animate-fade-in items-center justify-between gap-2.5 border-t border-slate-200/90 bg-white/95 px-3.5 pb-[calc(env(safe-area-inset-bottom)+0.625rem)] pt-2.5 shadow-2xl backdrop-blur-md lg:hidden">
      {/* 1-Tap Direct Call-to-Order Hotline */}
      <a
        href={telHref}
        className="flex min-h-[46px] min-w-0 flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-3.5 py-2.5 text-xs font-extrabold text-white shadow-sm transition-all active:bg-emerald-700"
        title={`Call ${phoneNumber} to order`}
      >
        <PhoneCall className="w-4 h-4 text-emerald-100 shrink-0 animate-pulse" />
        <span className="truncate font-black">Call: {phoneNumber}</span>
      </a>

      {/* Dynamic Secondary Action */}
      {comparisonCartCount > 0 ? (
        <button
          type="button"
          onClick={onOpenCart}
          className="flex min-h-[46px] shrink-0 items-center justify-center gap-1.5 rounded-xl bg-amber-500 px-3 py-2.5 text-xs font-extrabold text-white shadow-sm transition-all active:bg-amber-600"
          title="Open Comparison Cart"
        >
          <Layers className="w-4 h-4 shrink-0" />
          <span className="hidden min-[380px]:inline">Compare ({comparisonCartCount})</span>
          <span className="min-[380px]:hidden">{comparisonCartCount}</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={onOpenSpeedQuiz}
          className="flex min-h-[46px] shrink-0 items-center justify-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50 px-3 py-2.5 text-xs font-bold text-indigo-700 transition-all active:bg-blue-100"
          title="Take Speed Matcher Quiz"
        >
          <Zap className="w-4 h-4 text-amber-500 shrink-0" />
          <span className="hidden min-[380px]:inline">Speed Quiz</span>
          <span className="min-[380px]:hidden">Quiz</span>
        </button>
      )}
    </div>
  );
}
