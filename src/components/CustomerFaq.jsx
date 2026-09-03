import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export function CustomerFaq() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: "Is Home Tech Dealer Inc. really 100% free to use?",
      a: "Yes! Home Tech Dealer Inc. is completely free for homeowners, movers, and renters. We never charge any service fee, markup, or subscription. You pay the exact same carrier promotional pricing—with all introductory gift cards and installation discounts applied."
    },
    {
      q: "Why do I need to enter my street address?",
      a: "Internet availability changes from street to street. Even two houses next to each other might have different fiber or cable lines available. Entering your street address or zip code ensures you see 100% verified plans and true speeds available for your specific home."
    },
    {
      q: "What is the difference between Fiber and Cable internet?",
      a: "Fiber internet uses light signals through fiber optic cables to deliver equal download and upload speeds (called symmetrical speeds). Cable internet provides fast download speeds, but much slower upload speeds. For video calls, online gaming, and multi-user streaming, fiber is generally the superior choice."
    },
    {
      q: "Can I keep my current Wi-Fi router?",
      a: "In most cases, yes! You can use your own compatible Wi-Fi router or mesh network to avoid equipment fees. Additionally, many fiber providers now include modern Wi-Fi 6 gateways for $0/month as part of their promotional deals."
    },
    {
      q: "How quickly can a technician come out to set up my service?",
      a: "Most providers offer next-day or 48-hour professional installation windows. If your home has had service from that provider before, you may also qualify for a self-install kit shipped directly to your door."
    },
    {
      q: "Can I bundle phone or TV service to save money?",
      a: "Yes. Bundling home internet with an unlimited mobile line or live streaming TV service (like DIRECTV Stream) typically saves you between $25 and $40 per month compared to buying each service separately."
    }
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center pb-8 border-b border-slate-200">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-2">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Everything You Need to Know About Finding Home Internet
        </h2>
        <p className="mt-1 text-sm text-slate-600 max-w-xl mx-auto">
          Clear, straightforward answers to help you choose the right speed and set up your connection.
        </p>
      </div>

      <div className="mt-8 space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all ${
                isOpen ? 'bg-white border-blue-300 shadow-sm' : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-5 flex items-center justify-between text-left gap-4"
              >
                <span className="text-sm sm:text-base font-bold text-slate-900">
                  {faq.q}
                </span>
                <span className="p-1 rounded-lg bg-slate-100 text-slate-500 shrink-0">
                  {isOpen ? <ChevronUp className="w-4 h-4 text-blue-600" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
