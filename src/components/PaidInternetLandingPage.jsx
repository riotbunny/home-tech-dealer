import React, { useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle2, Clock3, PhoneCall, Search, ShieldCheck, Wifi } from 'lucide-react';
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
      <main className="min-h-screen bg-slate-50 px-4 pb-28 pt-8 sm:px-6 lg:px-8 lg:pb-8">
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
                  Internet Options Found for Your Area
                </h1>
                <p className="mt-4 max-w-2xl text-base font-medium leading-7 text-slate-600">
                  Your location matches internet options in your area. Call to verify exact availability, speeds and current offers for your address.
                </p>
                <p className="mt-3 text-sm font-extrabold text-slate-500">
                  Checking options for ZIP {submittedAddress.zipCode}
                </p>
              </div>

              <a
                href={telHref}
                className="inline-flex flex-col items-center justify-center rounded-2xl bg-emerald-600 px-6 py-4 text-center text-white shadow-lg shadow-emerald-600/20 transition-colors hover:bg-emerald-700"
              >
                <span className="inline-flex items-center gap-2 text-base font-black">
                  <PhoneCall className="h-4 w-4" />
                  Verify Availability - Call {phoneNumber}
                </span>
                <span className="mt-1 text-xs font-bold text-emerald-100">
                  24/7 Internet Availability Desk
                </span>
              </a>
            </div>
          </div>

          <div className="mt-5 rounded-3xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="text-xs font-black uppercase tracking-wide text-emerald-700">
                  Found options in your area
                </div>
                <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-900">
                  Want to know exactly what's available at your address?
                </h2>
                <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-slate-600">
                  Call our Internet Availability Desk to verify service, speeds and current offers. Exact service, speeds and offers vary by address.
                </p>
                <p className="mt-2 text-xs font-extrabold uppercase tracking-wide text-emerald-700">
                  24/7 assistance - No obligation
                </p>
              </div>

              <a
                href={telHref}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-4 text-base font-black text-white shadow-lg shadow-emerald-600/20 transition-colors hover:bg-emerald-700"
              >
                <PhoneCall className="h-5 w-5" />
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
                      {index === 0 ? 'Top pick' : 'Area option'}
                    </span>
                  </div>

                  <div className="mt-5">
                    <h2 className="text-xl font-extrabold text-slate-900">{provider.name}</h2>
                    <p className="mt-1 text-sm font-semibold text-slate-500">{provider.type}</p>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <div className="text-xs font-bold uppercase tracking-wide text-slate-500">Plans may start around</div>
                      <div className="mt-1 text-2xl font-black text-slate-900">
                        ${plan.price || 50}
                        <span className="text-sm font-extrabold text-slate-500">/mo</span>
                      </div>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <div className="text-xs font-bold uppercase tracking-wide text-slate-500">Speeds offered up to</div>
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

                  <p className="mt-4 text-xs font-bold leading-5 text-slate-500">
                    Pricing, speeds and exact availability vary by address.
                  </p>

                  <div className="mt-6 pt-2">
                    <a
                      href={telHref}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-extrabold text-white transition-colors hover:bg-blue-700"
                    >
                      <PhoneCall className="h-4 w-4" />
                      Call to Check Availability
                    </a>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-6 rounded-3xl border border-blue-100 bg-blue-50 p-5 sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-slate-900">
                  Why verify by phone?
                </h2>
                <p className="mt-2 text-sm font-semibold text-slate-600">
                  Internet specialists are available 24/7 to help you check availability and compare your options.
                </p>
              </div>

              <a
                href={telHref}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white shadow-sm transition-colors hover:bg-blue-700"
              >
                <PhoneCall className="h-4 w-4" />
                <span>Call {phoneNumber}</span>
              </a>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="text-sm font-black text-slate-900">Exact Availability</div>
                <p className="mt-1 text-sm font-semibold leading-6 text-slate-600">
                  Confirm service options for your address.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="text-sm font-black text-slate-900">Current Offers</div>
                <p className="mt-1 text-sm font-semibold leading-6 text-slate-600">
                  Ask about current plans, pricing and promotions.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="text-sm font-black text-slate-900">Setup Options</div>
                <p className="mt-1 text-sm font-semibold leading-6 text-slate-600">
                  Get help understanding installation and equipment options.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-emerald-200 bg-white/95 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 shadow-2xl shadow-slate-900/15 backdrop-blur lg:hidden">
          <div className="mx-auto max-w-md">
            <div className="mb-2 text-center text-xs font-extrabold uppercase tracking-wide text-emerald-700">
              Available 24/7
            </div>
            <a
              href={telHref}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-4 text-base font-black text-white shadow-lg shadow-emerald-600/20"
            >
              <PhoneCall className="h-5 w-5" />
              <span>Call to Verify Availability</span>
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-5 sm:px-6 lg:px-8">
      <header className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white px-4 py-3 shadow-sm sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
            <Wifi className="h-5 w-5" />
          </div>
          <div>
            <div className="text-lg font-black tracking-tight text-slate-900">
              HomeTechDealer
            </div>
            <div className="text-xs font-bold uppercase tracking-wide text-slate-500">
              Internet availability desk
            </div>
          </div>
        </div>

        <a
          href={telHref}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 py-2.5 text-sm font-extrabold text-white shadow-sm transition-colors hover:bg-emerald-700"
        >
          <PhoneCall className="h-4 w-4" />
          <span className="hidden sm:inline">Call {phoneNumber}</span>
          <span className="sm:hidden">Call</span>
        </a>
      </header>

      <section className="mx-auto grid max-w-6xl gap-8 py-10 lg:grid-cols-[minmax(0,1fr)_460px] lg:items-center lg:py-16">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-wide text-blue-700">
            <ShieldCheck className="h-4 w-4" />
            <span>Internet availability check</span>
          </div>

          <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            See Which Internet Options Are Available Near You
          </h1>

          <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-slate-600 sm:text-lg">
            Enter your address to see internet options, speeds and offers in your area. It only takes a few seconds.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
              <span className="text-sm font-extrabold text-slate-700">Free to check</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <Clock3 className="h-5 w-5 shrink-0 text-blue-600" />
              <span className="text-sm font-extrabold text-slate-700">Takes less than a minute</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-indigo-600" />
              <span className="text-sm font-extrabold text-slate-700">No obligation</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="w-full rounded-3xl border border-blue-100 bg-white p-5 shadow-2xl shadow-blue-100/80 sm:p-6">
          <div className="mb-5">
            <h2 className="text-2xl font-black tracking-tight text-slate-900">
              See Your Internet Options
            </h2>
            <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
              Enter your service address to get started.
            </p>
            <div className="mt-3 text-xs font-extrabold text-emerald-700">
              <span>✓ Free</span>
              <span className="mx-2 text-slate-300">•</span>
              <span>✓ No obligation</span>
            </div>
          </div>

          <div className="grid gap-4 text-left">
            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                Street address *
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

            <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_150px]">
              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                  Apt / Unit
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
                  ZIP code *
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
          </div>

          <div className="mt-5">
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 text-base font-extrabold text-white shadow-lg shadow-blue-600/20 transition-colors hover:bg-blue-700"
            >
              <Search className="h-4 w-4" />
              <span>Show My Internet Options →</span>
            </button>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-center text-xs font-bold text-slate-500">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>We'll use your ZIP code to identify internet options in your area.</span>
          </div>

          {submittedAddress && (
            <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-center text-sm font-bold text-emerald-800">
              Thanks. We will check availability for {submittedAddress.streetAddress}
              {submittedAddress.aptNumber ? `, ${submittedAddress.aptNumber}` : ''}, {submittedAddress.zipCode}.
            </div>
          )}
        </form>
      </section>

      <section className="mx-auto max-w-6xl border-t border-slate-200 py-6">
        <div className="flex flex-wrap items-center justify-center gap-5 text-sm font-extrabold text-slate-500">
          <span>Compare leading providers</span>
          <span className="h-1 w-1 rounded-full bg-slate-300" />
          <span>Options for your area</span>
          <span className="h-1 w-1 rounded-full bg-slate-300" />
          <span>Help available 24/7</span>
        </div>
      </section>
    </main>
  );
}
