import React from 'react';
import { useParams } from 'react';
import SEOHead from '../components/SEOHead';
import AvailabilityChecker from './AvailabilityChecker';

export default function LocationPage() {
  const { state, city } = useParams<{ state: string; city: string }>();
  const currentYear = new Date().getFullYear();

  const formattedCity = city
    ? city.charAt(0).toUpperCase() + city.slice(1).toLowerCase()
    : 'Your Area';
  const formattedState = state ? state.toUpperCase() : '';
  const locationLabel = `${formattedCity}, ${formattedState}`;

  // SEO Meta Variables
  const pageTitle = `Best Internet Providers in ${locationLabel} | Compare Deals (${currentYear})`;
  const pageDescription = `Find high-speed internet providers in ${locationLabel}. Compare Fiber, Cable, 5G, and Satellite plans, speeds, and prices near you.`;
  const canonicalPath = `/internet/${state || ''}/${city || ''}`;

  // JSON-LD Structured Data (FAQPage Schema)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': `Which broadband provider is best in ${formattedCity}?`,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': `The best internet provider in ${formattedCity} depends on your exact ZIP code. Fiber providers offer the fastest gigabit speeds, while cable and 5G home internet offer widespread availability and budget-friendly options.`
        }
      },
      {
        '@type': 'Question',
        'name': `What is the fastest internet in ${formattedCity}?`,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': `Fiber internet offers the highest speeds in ${formattedCity}, reaching speeds up to 1,000 Mbps (1 Gbps) or higher with symmetrical download and upload speeds.`
        }
      }
    ]
  };

  return (
    <>
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        canonicalPath={canonicalPath}
        schema={faqSchema}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Strict H1 Hygiene - Exactly ONE H1 per page */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Find Internet Providers in {locationLabel}
          </h1>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Compare top internet service providers, fiber speeds, monthly plans, and coverage in {formattedCity}.
          </p>
        </div>

        {/* Lead Gen Availability Checker */}
        <div className="mb-12">
          <AvailabilityChecker />
        </div>

        {/* Modular H2 Structure for Snippet Targeting */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">
              Internet Options & Pricing in {locationLabel}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Finding reliable high-speed internet in {formattedCity} depends on your exact location. Top national providers offer fiber, cable, 5G home internet, and satellite coverage across {formattedState}.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="p-4 border rounded-md">
                <h3 className="font-medium text-gray-900">Fiber Internet</h3>
                <p className="text-xs text-gray-500 mt-1">Speeds up to 1,000+ Mbps</p>
                <p className="text-sm font-semibold text-blue-600 mt-2">Starting at $49.99/mo</p>
              </div>
              <div className="p-4 border rounded-md">
                <h3 className="font-medium text-gray-900">Cable Internet</h3>
                <p className="text-xs text-gray-500 mt-1">Speeds up to 300–500 Mbps</p>
                <p className="text-sm font-semibold text-blue-600 mt-2">Starting at $39.99/mo</p>
              </div>
              <div className="p-4 border rounded-md">
                <h3 className="font-medium text-gray-900">5G Home Wireless</h3>
                <p className="text-xs text-gray-500 mt-1">Speeds up to 100–300 Mbps</p>
                <p className="text-sm font-semibold text-blue-600 mt-2">Starting at $35.00/mo</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">
              Coverage & Availability in {formattedCity}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Availability varies by neighborhood. Enter your address above to verify exact speeds and available promotional packages for your home.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">
              Frequently Asked Questions About Internet in {formattedCity}
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">Which broadband provider is best in {formattedCity}?</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Fiber providers offer the most reliable performance, followed by Cable and 5G Home Internet depending on local infrastructure.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">What is the fastest internet in {formattedCity}?</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Fiber connection speeds reach up to 1,000 Mbps (1 Gbps) or more in participating coverage zones.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}