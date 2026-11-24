import { readFile, readdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { canonicalInternetPath } from '../src/services/canonicalRoutes.js';
import { CURATED_CITIES, createCitySlug, resolveLocationRoute } from '../src/data/usCitiesData.js';
import { LOCAL_GUIDES } from '../src/data/localGuides.js';

const postal = JSON.parse(await readFile('seo/postalRoutes.json', 'utf8'));
const cityPaths = new Set([...CURATED_CITIES.map(c => `/internet/${c.state.toLowerCase()}/${createCitySlug(c.city)}`), ...Object.keys(LOCAL_GUIDES).map(key => `/internet/${key}`)]);
if (process.argv.includes('--write')) {
  const rebuiltPostal = {};
  for (const file of (await readdir('public')).filter(name => /^sitemap-zips-.+\.xml$/.test(name))) {
    const source = await readFile(`public/${file}`, 'utf8');
    let changes = 0;
    const output = source.replace(/<loc>([^<]+)<\/loc>/g, (_, value) => {
      const url = new URL(value);
      url.pathname = canonicalInternetPath(url.pathname, postal);
      const location = resolveLocationRoute(url.pathname);
      if (location?.canonicalPath) url.pathname = location.canonicalPath;
      if (url.href !== value) changes++;
      const parts = url.pathname.split('/');
      if (parts.length === 5) rebuiltPostal[parts[4]] = [parts[2], parts[3]];
      return `<loc>${url.href}</loc>`;
    });
    if (changes) { await writeFile(`public/${file}`, output); console.log(`Repaired ${changes} URL(s) in ${file}`); }
  }
  await writeFile('seo/postalRoutes.json', `${JSON.stringify(rebuiltPostal)}\n`);
  const ranges = [];
  for (const [zip, [state]] of Object.entries(rebuiltPostal).sort(([a], [b]) => a.localeCompare(b))) {
    if (ranges.at(-1)?.[2] === state) ranges.at(-1)[1] = Number(zip);
    else ranges.push([Number(zip), Number(zip), state]);
  }
  await writeFile('src/data/zipStateRanges.js', `// Derived from the ZIP sitemap inventory by scripts/audit-seo.mjs.\nexport const ZIP_STATE_RANGES = ${JSON.stringify(ranges)};\n`);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...cityPaths].sort().map(path => `  <url><loc>https://www.hometechdealer.com${path}</loc><lastmod>2026-11-24</lastmod></url>`).join('\n')}\n</urlset>\n`;
  await writeFile('public/sitemap-cities.xml', xml);
  let index = await readFile('public/sitemap.xml', 'utf8');
  if (!index.includes('sitemap-cities.xml')) index = index.replace('</sitemapindex>', '  <sitemap><loc>https://www.hometechdealer.com/sitemap-cities.xml</loc></sitemap>\n</sitemapindex>');
  await writeFile('public/sitemap.xml', index);
}
let count = 0;
const seen = new Set();
for (const file of (await readdir('public')).filter(name => /^sitemap-.+\.xml$/.test(name))) {
  const xml = await readFile(`public/${file}`, 'utf8');
  for (const [, value] of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const url = new URL(value);
    assert.equal(url.origin, 'https://www.hometechdealer.com');
    assert(!seen.has(value), `Duplicate sitemap URL: ${value}`);
    seen.add(value);
    assert.equal(canonicalInternetPath(url.pathname, postal), url.pathname, `Non-canonical sitemap URL: ${value}`);
    const data = resolveLocationRoute(url.pathname);
    if (url.pathname !== '/') {
      assert(data, `Unresolved sitemap URL: ${value}`);
      assert.equal(data.canonicalPath, url.pathname, `Resolver disagrees with sitemap: ${value}`);
    }
    count++;
  }
}
console.log(`PASS: ${count} unique sitemap URLs use www and agree with route canonicals.`);
