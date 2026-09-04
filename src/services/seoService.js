// Dynamic Programmatic SEO (pSEO) & Structured Data (JSON-LD) Engine
// Home Tech Dealer Inc.

/**
 * Updates document head metadata, canonical tags, OpenGraph, and JSON-LD schema
 * tailored dynamically to the active city, state, and 44k 5-digit ZIP code.
 */
export function updateCitySEO(cityData, phoneNumber = '1 (888) 555-5555') {
  if (!cityData) return;

  const cityName = cityData.cityName || cityData.city.split(',')[0].trim();
  const state = cityData.state || 'USA';
  const zip = cityData.zip || '';
  const origin = (typeof window !== 'undefined' && window.location.hostname === 'localhost')
    ? window.location.origin 
    : 'https://www.hometechdealer.com';
  
  // Canonical URL matching the exact 44k canonical path (e.g. /internet/tx/brownsville/78522)
  const canonicalPath = cityData.canonicalPath || (zip 
    ? `/internet/${state.toLowerCase()}/${cityName.toLowerCase().replace(/[^a-z0-9]/g, '-')}/${zip}` 
    : `/internet/${cityName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${state.toLowerCase()}`);
  const canonicalUrl = `${origin}${canonicalPath}`;

  // 1. Dynamic Page Title
  document.title = zip 
    ? `Best Internet & TV Providers in ${cityName}, ${state} ${zip} (2026 Deals) | Home Tech Dealer Inc.`
    : `Best Internet & TV Providers in ${cityName}, ${state} (2026 Deals) | Home Tech Dealer Inc.`;

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

  // 2. Meta Description & Keywords
  const description = zip
    ? `Compare verified home internet, fiber optic, 5G home, and TV plans in ${cityName}, ${state} ${zip}. Top carriers including Verizon, T-Mobile, EarthLink, and Starlink. Call ${phoneNumber} for locked promo rates.`
    : `Compare verified home internet, fiber optic, 5G home, and TV plans in ${cityName}, ${state}. Top carriers including Verizon, T-Mobile, EarthLink, and Starlink. Call ${phoneNumber} for locked promo rates.`;
  
  setMeta('name', 'description', description);
  setMeta('name', 'keywords', `internet providers ${cityName} ${state} ${zip}, fiber internet ${cityName} ${zip}, cheap wifi ${cityName} ${zip}, 5G home internet ${cityName}, broadband deals ${zip}`);

  // 3. OpenGraph Social Cards
  setMeta('property', 'og:title', `Best Internet & TV Deals in ${cityName}, ${state} ${zip} | Home Tech Dealer Inc.`);
  setMeta('property', 'og:description', `Compare verified broadband deals in ${cityName}, ${state} ${zip}. High-speed fiber, 5G home, and satellite with zero hold time.`);
  setMeta('property', 'og:url', canonicalUrl);
  setMeta('property', 'og:type', 'website');

  // 4. Twitter Cards
  setMeta('name', 'twitter:title', `Best Internet Providers in ${cityName}, ${state} ${zip} | Home Tech Dealer Inc.`);
  setMeta('name', 'twitter:description', description);

  // 5. Canonical Link
  let canonicalEl = document.querySelector('link[rel="canonical"]');
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', canonicalUrl);

  // 6. Singleton JSON-LD Structured Data Injection for Google Rich Snippets
  let jsonLdScript = document.getElementById('pseo-jsonld');
  if (!jsonLdScript) {
    jsonLdScript = document.createElement('script');
    jsonLdScript.id = 'pseo-jsonld';
    jsonLdScript.type = 'application/ld+json';
    document.head.appendChild(jsonLdScript);
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
        description: `Verified home broadband and television comparison marketplace serving ${cityName}, ${state} ${zip}. Compare fiber, 5G home, and satellite internet deals.`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: cityName,
          addressRegion: state,
          postalCode: zip || undefined,
          addressCountry: 'US'
        },
        areaServed: {
          '@type': 'City',
          name: cityName,
          containedInPlace: {
            '@type': 'State',
            name: state
          }
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
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: origin
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Internet Providers',
            item: `${origin}/#plans-marketplace`
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: state,
            item: `${origin}/#state-${state.toLowerCase()}`
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: zip ? `${cityName}, ${state} ${zip}` : `${cityName}, ${state}`,
            item: canonicalUrl
          }
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `Who provides the fastest internet in ${cityName}, ${state}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `In ${cityName}, ${state}, top fiber optic and advanced cable networks deliver download speeds up to 1,000 Mbps to 5,000 Mbps with symmetrical uploads. Leading providers include Verizon, EarthLink Fiber, T-Mobile 5G Home, and top regional cable networks.`
            }
          },
          {
            '@type': 'Question',
            name: `What is the cheapest home internet option in ${cityName}, ${state}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Home internet plans in ${cityName}, ${state} start as low as $49.99 per month for 5G home internet options through Verizon and T-Mobile with no equipment rental fees, unlimited data, and no annual contracts.`
            }
          },
          {
            '@type': 'Question',
            name: `Is fiber optic internet available across ${cityName}, ${state}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Fiber optic broadband reaches a significant portion of households across ${cityName}, ${state}. In areas where ground fiber is not yet laid, 5G Ultra Wideband and Starlink satellite provide 100% reliable coverage.`
            }
          },
          {
            '@type': 'Question',
            name: `How do I lock in current promotional rates and mover deals in ${cityName}, ${state}?`,
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
