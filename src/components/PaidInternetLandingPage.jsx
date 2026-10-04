import React, { useEffect, useState } from 'react';
import { PhoneCall, Search } from 'lucide-react';
import { DEFAULT_PHONE_NUMBER } from '../services/catalogService';

const PAID_LOCAL_TITLE = 'Internet Providers Near You | Check Availability | HomeTechDealer';
const PAID_LOCAL_DESCRIPTION = 'Compare internet providers, speeds and available plans at your address. Check availability online or call HomeTechDealer at 1-888-845-1912.';
const PAID_LOCAL_CANONICAL = 'https://www.hometechdealer.com/internet/local';

export function PaidInternetLandingPage({
  phoneNumber = DEFAULT_PHONE_NUMBER
}) {
  const [streetAddress, setStreetAddress] = useState('');
  const [aptNumber, setAptNumber] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [submittedAddress, setSubmittedAddress] = useState(null);
  const telHref = `tel:${phoneNumber.replace(/\D/g, '')}`;

  useEffect(() => {
    const setMeta = (nameAttr, nameVal, content) => {
      let el = document.querySelector(`meta[${nameAttr}="${nameVal}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(nameAttr, nameVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    document.title = PAID_LOCAL_TITLE;
    setMeta('name', 'description', PAID_LOCAL_DESCRIPTION);
    setMeta('name', 'robots', 'noindex, follow');
    setMeta('property', 'og:title', PAID_LOCAL_TITLE);
    setMeta('property', 'og:description', PAID_LOCAL_DESCRIPTION);
    setMeta('property', 'og:url', PAID_LOCAL_CANONICAL);
    setMeta('name', 'twitter:title', PAID_LOCAL_TITLE);
    setMeta('name', 'twitter:description', PAID_LOCAL_DESCRIPTION);

    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', PAID_LOCAL_CANONICAL);

    document.getElementById('pseo-jsonld')?.remove();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!streetAddress.trim() || !zipCode.trim()) {
      return;
    }

    setSubmittedAddress({
      streetAddress: streetAddress.trim(),
      aptNumber: aptNumber.trim(),
      zipCode: zipCode.trim()
    });
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <section className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-bold uppercase tracking-wide text-emerald-700">
          <PhoneCall className="h-4 w-4" />
          <span>Call {phoneNumber}</span>
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Internet Providers Near You
        </h1>

        <p className="mt-4 max-w-2xl text-base font-medium leading-7 text-slate-600">
          Compare internet providers, speeds and available plans at your address. Check availability online or call HomeTechDealer at {phoneNumber}.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 w-full rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="grid gap-3 text-left sm:grid-cols-[minmax(0,1fr)_140px_130px]">
            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                Street address
              </span>
              <input
                type="text"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                placeholder="123 Main St"
                required
                autoComplete="street-address"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-semibold text-slate-900 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                Apt number
              </span>
              <input
                type="text"
                value={aptNumber}
                onChange={(e) => setAptNumber(e.target.value)}
                placeholder="Optional"
                autoComplete="address-line2"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-semibold text-slate-900 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                ZIP code
              </span>
              <input
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
                placeholder="78526"
                required
                inputMode="numeric"
                pattern="[0-9]{5}"
                autoComplete="postal-code"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-semibold text-slate-900 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
              />
            </label>
          </div>

          <div className="mt-4 flex justify-center">
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-extrabold text-white shadow-sm transition-colors hover:bg-blue-700 sm:w-auto"
            >
              <Search className="h-4 w-4" />
              <span>Check Availability</span>
            </button>
          </div>

          {submittedAddress && (
            <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-center text-sm font-bold text-emerald-800">
              Thanks. We will check availability for {submittedAddress.streetAddress}
              {submittedAddress.aptNumber ? `, ${submittedAddress.aptNumber}` : ''}, {submittedAddress.zipCode}.
            </div>
          )}
        </form>

        <a
          href={telHref}
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-extrabold text-white shadow-sm transition-colors hover:bg-emerald-700"
        >
          <PhoneCall className="h-4 w-4" />
          <span>Call {phoneNumber}</span>
        </a>
      </section>
    </main>
  );
}
