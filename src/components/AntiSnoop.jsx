import { useEffect, useRef, useState } from 'react';

export function AntiSnoop() {
  const [isWarningVisible, setIsWarningVisible] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(5);
  const redirectTimerRef = useRef(null);
  const countdownTimerRef = useRef(null);

  useEffect(() => {
    // DO NOT run AntiSnoop in local development so you can still use F12
    if (import.meta.env.DEV) {
      return;
    }

    if (window.location.hostname.toLowerCase() === 'promo.hometechdealer.com') {
      return;
    }

    const showWarningAndRedirect = () => {
      if (redirectTimerRef.current) {
        return;
      }

      setIsWarningVisible(true);
      setSecondsRemaining(5);

      countdownTimerRef.current = window.setInterval(() => {
        setSecondsRemaining((current) => Math.max(0, current - 1));
      }, 1000);

      redirectTimerRef.current = window.setTimeout(() => {
        window.location.assign('https://www.fbi.gov/');
      }, 5000);
    };

    // Prevent Right Click
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    // Prevent Keyboard Shortcuts (F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+C)
    const handleKeyDown = (e) => {
      // Allow Ctrl+C (copy) for legitimate users who might want to copy an address or phone number?
      // Actually, if we want to be strict, we block Ctrl+C too, but let's just block dev tools.
      
      // F12
      if (e.key === 'F12') {
        e.preventDefault();
        showWarningAndRedirect();
      }
      
      // Ctrl+Shift+I (Inspect)
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'i') {
        e.preventDefault();
        showWarningAndRedirect();
      }
      
      // Ctrl+Shift+J (Console)
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'j') {
        e.preventDefault();
        showWarningAndRedirect();
      }
      
      // Ctrl+U (View Source)
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        showWarningAndRedirect();
      }
      
      // Ctrl+S (Save Page)
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
      }
    };

    // Prevent Dragging Images
    const handleDragStart = (e) => {
      if (e.target.tagName === 'IMG') {
        e.preventDefault();
      }
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('dragstart', handleDragStart);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('dragstart', handleDragStart);
      window.clearTimeout(redirectTimerRef.current);
      window.clearInterval(countdownTimerRef.current);
    };
  }, []);

  if (!isWarningVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/95 px-4 text-white backdrop-blur-sm">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.22),transparent_58%)] animate-pulse" />
      <div className="relative max-w-3xl overflow-hidden rounded-[2rem] border border-red-500/40 bg-slate-950/90 p-5 shadow-2xl shadow-red-950/50">
        <img
          src="/no-no-warning.png"
          alt="No no warning"
          className="mx-auto w-full max-w-2xl animate-[snoop-wag_0.72s_ease-in-out_infinite]"
          draggable="false"
        />
        <div className="mt-4 rounded-2xl border border-red-500/30 bg-red-950/60 px-5 py-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-red-200">
            Developer tools detected
          </p>
          <p className="mt-2 text-sm font-semibold text-white sm:text-base">
            Redirecting to cyber headquarters in {secondsRemaining}...
          </p>
        </div>
      </div>
      <style>{`
        @keyframes snoop-wag {
          0%, 100% { transform: rotate(-1.2deg) scale(1); }
          50% { transform: rotate(1.2deg) scale(1.015); }
        }
      `}</style>
    </div>
  );
}
