import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { CURATED_CITIES, US_STATES, createCitySlug, resolveLocationRoute } from '../src/data/usCitiesData.js';
import { LOCAL_GUIDES, getLocalGuide } from '../src/data/localGuides.js';
import { getPageMetadata, getPageSchema } from '../src/services/seoMetadata.js';

const base = await readFile('dist/index.html', 'utf8');
const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const extraZipPages = ['/internet/tx/houston/77031', '/internet/tx/houston/77268', '/internet/ky/louisville/40214', '/internet/tx/houston/77033', '/internet/oh/columbus/43216', '/internet/tn/lafayette/37083', '/internet/va/iron-gate/24448'];
const paths = new Set(['/', ...US_STATES.map(s => `/internet/${s.code.toLowerCase()}`), ...CURATED_CITIES.map(c => `/internet/${c.state.toLowerCase()}/${createCitySlug(c.city)}`), ...Object.keys(LOCAL_GUIDES).map(key => `/internet/${key}`), ...extraZipPages]);

function render(data) {
  const meta = getPageMetadata(data);
  const isState = data?.routeType === 'state';
  const area = isState ? data.stateName : data ? `${data.cityName}, ${data.state}${data.zip ? ` ${data.zip}` : ''}` : 'Your Area';
  const profile = getLocalGuide(data?.cityName, data?.state);
  const cities = CURATED_CITIES.filter(c => c.state === data?.state).slice(0, 12);
  return `<header style="padding:24px"><a href="/"><img src="/hometechdealer-logo.png" alt="HomeTechDealer" width="205" height="54"></a></header>
  <main style="max-width:1100px;margin:auto;padding:24px;font-family:Arial,sans-serif">
  <p>Authorized Internet Dealer</p><h1>Internet Providers in ${escape(area)}</h1>
  <p>${escape(meta.description)}</p><a class="js-google-phone-link" href="tel:18552158469">Call Now to Check Promotions: <span class="js-google-phone-number">1(855)215-8469</span></a>
  <h2>${escape(profile?.focus || 'Prepare for an address-specific availability check')}</h2>
  <p>${escape(profile?.advice || 'Have your complete street address, apartment or unit number, ZIP and preferred activation date ready. A city or ZIP listing does not confirm service at an individual home.')}</p>
  <ul>${(profile?.questions || ['Which carriers can take an order at my exact address?', 'What are the monthly price, equipment fees and contract terms?', 'Is self-installation possible, or is an appointment required?']).map(q => `<li>${escape(q)}</li>`).join('')}</ul>
  <h2>Research coverage and plan terms</h2><p>Provider availability, pricing and installation vary by address. Confirm order eligibility with the selected carrier.</p>
  <p><a href="https://broadbandmap.fcc.gov/">FCC National Broadband Map</a> · <a href="https://www.fcc.gov/broadbandlabels">FCC Broadband Consumer Labels</a></p>
  ${cities.length ? `<nav aria-label="City guides"><h2>Explore ${escape(data.stateName || data.state)} cities</h2>${cities.map(c => `<p><a href="/internet/${c.state.toLowerCase()}/${createCitySlug(c.city)}">${escape(c.city)}, ${c.state}</a></p>`).join('')}</nav>` : ''}
  ${!data ? `<nav aria-label="State guides">${US_STATES.map(s => `<a href="/internet/${s.code.toLowerCase()}">${escape(s.name)}</a> `).join('')}</nav>` : ''}
  </main><footer style="padding:24px"><a href="/terms">Terms of Service</a> · <a href="/privacy">Privacy Policy</a> · <a href="/disclaimers">Disclaimers</a></footer>`;
}

for (const path of paths) {
  const data = path === '/' ? null : resolveLocationRoute(path);
  if (path !== '/' && !data) throw new Error(`Cannot render ${path}`);
  const meta = getPageMetadata(data);
  let html = base.replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(meta.title)}</title>`);
  for (const [attr, key, value] of [['name', 'description', meta.description], ['property', 'og:title', meta.title], ['property', 'og:description', meta.description], ['property', 'og:url', meta.canonical], ['name', 'twitter:title', meta.title], ['name', 'twitter:description', meta.description]]) {
    const tag = `<meta ${attr}="${key}" content="${escape(value)}" />`;
    const pattern = new RegExp(`<meta ${attr}="${key}"[^>]*>`);
    html = pattern.test(html) ? html.replace(pattern, tag) : html.replace('</head>', `${tag}</head>`);
  }
  html = html.replace(/<link[^>]*rel="canonical"[^>]*>/g, '').replace('</head>', `<link rel="canonical" href="${escape(meta.canonical)}" /><script id="pseo-jsonld" type="application/ld+json">${JSON.stringify(getPageSchema(data, '1(855)215-8469')).replace(/</g, '\\u003c')}</script></head>`);
  const start = html.indexOf('<div id="root">');
  const end = html.lastIndexOf('</div>');
  html = `${html.slice(0, start)}<div id="root">${render(data)}</div>${html.slice(end + 6)}`;
  const output = path === '/' ? 'dist/index.html' : `dist${path}/index.html`;
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, html);
}
console.log(`Rendered ${paths.size} existing home, state, city and priority ZIP pages with initial HTML metadata and content.`);
