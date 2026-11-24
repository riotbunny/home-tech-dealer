import { getPageMetadata, getPageSchema } from './seoMetadata.js';

function applyMetadata(data, phoneNumber) {
  const meta = getPageMetadata(data, phoneNumber);
  document.title = meta.title;
  for (const [selector, attribute, value] of [
    ['meta[name="description"]', 'content', meta.description],
    ['meta[property="og:title"]', 'content', meta.title],
    ['meta[property="og:description"]', 'content', meta.description],
    ['meta[property="og:url"]', 'content', meta.canonical],
    ['meta[name="twitter:title"]', 'content', meta.title],
    ['meta[name="twitter:description"]', 'content', meta.description],
    ['link[rel="canonical"]', 'href', meta.canonical]
  ]) {
    let el = document.querySelector(selector);
    if (!el) {
      el = document.createElement(selector.startsWith('link') ? 'link' : 'meta');
      const [, name, content] = selector.match(/\[(.+?)="(.+?)"\]/);
      el.setAttribute(name, content);
      document.head.append(el);
    }
    el.setAttribute(attribute, value);
  }
  document.querySelector('meta[name="keywords"]')?.remove();
  let schema = document.getElementById('pseo-jsonld');
  if (!schema) {
    schema = document.createElement('script');
    schema.id = 'pseo-jsonld';
    schema.type = 'application/ld+json';
    document.head.append(schema);
  }
  schema.textContent = JSON.stringify(getPageSchema(data, phoneNumber));
}

export function restoreHomepageSEO() { applyMetadata(null, '1(855)215-8469'); }
export function updateCitySEO(cityData, phoneNumber = '1(855)215-8469') {
  if (cityData) applyMetadata(cityData, phoneNumber);
}
