import React from 'react';

export const ZipSchema = ({
  cityName = '',
  stateCode = '',
  zipCode = '',
  providerCount = 4,
  minPrice = '29.99',
}) => {
  const formattedState = (stateCode || '').toUpperCase();
  const formattedCity = (cityName || '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
  const canonicalUrl = `https://hometechdealer.com/internet/${(stateCode || '').toLowerCase()}/${(cityName || '').toLowerCase()}/${zipCode}`;

  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${canonicalUrl}#service`,
        'name': `High-Speed Internet Services in ${formattedCity}, ${formattedState} ${zipCode}`,
        'serviceType': 'Broadband & High-Speed Internet Comparison',
        'provider': {
          '@type': 'Organization',
          'name': 'HomeTechDealer',
          'url': 'https://hometechdealer.com',
        },
        'areaServed': {
          '@type': 'PostalAddress',
          'postalCode': zipCode,
          'addressLocality': formattedCity,
          'addressRegion': formattedState,
          'addressCountry': 'US',
        },
        'description': `Compare high-speed fiber, cable, and 5G home internet providers in ${formattedCity}, ${formattedState} ${zipCode}. View local plan coverage, speeds, and pricing.`,
        'hasOfferCatalog': {
          '@type': 'OfferCatalog',
          'name': `Internet Service Providers in ${zipCode}`,
          'offers': {
            '@type': 'AggregateOffer',
            'priceCurrency': 'USD',
            'lowPrice': minPrice,
            'offerCount': providerCount.toString(),
          },
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': 'https://hometechdealer.com',
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': formattedState,
            'item': `https://hometechdealer.com/internet/${(stateCode || '').toLowerCase()}`,
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': formattedCity,
            'item': `https://hometechdealer.com/internet/${(stateCode || '').toLowerCase()}/${(cityName || '').toLowerCase()}`,
          },
          {
            '@type': 'ListItem',
            'position': 4,
            'name': zipCode,
            'item': canonicalUrl,
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};