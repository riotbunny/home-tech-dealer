import React from 'react';
import { PhoneCall } from 'lucide-react';
import { CURATED_CITIES, createCitySlug } from '../data/usCitiesData';
import { getLocalGuide } from '../data/localGuides';
import { DEFAULT_PHONE_NUMBER } from '../services/catalogService';

export function LocalMarketGuide({ cityName = '', state = '', zip = '', phoneNumber = DEFAULT_PHONE_NUMBER }) {
  const area = cityName && cityName !== 'Your Area' ? `${cityName}${state ? `, ${state}` : ''}` : 'Your Area';
  const profile = getLocalGuide(cityName, state);
  const nearby = CURATED_CITIES.filter(c => c.state === state && c.city.toLowerCase() !== cityName.toLowerCase()).slice(0, 6);
  const questions = profile?.questions || ['Which carriers can take an order at my exact address?', 'What are the monthly price, equipment fees and contract terms?', 'Is self-installation possible, or is a technician appointment needed?'];
  return <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-slate-200">
    <h2 className="text-2xl font-bold text-slate-900">Internet ordering guide for {area}{zip ? ` ${zip}` : ''}</h2>
    <p className="mt-3 text-slate-600 leading-relaxed">Provider logos and advertised plans are a starting point. They do not confirm that a carrier can serve every home in {area}. Availability, equipment and installation depend on the complete service address.</p>
    <div className="grid md:grid-cols-2 gap-6 mt-6">
      <article className="border border-slate-200 rounded-lg p-5">
        <h3 className="font-bold text-lg">{profile?.focus || 'Prepare for your availability check'}</h3>
        <p className="mt-3 leading-relaxed text-slate-600">{profile?.advice || 'Have your street address, apartment or unit number, ZIP code and preferred activation date ready. A city or ZIP search cannot confirm service at an individual home.'}</p>
        <h3 className="font-bold mt-5">Questions to ask before ordering</h3>
        <ul className="list-disc pl-5 space-y-2 mt-3 text-slate-600">{questions.map(q => <li key={q}>{q}</li>)}</ul>
      </article>
      <article className="border border-slate-200 rounded-lg p-5">
        <h3 className="font-bold text-lg">Check coverage and plan disclosures</h3>
        <p className="mt-3 leading-relaxed text-slate-600">Use the FCC National Broadband Map to research reported service at your address. Confirm order eligibility with the selected provider. Ask for the plan's Broadband Consumer Label and review the monthly price, introductory period, additional charges and data policy.</p>
        <ul className="mt-4 space-y-3 text-blue-700 underline">
          <li><a href="https://broadbandmap.fcc.gov/" target="_blank" rel="noopener noreferrer">FCC National Broadband Map</a></li>
          <li><a href="https://www.fcc.gov/broadbandlabels" target="_blank" rel="noopener noreferrer">FCC Broadband Consumer Labels</a></li>
        </ul>
        <p className="text-xs text-slate-500 mt-4">HomeTechDealer is an authorized dealer. This guide is not a live coverage report or an FCC endorsement. Carrier confirmation is required.</p>
      </article>
    </div>
    <a href={`tel:${phoneNumber.replace(/\D/g, '')}`} className="js-google-phone-link inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-5 py-3 rounded-md mt-6"><PhoneCall size={18} />Call to Check Availability &amp; Promotions</a>
    {nearby.length > 0 && <nav className="mt-8" aria-label="Other cities in this state">
      <h3 className="font-bold">Explore other {state} city guides</h3>
      <div className="flex flex-wrap gap-3 mt-3">{nearby.map(c => <a className="text-blue-700 underline" key={`${c.city}-${c.zip}`} href={`/internet/${c.state.toLowerCase()}/${createCitySlug(c.city)}`}>{c.city}, {c.state}</a>)}</div>
      <a className="inline-block mt-4 text-blue-700 underline" href={`/internet/${state.toLowerCase()}`}>View the {state} directory</a>
    </nav>}
  </section>;
}
