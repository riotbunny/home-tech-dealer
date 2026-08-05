import React from 'react';
import SEOHead from '../components/SEOHead';

interface ProviderPageProps {
  providerName: string;
  minPrice: string;
  maxSpeed: string;
  slug: string;
  phoneCTA?: string;
}

export default function ProviderPageTemplate({
  providerName,
  minPrice,
  maxSpeed,
  slug,
  phoneCTA = '1-844-845-3968'
}: ProviderPageProps) {
  const currentYear = new Date().getFullYear();

  const title = `${providerName} Plans, Pricing & Availability (${currentYear}) | HomeTech`;
  const description = `Compare ${providerName} internet plans starting at ${minPrice}/mo with speeds up to ${maxSpeed}. Check availability by ZIP code, view data caps, and compare deals. Call ${phoneCTA}.`;
  const canonicalPath = `/providers/${slug}`;

  // Structured Data: Product + AggregateOffer + FAQPage
  const providerSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      'name': `${providerName} Internet Service`,
      'description': description,
      'offers': {
        '@type': 'AggregateOffer',
        'priceCurrency': 'USD',
        'lowPrice': minPrice.replace(/[^0-9.]/g, ''),
        'offerCount': '3'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': `Does ${providerName} have data caps?`,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': `${providerName} plans generally feature unlimited data or generous monthly allowances depending on the tier selected.`
          }
        },
        {
          '@type': 'Question',
          'name': `How do I contact ${providerName} customer service?`,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': `You can order new service or reach support directly by calling ${phoneCTA}.`
          }
        }
      ]
    }
  ];

  return (
    <>
      <SEOHead
        title={title}
        description={description}
        canonicalPath={canonicalPath}
        schema={providerSchema}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Strict H1 Rule */}
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          {providerName} Plans & Pricing
        </h1>

        {/* 5-Part Standardized H2 Modular Layout */}
        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              1. {providerName} Internet Plans & Pricing
            </h2>
            <p className="text-gray-600 text-sm">
              Plans start at {minPrice}/month with speeds reaching up to {maxSpeed}.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              2. {providerName} Availability & Coverage Map
            </h2>
            <p className="text-gray-600 text-sm">
              Enter your address to check live network availability for {providerName} in your area.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              3. {providerName} Contracts and Data Caps
            </h2>
            <p className="text-gray-600 text-sm">
              Review contract terms, equipment rental fees, and data thresholds.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              4. {providerName} Customer Service & Support
            </h2>
            <p className="text-gray-600 text-sm">
              Call <a href={`tel:${phoneCTA}`} className="text-blue-600 font-semibold">{phoneCTA}</a> to connect with a representative.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              5. Frequently Asked Questions About {providerName}
            </h2>
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">Does {providerName} require a contract?</h3>
              <p className="text-sm text-gray-600">Contract requirements vary by plan and active promotional offer.</p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}