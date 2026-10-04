import React, { useEffect, useState } from 'react';
import { PhoneCall, Search } from 'lucide-react';
import { GoogleAddressAutocomplete } from './GoogleAddressAutocomplete';
import { DEFAULT_PHONE_NUMBER } from '../services/catalogService';

const PAID_LOCAL_TITLE = 'Internet Providers Near You | Check Availability | HomeTechDealer';
const PAID_LOCAL_DESCRIPTION = 'Compare internet providers, speeds and available plans at your address. Check availability online or call HomeTechDealer at 1-888-845-1912.';
const PAID_LOCAL_CANONICAL = 'https://www.hometechdealer.com/internet/local';

export function PaidInternetLandingPage({
  phoneNumber = DEFAULT_PHONE_NUMBER,
  onSearchAddress
}) {
  const [addressInput, setAddressInput] = useState('');
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
    if (addressInput.trim() && onSearchAddress) {
      onSearchAddress(addressInput.trim());
    }
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
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="w-full">
              <GoogleAddressAutocomplete
                value={addressInput}
                onChange={setAddressInput}
                onSelectAddress={(chosen) => {
                  setAddressInput(chosen);
                  if (onSearchAddress) onSearchAddress(chosen);
                }}
                placeholder="Enter your street address"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 text-sm font-extrabold text-white shadow-sm transition-colors hover:bg-blue-700"
            >
              <Search className="h-4 w-4" />
              <span>Check Availability</span>
            </button>
          </div>
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
