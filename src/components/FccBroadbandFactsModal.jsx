import React from 'react';
import { X, Printer, ExternalLink, ShieldCheck, FileText } from 'lucide-react';
import { generateFccBroadbandFacts } from '../data/fccBroadbandFactsData';

/**
 * FccBroadbandFactsModal
 * Renders the authentic, legally compliant FCC Broadband Consumer Facts Label.
 * Built to the exact specifications of the Federal Communications Commission (47 CFR § 8.1).
 */
export function FccBroadbandFactsModal({ isOpen, onClose, plan, provider, cityName }) {
  if (!isOpen || !plan || !provider) return null;

  const facts = generateFccBroadbandFacts(plan, provider, cityName);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-xl bg-white border border-slate-300 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]">
        
        {/* Top Tool Bar */}
        <div className="px-5 py-3 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold tracking-wide uppercase">
              Official FCC Consumer Disclosure
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              title="Print FCC Label"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Label Container */}
        <div className="p-4 sm:p-6 overflow-y-auto font-sans">
          
          {/* Authentic FCC Broadband Facts Card */}
          <div className="border-[3px] border-black p-4 sm:p-5 text-slate-900 bg-white shadow-xs">
            
            {/* Header Block */}
            <div className="border-b-[6px] border-black pb-2">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-none text-black">
                Broadband Facts
              </h2>
              <div className="text-base font-extrabold text-black mt-1">
                {facts.providerName}
              </div>
              <div className="text-sm font-semibold text-slate-700">
                {facts.serviceTierName} ({facts.technologyType})
              </div>
              <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                Label ID: {facts.uniqueIdentifier} &bull; {facts.verifiedLocation}
              </div>
            </div>

            {/* Monthly Price Section */}
            <div className="py-2.5 border-b-[4px] border-black flex items-baseline justify-between">
              <div>
                <span className="text-sm font-bold uppercase tracking-wider block">
                  Monthly Price
                </span>
                <span className="text-xs text-slate-600 font-medium">
                  {facts.contractTerm}
                </span>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-black">
                ${facts.monthlyBasePrice}
              </div>
            </div>

            {/* Introductory Rate Details */}
            <div className="py-2 border-b border-black text-xs space-y-1">
              <div className="flex justify-between font-medium">
                <span>Introductory Rate Duration:</span>
                <span className="font-bold">{facts.introductoryDuration}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Standard Monthly Rate After Promo:</span>
                <span className="font-bold">${facts.postIntroMonthlyPrice}</span>
              </div>
            </div>

            {/* Additional Charges & Fees Section */}
            <div className="pt-2 pb-1 border-b-[4px] border-black">
              <div className="text-xs font-black uppercase tracking-wider mb-1.5">
                Additional Charges &amp; Terms
              </div>
              <div className="text-xs space-y-1 divide-y divide-slate-200">
                <div className="flex justify-between py-1">
                  <span className="text-slate-700">Provider Equipment Fee:</span>
                  <span className="font-bold">{facts.equipmentRentalFee}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-700">One-Time Activation Fee:</span>
                  <span className="font-bold text-emerald-700">{facts.activationFee}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-700">Standard Professional Installation:</span>
                  <span className="font-bold text-emerald-700">{facts.standardInstallationFee}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-700">Early Termination Fee:</span>
                  <span className="font-bold">{facts.earlyTerminationFee}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-700">Estimated Government Taxes &amp; Fees:</span>
                  <span className="font-medium text-slate-600">{facts.governmentTaxesEstimated}</span>
                </div>
              </div>
            </div>

            {/* Discounts & Bundles */}
            <div className="py-2 border-b-[4px] border-black text-xs space-y-1">
              <div className="text-xs font-black uppercase tracking-wider mb-1">
                Discounts &amp; Bundling Options
              </div>
              <div className="flex items-start gap-1.5 text-slate-700">
                <span className="font-bold">&bull;</span>
                <span>{facts.autopayDiscount}</span>
              </div>
              <div className="flex items-start gap-1.5 text-slate-700">
                <span className="font-bold">&bull;</span>
                <span>{facts.mobileBundleDiscountAvailable}</span>
              </div>
            </div>

            {/* Speeds & Performance Provided Section */}
            <div className="pt-2 pb-1 border-b-[4px] border-black">
              <div className="text-xs font-black uppercase tracking-wider mb-1.5">
                Speeds Provided with Plan
              </div>
              <div className="text-xs space-y-1 divide-y divide-slate-200">
                <div className="flex justify-between py-1">
                  <span className="text-slate-700 font-medium">Typical Download Speed:</span>
                  <span className="font-black text-blue-700">{facts.typicalDownloadSpeed}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-700 font-medium">Typical Upload Speed:</span>
                  <span className="font-black text-slate-900">{facts.typicalUploadSpeed}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-700 font-medium">Typical Latency (Round-Trip Delay):</span>
                  <span className="font-bold text-slate-800">{facts.typicalLatencyMs}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-700 font-medium">Typical Packet Loss Rate:</span>
                  <span className="font-bold text-slate-800">{facts.typicalPacketLoss}</span>
                </div>
              </div>
            </div>

            {/* Data Limits */}
            <div className="py-2 border-b-[4px] border-black text-xs">
              <div className="text-xs font-black uppercase tracking-wider mb-1">
                Data Included with Monthly Plan
              </div>
              <div className="flex justify-between font-bold text-slate-900">
                <span>Monthly Data Cap:</span>
                <span className="text-emerald-700">{facts.dataAllowance}</span>
              </div>
              <div className="flex justify-between text-slate-600 mt-0.5">
                <span>Charges for Additional Data:</span>
                <span>{facts.overageCharges}</span>
              </div>
            </div>

            {/* Network Management & Support */}
            <div className="pt-2.5 space-y-1.5 text-[11px] text-slate-600">
              <div className="flex items-center justify-between">
                <span>Network Management Policy:</span>
                <a
                  href={facts.networkManagementUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-blue-700 hover:underline flex items-center gap-1"
                >
                  <span>View Policy</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span>Privacy &amp; Data Security Policy:</span>
                <a
                  href={facts.privacyPolicyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-blue-700 hover:underline flex items-center gap-1"
                >
                  <span>View Policy</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-slate-200">
                <span>FCC Consumer Complaint Center:</span>
                <a
                  href={facts.fccConsumerComplaintsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-slate-800 hover:underline"
                >
                  consumercomplaints.fcc.gov
                </a>
              </div>
            </div>

          </div>

          {/* Direct Verification Link to Carrier's Official Filing */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Direct ISP Regulatory Disclosure:</span>
            </div>
            <a
              href={facts.carrierFccDisclosurePortal}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-bold text-blue-700 hover:text-blue-800"
            >
              <span>{facts.providerName} Official FCC Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
