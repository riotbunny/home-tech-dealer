// Dynamic Programmatic SEO (pSEO) & Structured Data (JSON-LD) Engine
// Home Tech Dealer Inc.

/**
 * Updates document head metadata, canonical tags, OpenGraph, and JSON-LD schema
 * tailored dynamically to the active city, state, and 44k 5-digit ZIP code.
 */
export function updateCitySEO(cityData, phoneNumber = '1 (888) 555-5555') {
  if (!cityData) return;

  const routeType = cityData.routeType || (cityData.zip ? 'city' : (cityData.state && !cityData.cityName ? 'state' : 'city'));
  const cityName = cityData.cityName || (cityData.city ? cityData.city.split(',')[0].trim() : 'Your Area');
  const state = cityData.state || 'USA';
  const stateName = cityData.stateName || state;
  const zip = cityData.zip || '';
  const origin = (typeof window !== 'undefined' && window.location.hostname === 'localhost')
    ? window.location.origin 
    : 'https://www.hometechdealer.com';
  
  // Canonical URL matching the exact canonical path
  const canonicalPath = cityData.canonicalPath || (zip 
    ? `/internet/${state.toLowerCase()}/${cityName.toLowerCase().replace(/[^a-z0-9]/g, '-')}/${zip}` 
    : `/internet/${cityName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${state.toLowerCase()}`);
  const canonicalUrl = `${origin}${canonicalPath}`;

  // Helper to set or create meta tag
  const setMeta = (nameAttr, nameVal, content) => {
    let el = document.querySelector(`meta[${nameAttr}="${nameVal}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(nameAttr, nameVal);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  let pageTitle = '';
  let description = '';
  let keywords = '';

  if (routeType === 'state') {
    pageTitle = `Best Internet & TV Providers in ${stateName} (2026 Directory & Deals) | Home Tech Dealer Inc.`;
    description = `Compare verified home internet, fiber optic, and 5G providers across ${stateName}. View coverage by city and call ${phoneNumber} for locked promotional rates.`;
    keywords = `internet providers ${stateName}, fiber internet ${state}, broadband directory ${stateName}, cable internet ${state}`;
  } else if (routeType === 'compare') {
    const nameA = cityData.compData?.nameA || (cityData.carrierA || 'Spectrum').toUpperCase();
    const nameB = cityData.compData?.nameB || (cityData.carrierB || 'AT&T').toUpperCase();
    pageTitle = `${nameA} vs ${nameB} Internet: 2026 Plans, Speeds & Pricing Comparison | Home Tech Dealer Inc.`;
    description = `Compare ${nameA} vs ${nameB} home internet head-to-head. Compare download speeds, monthly pricing, contract terms, and customer ratings. Call ${phoneNumber} to verify availability.`;
    keywords = `${nameA} vs ${nameB}, compare ${nameA} ${nameB} internet, ${nameA} vs ${nameB} price speed`;
  } else if (routeType === 'provider') {
    const carrierName = (cityData.carrierId || 'Provider').toUpperCase();
    pageTitle = `${carrierName} Internet in ${cityName}, ${state} (2026 Plans & Coverage) | Home Tech Dealer Inc.`;
    description = `Compare verified ${carrierName} internet, fiber, and TV plans in ${cityName}, ${state}. Check exact address availability and locked mover promotions at ${phoneNumber}.`;
    keywords = `${carrierName} internet ${cityName} ${state}, ${carrierName} fiber ${cityName}, ${carrierName} plans ${cityName}`;
  } else {
    // Standard City / ZIP
    pageTitle = zip 
      ? `Best Internet & TV Providers in ${cityName}, ${state} ${zip} (2026 Deals) | Home Tech Dealer Inc.`
      : `Best Internet & TV Providers in ${cityName}, ${state} (2026 Deals) | Home Tech Dealer Inc.`;
    description = zip
      ? `Compare verified home internet, fiber optic, 5G home, and TV plans in ${cityName}, ${state} ${zip}. Top carriers including Verizon, T-Mobile, EarthLink, and Starlink. Call ${phoneNumber} for locked promo rates.`
      : `Compare verified home internet, fiber optic, 5G home, and TV plans in ${cityName}, ${state}. Top carriers including Verizon, T-Mobile, EarthLink, and Starlink. Call ${phoneNumber} for locked promo rates.`;
    keywords = `internet providers ${cityName} ${state} ${zip}, fiber internet ${cityName} ${zip}, cheap wifi ${cityName} ${zip}, 5G home internet ${cityName}, broadband deals ${zip}`;
  }

  // 1. Dynamic Page Title
  document.title = pageTitle;

  // 2. Meta Description & Keywords
  setMeta('name', 'description', description);
  setMeta('name', 'keywords', keywords);

  // 3. OpenGraph Social Cards
  setMeta('property', 'og:title', pageTitle);
  setMeta('property', 'og:description', description);
  setMeta('property', 'og:url', canonicalUrl);
  setMeta('property', 'og:type', 'website');

  // 4. Twitter Cards
  setMeta('name', 'twitter:title', pageTitle);
  setMeta('name', 'twitter:description', description);

  // 5. Canonical Link
  let canonicalEl = document.querySelector('link[rel="canonical"]');
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', canonicalUrl);

  // 6. Singleton JSON-LD Structured Data Injection
  let jsonLdScript = document.getElementById('pseo-jsonld');
  if (!jsonLdScript) {
    jsonLdScript = document.createElement('script');
    jsonLdScript.id = 'pseo-jsonld';
    jsonLdScript.type = 'application/ld+json';
    document.head.appendChild(jsonLdScript);
  }

  // Build Breadcrumb Elements
  const breadcrumbElements = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: origin }
  ];

  if (routeType === 'state') {
    breadcrumbElements.push({ '@type': 'ListItem', position: 2, name: 'USA Directory', item: `${origin}/#state-directory` });
    breadcrumbElements.push({ '@type': 'ListItem', position: 3, name: `${stateName} Internet`, item: canonicalUrl });
  } else if (routeType === 'compare') {
    breadcrumbElements.push({ '@type': 'ListItem', position: 2, name: 'Comparisons', item: `${origin}/#plans-marketplace` });
    breadcrumbElements.push({ '@type': 'ListItem', position: 3, name: pageTitle.split(':')[0], item: canonicalUrl });
  } else {
    breadcrumbElements.push({ '@type': 'ListItem', position: 2, name: stateName, item: `${origin}/internet/${state.toLowerCase()}` });
    breadcrumbElements.push({ '@type': 'ListItem', position: 3, name: zip ? `${cityName}, ${state} ${zip}` : `${cityName}, ${state}`, item: canonicalUrl });
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': `${canonicalUrl}#localbusiness`,
        name: `Home Tech Dealer Inc. - ${cityName}, ${state} ${zip}`,
        url: canonicalUrl,
        telephone: phoneNumber,
        priceRange: '$49.99 - $120.00',
        image: `${origin}/favicon.ico`,
        description: description,
        address: {
          '@type': 'PostalAddress',
          addressLocality: cityName,
          addressRegion: state,
          postalCode: zip || undefined,
          addressCountry: 'US'
        },
        areaServed: {
          '@type': routeType === 'state' ? 'State' : 'City',
          name: routeType === 'state' ? stateName : cityName
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          bestRating: '5',
          worstRating: '1',
          ratingCount: '1842'
        }
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbElements
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `Who provides the fastest internet in ${routeType === 'state' ? stateName : cityName}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `In ${routeType === 'state' ? stateName : cityName}, top fiber optic and advanced cable networks deliver download speeds up to 1,000 Mbps to 5,000 Mbps with symmetrical uploads. Leading providers include Verizon, EarthLink Fiber, T-Mobile 5G Home, and top regional cable networks.`
            }
          },
          {
            '@type': 'Question',
            name: `What is the cheapest home internet option in ${routeType === 'state' ? stateName : cityName}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Home internet plans in ${routeType === 'state' ? stateName : cityName} start as low as $49.99 per month for 5G home internet options through Verizon and T-Mobile with no equipment rental fees, unlimited data, and no annual contracts.`
            }
          },
          {
            '@type': 'Question',
            name: `How do I lock in current promotional rates and mover deals?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Call Home Tech Dealer Inc. toll-free at ${phoneNumber} to verify exact street address availability, lock in promotional rates, and claim eligible mover reward cards.`
            }
          }
        ]
      }
    ]
  };

  jsonLdScript.textContent = JSON.stringify(structuredData);
}
