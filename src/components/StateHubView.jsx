import React from 'react';
import { CURATED_CITIES, createCitySlug } from '../data/usCitiesData';
import { DEFAULT_PHONE_NUMBER } from '../services/catalogService';
export function StateHubView({ stateCode = '', stateName = 'Your State', phoneNumber = DEFAULT_PHONE_NUMBER }) {
  const cities = CURATED_CITIES.filter(c => c.state === stateCode);
  return <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h2 className="text-3xl font-bold">Internet providers and city guides in {stateName}</h2>
    <p className="mt-4 text-slate-600 max-w-3xl leading-relaxed">Start with your city, then check your complete service address. A statewide provider listing does not mean every carrier or advertised plan is available at every {stateName} home.</p>
    <a href={`tel:${phoneNumber.replace(/\D/g, '')}`} className="js-google-phone-link inline-flex mt-5 bg-emerald-600 text-white px-5 py-3 rounded-md font-bold">Call Now to Check Promotions</a>
    <h3 className="text-xl font-bold mt-8">Before you choose a plan</h3>
    <ul className="list-disc pl-5 mt-3 space-y-2 text-slate-600"><li>Confirm service at the street address, including an apartment or unit number.</li><li>Ask about the price after introductory offers, equipment and one-time charges.</li><li>Confirm installation requirements, activation timing and cancellation terms.</li></ul>
    <p className="mt-5 text-slate-600">Research reported coverage with the <a href="https://broadbandmap.fcc.gov/" className="text-blue-700 underline">FCC National Broadband Map</a>. Review the selected plan's <a href="https://www.fcc.gov/broadbandlabels" className="text-blue-700 underline">Broadband Consumer Label</a> before ordering.</p>
    <h3 className="text-xl font-bold mt-8">Browse {stateName} cities</h3>
    {cities.length ? <nav aria-label={`${stateName} city guides`} className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">{cities.map(c => <a className="border border-slate-200 p-4 rounded-md text-blue-700 font-semibold" key={c.city} href={`/internet/${stateCode.toLowerCase()}/${createCitySlug(c.city)}`}>{c.city}, {stateCode}</a>)}</nav> : <p className="mt-4 text-slate-600">Enter your address in the form above or call to check your location.</p>}
  </section>;
}
