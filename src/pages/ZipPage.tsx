import React, { useState, FormEvent, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search, MapPin, Zap, ShieldCheck, DollarSign, HelpCircle } from 'lucide-react';
import MyFinanceWidget from '../components/MyFinanceWidget';

export const ZipPage: React.FC = () => {
  const { state, city, zipCode } = useParams<{ state?: string; city?: string; zipCode?: string }>();
  const navigate = useNavigate();
  const [zipInput, setZipInput] = useState(zipCode || '');

  // Format parameters
  const rawCity = city || 'area';
  const rawState = state || 'us';
  const currentZip = zipCode || '78520';

  const formattedCity = rawCity
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  const formattedState = rawState.toUpperCase();

  const canonicalUrl = `https://hometechdealer.com/internet/${rawState.toLowerCase()}/${rawCity.toLowerCase()}/${currentZip}`;

  // 1. DYNAMIC METADATA & CANONICAL TAG INJECTION
  useEffect(() => {
    // Dynamic Page Title
    document.title = `Best Internet Providers in ${formattedCity}, ${formattedState} (${currentZip}) | Home Tech Dealer`;

    // Dynamic Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute(
      'content',
      `Compare top high-speed internet providers in ${formattedCity}, ${formattedState} (${currentZip}). View fiber, cable, 5G, and satellite plans, speeds up to 1 Gbps, and pricing near you.`
    );

    // Self-Referential Canonical Tag
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);
  }, [formattedCity, formattedState, currentZip, canonicalUrl]);

  // 2. JSON-LD STRUCTURED DATA SCHEMA FOR GOOGLE OVERVIEWS & RICH SNIPPETS
  const jsonLdSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: `Internet Providers in ${formattedCity}, ${formattedState} (${currentZip})`,
        description: `Compare high-speed internet service options in ${formattedCity} ZIP code ${currentZip}.`,
      },
      {
        '@type': 'Service',
        name: `High-Speed Internet Service in ${currentZip}`,
        provider: {
          '@type': 'Organization',
          name: 'Home Tech Dealer',
        },
        areaServed: {
          '@type': 'PostalCode',
          postalCode: currentZip,
          addressCountry: 'US',
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Available Broadband Plans',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'High-Speed Broadband Connection',
              },
              priceCurrency: 'USD',
              price: '30.00',
            },
          ],
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `What is the fastest internet provider in ${formattedCity} (${currentZip})?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Top fiber and cable providers offer speeds up to 1,000 Mbps (1 Gbps) in ZIP code ${currentZip}. Availability varies by street address.`,
            },
          },
          {
            '@type': 'Question',
            name: `How much does internet cost in ${formattedCity}, ${formattedState}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Internet plans in ${formattedCity} typically start between $30/mo. and $50/mo. depending on bandwidth requirements and provider promotions.`,
            },
          },
        ],
      },
    ],
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const cleanedZip = zipInput.trim();
    if (cleanedZip) {
      navigate(`/internet/${rawState.toLowerCase()}/${rawCity.toLowerCase()}/${cleanedZip}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col text-gray-900 font-sans">
      {/* Inject JSON-LD Schema directly into page head context */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      {/* Hero Header Section */}
      <section className="bg-blue-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          {/* H1 Heading */}
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            Find High-Speed Internet Providers in {formattedCity}, {formattedState} ({currentZip})
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Comparing broadband options in {formattedCity} ({currentZip}). Enter your address to inspect real-time availability, fiber coverage, and local promotional deals.
          </p>

          <form onSubmit={handleSearch} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <MapPin className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={zipInput}
                onChange={(e) => setZipInput(e.target.value)}
                placeholder="Enter 5-Digit ZIP Code..."
                maxLength={5}
                pattern="[0-9]{5}"
                required
                className="w-full pl-11 pr-4 py-4 rounded-xl text-gray-900 placeholder-gray-400 bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg font-semibold"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl shadow-md transition-colors flex items-center justify-center space-x-2 text-lg"
            >
              <Search className="w-5 h-5" />
              <span>Check Rates</span>
            </button>
          </form>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 py-12 flex-grow w-full space-y-12">
        {/* Widget Conversion Section */}
        <section id="conversion-widget">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Internet Availability &amp; Coverage in {currentZip}
            </h2>
            <p className="text-gray-600 text-sm">
              Residents in {formattedCity} ({currentZip}) have access to multiple broadband technologies, including Fiber, Cable, 5G Home Internet, and Satellite options.
            </p>
          </div>
          <MyFinanceWidget zipCode={currentZip} />
        </section>

        {/* Highlight Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Gigabit Speed Options</h3>
            <p className="text-sm text-gray-600">
              Fiber optic connections delivering speeds up to 1,000 Mbps available across select neighborhoods in {currentZip}.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Exclusive Local Savings</h3>
            <p className="text-sm text-gray-600">
              Access introductory rates starting between $30/mo. and $50/mo. for new subscribers in {formattedCity}.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Verified Coverage</h3>
            <p className="text-sm text-gray-600">
              Data backed by FCC coverage maps covering cable, fiber, satellite, and 5G Home Internet in {formattedState}.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center space-x-2 text-blue-900">
            <HelpCircle className="w-6 h-6" />
            <h2 className="text-2xl font-semibold">
              Frequently Asked Questions About {formattedCity} Internet
            </h2>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                What is the fastest internet provider in {formattedCity} ({currentZip})?
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                Top fiber and cable providers offer speeds up to 1,000 Mbps (1 Gbps) in ZIP code {currentZip}. Availability varies by street address.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                How much does internet cost in {formattedCity}, {formattedState}?
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                Internet plans in {formattedCity} typically start between $30/mo. and $50/mo. depending on bandwidth requirements and provider promotions.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-400 py-8 px-4 text-center text-xs border-t border-gray-800">
        <div className="max-w-5xl mx-auto space-y-3">
          <p>© {new Date().getFullYear()} Home Tech Dealer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ZipPage;