import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, CheckCircle2, Clock3, PhoneCall, Search, ShieldCheck, Wifi } from 'lucide-react';
import { PROVIDERS_CATALOG } from '../data/providersData';
import { DEFAULT_PHONE_NUMBER } from '../services/catalogService';
import { CarrierLogo } from './CarrierLogos';

const PAID_LOCAL_TITLE = 'Internet Providers Near You | Check Availability | HomeTechDealer';
const PAID_LOCAL_DESCRIPTION = 'Compare internet providers, speeds and available plans at your address. Check availability online or call HomeTechDealer at 1-888-845-1912.';
const PAID_LOCAL_CANONICAL = 'https://www.hometechdealer.com/internet/local';
const PPC_PHONE_DISPLAY = '1-888-845-1912';
const PPC_PHONE_TEL = '18888451912';
const PAID_LOCAL_CARRIER_IDS = ['tmobile', 'spectrum', 'att', 'verizon', 'earthlink', 'frontier'];
const PAID_LOCAL_LOGOS = {
  tmobile: {
    src: '/tmobile-internet-authorized-retailer.png',
    alt: 'T-Mobile Internet Authorized Retailer',
    className: 'h-10 w-auto max-w-[150px] object-contain'
  },
  spectrum: {
    src: '/spectrum-logo.png',
    alt: 'Spectrum',
    className: 'h-8 w-auto max-w-[150px] object-contain'
  },
  att: {
    src: '/att-authorized-retailer.png',
    alt: 'AT&T Authorized Retailer',
    className: 'h-11 w-auto max-w-[160px] object-contain'
  },
  verizon: {
    src: '/verizon-logo.png',
    alt: 'Verizon',
    className: 'h-10 w-auto max-w-[150px] object-contain'
  },
  earthlink: {
    src: '/earthlink-logo.png',
    alt: 'EarthLink',
    className: 'h-10 w-auto max-w-[160px] object-contain'
  },
  frontier: {
    src: '/frontier-verizon-company-logo.png',
    alt: 'Frontier, a Verizon company',
    className: 'h-10 w-auto max-w-[160px] object-contain'
  }
};

function trackPaidLocalEvent(eventName) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', eventName, {
    event_category: 'paid_local_funnel',
    page_path: '/internet/local',
    transport_type: 'beacon'
  });
}

function PaidLocalFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white px-4 py-8 text-xs text-slate-500 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-3 leading-relaxed">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-bold text-slate-600">
          <a href="/terms" className="transition-colors hover:text-emerald-700">
            Terms of Service
          </a>
          <a href="/privacy" className="transition-colors hover:text-emerald-700">
            Privacy Policy
          </a>
          <a href="/disclaimers" className="transition-colors hover:text-emerald-700">
            Disclaimers
          </a>
        </div>
        <p id="paid-local-terms">
          Home Tech Dealer Inc. is an independent consumer comparison marketplace. Pricing, gift cards, promotional offers, plan details, speeds, installation options and technician availability are subject to carrier confirmation at your specific service address.
        </p>
        <p id="paid-local-privacy">
          Privacy Policy: information entered in this funnel is used to help identify internet options for your location and connect you with availability support. Do not submit information you do not want used for service availability review.
        </p>
        <p id="paid-local-disclaimers">
          Trademarks: Verizon, T-Mobile, EarthLink, Starlink, AT&amp;T, Spectrum, Xfinity (Comcast), Frontier, Cox, Optimum, Ziply, DIRECTV, Mediacom, Astound, Kinetic, Metronet, Breezeline, TDS, WOW!, Clearwave, Altafiber, Buckeye, Bend, Hawaiian Telcom, Consolidated (Fidium), SmithVille, and ViaSat are registered trademarks of their respective owners.
        </p>
        <div className="pt-2 text-slate-400">
          &copy; 2026 Home Tech Dealer Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export function PaidInternetLandingPage({
  phoneNumber = DEFAULT_PHONE_NUMBER
}) {
  const [streetAddress, setStreetAddress] = useState('');
  const [aptNumber, setAptNumber] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [submittedAddress, setSubmittedAddress] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasTrackedFormStartRef = useRef(false);
  const telHref = `tel:${PPC_PHONE_TEL}`;
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
    trackPaidLocalEvent('ppc_local_landing_view');
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.__applyGooglePhoneConversionNumber === 'function') {
      window.__applyGooglePhoneConversionNumber();
    }
  }, [submittedAddress]);

  const trackFormStarted = () => {
    if (hasTrackedFormStartRef.current) return;
    hasTrackedFormStartRef.current = true;
    trackPaidLocalEvent('ppc_local_address_form_started');
  };

  const updateField = (field, value) => {
    trackFormStarted();
    if (field === 'streetAddress') {
      setStreetAddress(value);
    } else if (field === 'aptNumber') {
      setAptNumber(value);
    } else if (field === 'zipCode') {
      setZipCode(value.replace(/\D/g, '').slice(0, 5));
    }

    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleHeaderPhoneClick = () => {
    trackPaidLocalEvent('ppc_local_header_phone_clicked');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = {};

    if (!streetAddress.trim()) {
      nextErrors.streetAddress = 'Enter your street address.';
    }

    if (!/^\d{5}$/.test(zipCode.trim())) {
      nextErrors.zipCode = 'Enter a valid 5-digit ZIP code.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    trackPaidLocalEvent('ppc_local_address_form_submitted');

    window.requestAnimationFrame(() => {
      setSubmittedAddress({
        streetAddress: streetAddress.trim(),
        aptNumber: aptNumber.trim(),
        zipCode: zipCode.trim()
      });
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  if (submittedAddress) {
    return (
      <main className="min-h-screen bg-slate-50 pb-28 lg:pb-0">
        <section className="mx-auto max-w-6xl px-4 pt-5 sm:px-6 sm:pt-8 lg:px-8 lg:pb-8">
          <button
            type="button"
            onClick={() => setSubmittedAddress(null)}
            className="mb-5 inline-flex min-h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-extrabold text-slate-700 shadow-sm transition-colors hover:bg-slate-100 sm:mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Edit address
          </button>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:rounded-[2rem] sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-bold uppercase tracking-wide text-emerald-700">
                  <CheckCircle2 className="h-4 w-4" />
                  Address received
                </div>
                <h1 className="max-w-3xl text-[2rem] font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
                  {submittedAddress.zipCode
                    ? `Internet Options Found Near ${submittedAddress.zipCode}`
                    : 'Internet Options Found Near You'}
                </h1>
                <p className="mt-4 max-w-2xl text-base font-medium leading-7 text-slate-600">
                  Availability, pricing, and installation dates can vary by exact address. Call now to confirm your best option with a live specialist.
                </p>
              </div>

              <a
                href={telHref}
                className="js-google-phone-link inline-flex w-full flex-col items-center justify-center rounded-2xl bg-emerald-600 px-6 py-4 text-center text-white shadow-lg shadow-emerald-600/20 transition-colors hover:bg-emerald-700 sm:w-auto"
              >
                <span className="inline-flex items-center gap-2 text-base font-black">
                  <PhoneCall className="h-4 w-4" />
                  Call Now to Confirm My Best Plan
                </span>
                <span className="mt-1 text-xs font-bold text-emerald-100">
                  24/7 Internet Availability Desk
                </span>
              </a>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {availableProviders.map((provider, index) => {
              const plan = provider.plans?.find((item) => item.popular) || provider.plans?.[0] || {};
              const isRecommendedProvider = provider.id === 'tmobile';
              const displaySpeed = provider.id === 'tmobile' || provider.id === 'verizon'
                ? (plan.downloadSpeed || '1000 Mbps')
                : '2 Gbps';
              const displayPrice = isRecommendedProvider ? 35 : (plan.price || 50);
              const paidLocalLogo = PAID_LOCAL_LOGOS[provider.id];
              const cardBadges = [
                ...(isRecommendedProvider ? ['EASY APPROVAL'] : []),
                plan.contract || 'No annual contract',
                plan.dataCap || 'Unlimited data',
                provider.installationSla || 'Fast setup'
              ].filter(Boolean).slice(0, 3);

              return (
                <article
                  key={provider.id}
                  className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/60 sm:p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 min-w-[120px] items-center">
                      {paidLocalLogo ? (
                        <img
                          src={paidLocalLogo.src}
                          alt={paidLocalLogo.alt}
                          className={paidLocalLogo.className}
                        />
                      ) : (
                        <CarrierLogo
                          id={provider.id}
                          name={provider.name}
                          customUrl={provider.customLogo}
                          className="h-8 w-auto max-w-[120px] object-contain"
                        />
                      )}
                    </div>
                    <span className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-extrabold sm:text-xs ${
                      index === 0
                        ? 'bg-amber-400 text-slate-950'
                        : 'border border-emerald-200 bg-emerald-50 text-emerald-700'
                    }`}>
                      {isRecommendedProvider ? 'Recommended for you' : 'Area option'}
                    </span>
                  </div>

                  <div className="mt-5">
                    <h2 className="text-xl font-extrabold text-slate-900">{provider.name}</h2>
                    <p className="mt-1 text-sm font-semibold text-slate-500">{provider.type}</p>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-slate-50 p-3 sm:p-4">
                      <div className="text-xs font-bold uppercase tracking-wide text-slate-500">Plans may start around</div>
                      <div className="mt-1 text-2xl font-black text-slate-900">
                        ${displayPrice}
                        <span className="text-sm font-extrabold text-slate-500">/mo</span>
                      </div>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-3 sm:p-4">
                      <div className="text-xs font-bold uppercase tracking-wide text-slate-500">Speeds offered up to</div>
                      <div className="mt-1 text-lg font-black text-slate-900">{displaySpeed}</div>
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
                    Call to confirm this option for your address.
                  </p>

                  <div className="mt-6 pt-2">
                    <a
                      href={telHref}
                      className="js-google-phone-link inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-extrabold text-white shadow-lg shadow-emerald-600/20 transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-600/20 active:scale-[0.99]"
                    >
                      <PhoneCall className="h-4 w-4" />
                      <span className="hidden sm:inline">Call to Confirm This Plan</span>
                      <span className="sm:hidden">Call to Confirm</span>
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
                  Why Call to Confirm?
                </h2>
                <p className="mt-2 text-sm font-semibold text-slate-600">
                  A live specialist can help confirm address-specific availability, pricing and installation timing.
                </p>
              </div>

              <a
                href={telHref}
                className="js-google-phone-link inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-emerald-600/20 transition-colors hover:bg-emerald-700 sm:w-auto"
              >
                <PhoneCall className="h-4 w-4" />
                <span>Call Now to Confirm My Best Plan</span>
              </a>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="text-sm font-black text-slate-900">Exact Availability</div>
                <p className="mt-1 text-sm font-semibold leading-6 text-slate-600">
                  Confirm service options for your specific address.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="text-sm font-black text-slate-900">Current Offers</div>
                <p className="mt-1 text-sm font-semibold leading-6 text-slate-600">
                  Ask about current plans, pricing, and promotions.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="text-sm font-black text-slate-900">Install Timing</div>
                <p className="mt-1 text-sm font-semibold leading-6 text-slate-600">
                  Check available installation dates and equipment options.
                </p>
              </div>
            </div>
          </div>

          <p className="mt-5 text-center text-xs font-semibold leading-5 text-slate-500">
            Availability, plan details, pricing, promotions, installation options and speeds are subject to carrier confirmation and may vary by service address. HomeTechDealer helps compare options but cannot guarantee that a specific carrier, plan or offer will be available at every location.
          </p>

          <div className="mt-4 text-center">
            <a
              href={telHref}
              className="js-google-phone-link inline-flex items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-500 shadow-sm transition-colors hover:border-emerald-200 hover:text-emerald-700"
            >
              <PhoneCall className="h-3.5 w-3.5 text-emerald-600" />
              <span>Prefer to call directly? <span className="js-google-phone-number">{PPC_PHONE_DISPLAY}</span></span>
            </a>
          </div>
        </section>
        <PaidLocalFooter />

        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-emerald-200 bg-white/95 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 shadow-2xl shadow-slate-900/15 backdrop-blur lg:hidden">
          <div className="mx-auto max-w-md">
            <div className="mb-2 text-center text-xs font-extrabold uppercase tracking-wide text-emerald-700">
              Available 24/7
            </div>
            <a
              href={telHref}
              className="js-google-phone-link flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-4 text-base font-black text-white shadow-lg shadow-emerald-600/20"
            >
              <PhoneCall className="h-5 w-5" />
              <span>Tap to Call - Check Availability</span>
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 pb-28 lg:pb-0">
      <div className="px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
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
          onClick={handleHeaderPhoneClick}
          aria-label={`Call HomeTechDealer at ${PPC_PHONE_DISPLAY}`}
          className="js-google-phone-link inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-emerald-600/20 transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-600/20 active:scale-[0.99]"
        >
          <PhoneCall className="h-4 w-4" />
          <span>Call Now</span>
        </a>
      </header>

      <section className="mx-auto grid max-w-6xl gap-7 py-8 lg:grid-cols-[minmax(0,1fr)_460px] lg:items-center lg:py-14">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-wide text-blue-700">
            <ShieldCheck className="h-4 w-4" />
            <span>Internet availability check</span>
          </div>

          <h1 className="max-w-3xl text-[2.45rem] font-black leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Find Internet Available at Your Address
          </h1>

          <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-slate-600 sm:text-lg">
            Call now to confirm plans, pricing, speeds, and installation times for your home. Or enter your address to start a quick availability check.
          </p>

          <div className="mt-6">
            <a
              href={telHref}
              onClick={handleHeaderPhoneClick}
              className="js-google-phone-link inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-4 text-base font-black text-white shadow-xl shadow-emerald-600/20 transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-600/20 active:scale-[0.99] sm:w-auto"
            >
              <PhoneCall className="h-5 w-5" />
              <span>Call Now to Check Availability</span>
            </a>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
              <span className="text-sm font-extrabold text-slate-700">Free to check</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
              <span className="text-sm font-extrabold text-slate-700">No obligation</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <ShieldCheck className="h-5 w-5 shrink-0 text-blue-600" />
              <span className="text-sm font-extrabold text-slate-700">Exact-address lookup</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <Clock3 className="h-5 w-5 shrink-0 text-indigo-600" />
              <span className="text-sm font-extrabold text-slate-700">Live help available</span>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-black uppercase tracking-wide text-slate-500">
              Compare availability from leading internet providers
            </div>
            <div className="mt-3 grid grid-cols-3 items-center gap-3 sm:grid-cols-6">
              {availableProviders.map((provider) => {
                const paidLocalLogo = PAID_LOCAL_LOGOS[provider.id];
                return (
                  <div key={provider.id} className="flex h-10 items-center justify-center rounded-xl bg-slate-50 px-2">
                    {paidLocalLogo ? (
                      <img
                        src={paidLocalLogo.src}
                        alt={paidLocalLogo.alt}
                        className="max-h-7 max-w-full object-contain"
                      />
                    ) : (
                      <CarrierLogo
                        id={provider.id}
                        name={provider.name}
                        customUrl={provider.customLogo}
                        className="max-h-7 max-w-full object-contain"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-emerald-200 bg-emerald-50 p-4 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-xs font-black uppercase tracking-wide text-emerald-700">
                  Need Internet Options Now?
                </div>
                <p className="mt-1 text-sm font-bold leading-6 text-slate-700">
                  Call the Internet Availability Desk to compare available plans, current offers, and installation times with a live specialist.
                </p>
              </div>
              <a
                href={telHref}
                onClick={handleHeaderPhoneClick}
                className="js-google-phone-link inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-emerald-600/20 transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-600/20 active:scale-[0.99]"
              >
                <PhoneCall className="h-4 w-4" />
                <span>Call Now to Check Availability</span>
              </a>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="w-full rounded-3xl border border-blue-100 bg-white p-5 shadow-2xl shadow-blue-100/80 sm:p-6">
          <div className="mb-5">
            <h2 className="text-2xl font-black tracking-tight text-slate-900">
              Start a Quick Address Check
            </h2>
            <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
              Enter your service address and ZIP code to start an exact-address availability lookup.
            </p>
            <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs font-extrabold text-emerald-700">
              <span>✓ Free to check</span>
              <span className="mx-2 text-slate-300">•</span>
              <span>✓ Exact-address lookup</span>
              <span className="mx-2 text-slate-300">•</span>
              <span>✓ Takes 2-3 minutes</span>
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
                id="paid-local-street-address"
                type="text"
                value={streetAddress}
                onChange={(e) => updateField('streetAddress', e.target.value)}
                placeholder="123 Main St"
                required
                autoComplete="street-address"
                aria-invalid={!!errors.streetAddress}
                aria-describedby={errors.streetAddress ? 'paid-local-street-error' : undefined}
                className={`w-full rounded-2xl border bg-white px-4 py-3.5 text-base font-semibold text-slate-900 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 sm:text-sm ${
                  errors.streetAddress ? 'border-red-300' : 'border-slate-200'
                }`}
              />
              {errors.streetAddress && (
                <p id="paid-local-street-error" className="mt-2 text-xs font-bold text-red-600">
                  {errors.streetAddress}
                </p>
              )}
            </label>

            <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_150px]">
              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                  Apt / Unit
                </span>
                <input
                  id="paid-local-apt-number"
                  type="text"
                  value={aptNumber}
                  onChange={(e) => updateField('aptNumber', e.target.value)}
                  placeholder="Optional"
                  autoComplete="address-line2"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-base font-semibold text-slate-900 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 sm:text-sm"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                  ZIP code *
                </span>
                <input
                  id="paid-local-zip-code"
                  type="text"
                  value={zipCode}
                  onChange={(e) => updateField('zipCode', e.target.value)}
                  placeholder="78526"
                  required
                  inputMode="numeric"
                  pattern="[0-9]{5}"
                  autoComplete="postal-code"
                  aria-invalid={!!errors.zipCode}
                  aria-describedby={errors.zipCode ? 'paid-local-zip-error' : undefined}
                  className={`w-full rounded-2xl border bg-white px-4 py-3.5 text-base font-semibold text-slate-900 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 sm:text-sm ${
                    errors.zipCode ? 'border-red-300' : 'border-slate-200'
                  }`}
                />
                {errors.zipCode && (
                  <p id="paid-local-zip-error" className="mt-2 text-xs font-bold text-red-600">
                    {errors.zipCode}
                  </p>
                )}
              </label>
            </div>
          </div>

          <div className="mt-5">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-blue-600 bg-white px-6 py-4 text-base font-extrabold text-blue-700 shadow-sm transition-colors hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-blue-600/20 active:scale-[0.99] disabled:cursor-wait disabled:opacity-70"
            >
              <Search className="h-4 w-4" />
              <span>{isSubmitting ? 'Checking Availability...' : 'Check Availability at My Address →'}</span>
            </button>
          </div>

          <div className="mt-4 grid gap-2 rounded-2xl bg-slate-50 p-4 text-xs font-bold text-slate-600 sm:grid-cols-3">
            <div className="flex items-center justify-center gap-1.5 text-center">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Exact-address lookup</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 text-center">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>No obligation</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 text-center">
              <Clock3 className="h-4 w-4 text-blue-600" />
              <span>Live help available</span>
            </div>
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
      </div>
      <PaidLocalFooter />

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-emerald-200 bg-white/95 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 shadow-2xl shadow-slate-900/15 backdrop-blur lg:hidden">
        <div className="mx-auto max-w-md">
          <div className="mb-2 text-center text-xs font-extrabold uppercase tracking-wide text-emerald-700">
            Talk to an availability specialist
          </div>
          <a
            href={telHref}
            onClick={handleHeaderPhoneClick}
            className="js-google-phone-link flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-4 text-base font-black text-white shadow-lg shadow-emerald-600/20"
          >
            <PhoneCall className="h-5 w-5" />
            <span>Tap to Call - Check Availability</span>
          </a>
        </div>
      </div>
    </main>
  );
}
