import React from 'react';
import { X } from 'lucide-react';

// Catalog information is not a provider-issued FCC label.
export function FccBroadbandFactsModal({ isOpen, onClose, plan, provider }) {
  if (!isOpen || !plan || !provider) return null;
  const fields = [['Advertised monthly price', `$${plan.price}/mo`], ['Download speed', plan.downloadSpeed], ['Upload speed', plan.uploadSpeed], ['Contract terms', plan.contract], ['Equipment', plan.equipmentFee], ['Installation', plan.installationSla]];
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75">
    <section role="dialog" aria-modal="true" aria-labelledby="plan-summary-title" className="bg-white rounded-lg p-6 max-w-xl w-full max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-start gap-3">
        <div><p className="text-sm text-slate-600">{provider.name}</p><h2 id="plan-summary-title" className="font-bold text-xl">{plan.name}</h2></div>
        <button type="button" aria-label="Close plan details" onClick={onClose} className="p-3"><X size={20} /></button>
      </div>
      <p className="mt-4 text-sm text-slate-600">Catalog plan summary. Pricing, eligibility, fees and installation must be confirmed with the selected provider for your address.</p>
      <dl className="mt-5 divide-y divide-slate-200">{fields.map(([label, value]) => <div key={label} className="py-3 flex justify-between gap-4 text-sm"><dt className="text-slate-600">{label}</dt><dd className="font-semibold text-right">{value || 'Confirm with provider'}</dd></div>)}</dl>
      <p className="mt-5 text-sm text-slate-600">This summary is not an official Broadband Consumer Label. Request the provider's label to review regular and introductory pricing, additional charges and data policies before ordering.</p>
      <a href="https://www.fcc.gov/broadbandlabels" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-blue-700 underline">Learn about Broadband Consumer Labels from the FCC</a>
    </section>
  </div>;
}
