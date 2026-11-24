import React from 'react';

export function HeroSteps() {
  return (
    <aside className="border-t-4 border-blue-600 bg-slate-50 px-5 py-5 sm:px-7 sm:py-7">
      <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">One call. Three simple steps.</h2>
      <ol className="mt-4 space-y-3 text-sm leading-6 text-slate-600 sm:space-y-5 sm:text-base">
        <li><strong className="block text-slate-900">1. Check your address</strong>Confirm which services may be available.</li>
        <li><strong className="block text-slate-900">2. Review the details</strong>Discuss pricing, speeds and plan terms.</li>
        <li><strong className="block text-slate-900">3. Plan your installation</strong>Ask about installation dates and equipment.</li>
      </ol>
    </aside>
  );
}
