import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { canonicalInternetPath } from '../src/services/canonicalRoutes.js';
import { resolveLocationRoute } from '../src/data/usCitiesData.js';
import { getPageMetadata, getPageSchema } from '../src/services/seoMetadata.js';

const postal = JSON.parse(readFileSync('seo/postalRoutes.json', 'utf8'));
test('city hubs never invent a ZIP and legacy city suffixes consolidate', () => {
  assert.equal(canonicalInternetPath('/internet/texas'), '/internet/tx');
  assert.equal(resolveLocationRoute('/internet/fl/miami/33101', new URLSearchParams('city=Houston&state=TX')).cityName, 'Miami');
  for (const path of ['/internet/tx/houston', '/internet/tx/houston-tx', '/internet/houston-tx']) {
    const route = resolveLocationRoute(path);
    assert.equal(route.cityName, 'Houston');
    assert.equal(route.zip, '');
    assert.equal(route.canonicalPath, '/internet/tx/houston');
  }
});
test('legacy US routes resolve by ZIP while valid state and ZIP links stay intact', () => {
  for (const [old, canonical] of [
    ['/internet/us/louisville/40214', '/internet/ky/louisville/40214'],
    ['/internet/us/houston/77033', '/internet/tx/houston/77033'],
    ['/internet/ny/new-york-ny/55555', '/internet/ny/new-york'],
    ['/internet/mn/young-america/55555', '/internet/mn/young-america/55555'],
    ['/internet/tx/brownsville/78520', '/internet/tx/brownsville/78520'],
    ['/internet/tx/naval-air-station/-jrb/76127', '/internet/tx/naval-air-station-jrb/76127'],
    ['/zip/77031', '/internet/tx/houston/77031']
  ]) assert.equal(canonicalInternetPath(old, postal), canonical);
});
test('schema describes the real organization, not invented reviews or local offices', () => {
  const route = resolveLocationRoute('/internet/tx/houston/77031');
  const schema = JSON.stringify(getPageSchema(route, '1(855)215-8469'));
  assert(!schema.includes('aggregateRating'));
  assert(!schema.includes('LocalBusiness'));
  assert(!schema.includes('FAQPage'));
  assert(schema.includes('Organization'));
  assert.equal(getPageMetadata(route).canonical, 'https://www.hometechdealer.com/internet/tx/houston/77031');
});
test('middleware preserves ad parameters and does not affect PPC or legal routes', async () => {
  const { default: middleware } = await import('../middleware.js');
  const response = middleware(new Request('https://www.hometechdealer.com/internet/us/houston/77033?gclid=test&utm_source=google', { headers: { 'x-vercel-ip-country': 'US' } }));
  assert.equal(response.status, 308);
  assert.equal(response.headers.get('location'), 'https://www.hometechdealer.com/internet/tx/houston/77033?gclid=test&utm_source=google');
  for (const path of ['/internet/local', '/terms', '/privacy', '/disclaimers', '/assets/example.js']) {
    assert.equal(middleware(new Request(`https://www.hometechdealer.com${path}`, { headers: { 'x-vercel-ip-country': 'US' } })), undefined);
  }
});
test('priority pages ship real HTML titles, canonicals and useful text before JavaScript', () => {
  assert(!readFileSync('dist/app.html', 'utf8').includes('rel="canonical"'), 'The SPA fallback must not assign the homepage canonical to deep routes');
  for (const path of ['internet/tx/houston/77031', 'internet/la', 'internet/ky/louisville/40214']) {
    const html = readFileSync(`dist/${path}/index.html`, 'utf8');
    assert(html.includes(`href="https://www.hometechdealer.com/${path}"`));
    assert(html.includes('Call Now to Check Promotions'));
    assert(html.includes('FCC National Broadband Map'));
    assert(!html.includes('aggregateRating'));
    assert(html.includes('AW-16641283046'));
    assert(html.includes('GfRBCLbLgZAdEOanl_89'));
    assert(!html.includes('6a55CPnRiJAdEOanl_89'));
  }
});
