import React, { useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle2, PhoneCall, Search, ShieldCheck, Sparkles, Wifi } from 'lucide-react';
import { PROVIDERS_CATALOG } from '../data/providersData';
import { DEFAULT_PHONE_NUMBER } from '../services/catalogService';
import { CarrierLogo } from './CarrierLogos';

const PAID_LOCAL_TITLE = 'Internet Providers Near You | Check Availability | HomeTechDealer';
const PAID_LOCAL_DESCRIPTION = 'Compare internet providers, speeds and available plans at your address. Check availability online or call HomeTechDealer at 1-888-845-1912.';
const PAID_LOCAL_CANONICAL = 'https://www.hometechdealer.com/internet/local';
const PAID_LOCAL_CARRIER_IDS = ['spectrum', 'att', 'verizon', 'tmobile', 'earthlink', 'frontier'];

export function PaidInternetLandingPage({
  phoneNumber = DEFAULT_PHONE_NUMBER
}) {
  const [streetAddress, setStreetAddress] = useState('');
  const [aptNumber, setAptNumber] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [submittedAddress, setSubmittedAddress] = useState(null);
  const telHref = `tel:${phoneNumber.replace(/\D/g, '')}`;
  const availableProviders = PAID_LOCAL_CARRIER_IDS
    .map((id) => PROVIDERS_CATALOG.find((provider) => provider.id === id))
    .filter(Boolean);

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

  if (submittedAddress) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-6xl">
          <button
            type="button"
            onClick={() => setSubmittedAddress(null)}
            className="mb-6 inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-extrabold text-slate-700 shadow-sm transition-colors hover:bg-slate-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Edit address
          </button>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-bold uppercase tracking-wide text-emerald-700">
                  <CheckCircle2 className="h-4 w-4" />
                  Address received
                </div>
                <h1 className="max-w-3xl text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                  Choose an internet carrier for your home
                </h1>
                <p className="mt-4 max-w-2xl text-base font-medium leading-7 text-slate-600">
                  Showing popular options for {submittedAddress.streetAddress}
                  {submittedAddress.aptNumber ? `, ${submittedAddress.aptNumber}` : ''}, ZIP {submittedAddress.zipCode}.
                </p>
              </div>

              <a
                href={telHref}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-extrabold text-white shadow-sm transition-colors hover:bg-emerald-700"
              >
                <PhoneCall className="h-4 w-4" />
                <span>Call {phoneNumber}</span>
              </a>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {availableProviders.map((provider, index) => {
              const plan = provider.plans?.find((item) => item.popular) || provider.plans?.[0] || {};
              const cardBadges = [
                plan.contract || 'No annual contract',
                plan.dataCap || 'Unlimited data',
                provider.installationSla || 'Fast setup'
              ].filter(Boolean).slice(0, 3);

              return (
                <article
                  key={provider.id}
                  className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/60"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 min-w-[120px] items-center">
                      <CarrierLogo
                        id={provider.id}
                        name={provider.name}
                        customUrl={provider.customLogo}
                        className="h-8 w-auto max-w-[120px] object-contain"
                      />
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-extrabold ${
                      index === 0
                        ? 'bg-blue-600 text-white'
                        : 'border border-emerald-200 bg-emerald-50 text-emerald-700'
                    }`}>
                      {index === 0 ? 'Top pick' : 'Available'}
                    </span>
                  </div>

                  <div className="mt-5">
                    <h2 className="text-xl font-extrabold text-slate-900">{provider.name}</h2>
                    <p className="mt-1 text-sm font-semibold text-slate-500">{provider.type}</p>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <div className="text-xs font-bold uppercase tracking-wide text-slate-500">Starting at</div>
                      <div className="mt-1 text-2xl font-black text-slate-900">
                        ${plan.price || 50}
                        <span className="text-sm font-extrabold text-slate-500">/mo</span>
                      </div>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <div className="text-xs font-bold uppercase tracking-wide text-slate-500">Speeds up to</div>
                      <div className="mt-1 text-lg font-black text-slate-900">{plan.downloadSpeed || '1000 Mbps'}</div>
                    </div>
                  </div>

                  <div className="mt-5 space-y-2">
                    {cardBadges.map((badge) => (
                      <div key={badge} className="flex items-start gap-2 text-sm font-semibold text-slate-600">
                        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                        <span>{badge}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-col gap-2 pt-2 sm:flex-row">
                    <a
                      href={telHref}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-extrabold text-white transition-colors hover:bg-blue-700"
                    >
                      <PhoneCall className="h-4 w-4" />
                      Call to order
                    </a>
                    <button
                      type="button"
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-extrabold text-slate-700 transition-colors hover:bg-slate-50"
                    >
                      <Sparkles className="h-4 w-4 text-blue-600" />
                      Select
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-6 rounded-3xl border border-blue-100 bg-blue-50 p-5 text-center">
            <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm">
              <Wifi className="h-5 w-5" />
            </div>
            <p className="text-sm font-bold text-slate-700">
              Availability and final pricing are confirmed at the exact service address. Call {phoneNumber} if you want help choosing the best fit.
            </p>
          </div>
        </section>
      </main>
    );
  }

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
