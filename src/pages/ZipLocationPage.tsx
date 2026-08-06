import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { lookupZipData, ZipLocationData } from '../services/zipLookup';
import ZipSearch from '../components/ZipSearch';

export default function ZipLocationPage(): React.JSX.Element {
  const { state, city, zip } = useParams<{ state: string; city: string; zip: string }>();
  const [data, setData] = useState<ZipLocationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formattedCity = city
    ? city.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    : '';
  const formattedState = state ? state.toUpperCase() : '';

  useEffect(() => {
    async function fetchData() {
      if (!zip) return;
      setLoading(true);
      setError(null);
      const res = await lookupZipData(zip);
      if (res.error) {
        setError(res.error);
      } else {
        setData(res.data);
      }
      setLoading(false);
    }

    fetchData();
  }, [zip]);

  useEffect(() => {
    if (!data || !zip || !state || !city) return;

    const pageTitle = `High-Speed Internet Providers in ${formattedCity}, ${formattedState} (${zip})`;
    const pageDescription = `Compare top fiber, cable, and 5G internet providers in ${formattedCity}, ${formattedState} ${zip}. View speeds up to 5,000 Mbps and plans starting at $49.99/mo.`;

    document.title = pageTitle;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', pageDescription);

    const schemaData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ItemPage',
          '@id': `https://www.hometechdealer.com/internet/${state}/${city}/${zip}#webpage`,
          url: `https://www.hometechdealer.com/internet/${state}/${city}/${zip}`,
          name: pageTitle,
          description: pageDescription,
        },
        {
          '@type': 'Service',
          name: `High-Speed Internet Service in ${zip}`,
          areaServed: {
            '@type': 'PostalCode',
            postalCode: zip,
            addressCountry: 'US',
          },
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: `Available Internet Plans in ${formattedCity}`,
            itemListElement: data.providers.map((p) => ({
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: `${p.name} ${p.techType} Internet`,
              },
              price: p.startingPrice,
              priceCurrency: 'USD',
            })),
          },
        },
      ],
    };

    let scriptTag = document.getElementById('jsonld-schema') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'jsonld-schema';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.text = JSON.stringify(schemaData);

    return () => {
      const existingScript = document.getElementById('jsonld-schema');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [data, formattedCity, formattedState, state, city, zip]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading local provider options for ZIP {zip}...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-50 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center bg-white p-8 rounded-xl shadow-sm border border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Coverage Data Not Available</h1>
          <p className="text-gray-600 mb-6">{error || `We could not find coverage details for ZIP code ${zip}.`}</p>
          <p className="text-sm text-gray-500 mb-6">Search another ZIP code to check regional availability:</p>
          <ZipSearch />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-blue-900 text-white py-12 px-4 border-b border-blue-800">
        <div className="max-w-5xl mx-auto">
          <nav className="text-xs text-blue-200 mb-4 flex items-center space-x-2">
            <Link to="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link to={`/internet/${state}/${city}`} className="hover:underline">{formattedCity}, {formattedState}</Link>
            <span>/</span>
            <span className="text-white font-semibold">{zip}</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
            Internet Providers in {formattedCity}, {formattedState} ({zip})
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mb-8">
            Compare speeds, plans, and pricing from top residential internet providers serving ZIP code {zip}.
          </p>

          <div className="bg-white rounded-xl p-2 text-gray-900 shadow-lg max-w-xl">
            <ZipSearch />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto py-12 px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Top {data.providers.length} Internet Providers Available in {zip}
          </h2>
          <span className="text-sm font-medium bg-green-100 text-green-800 px-3 py-1 rounded-full">
            Verified Coverage
          </span>
        </div>

        <div className="space-y-6">
          {data.providers.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-4 min-w-[200px]">
                {p.logoUrl ? (
                  <img
                    src={p.logoUrl}
                    alt={`${p.name} logo`}
                    width="64"
                    height="64"
                    loading="eager"
                    className="w-16 h-16 object-contain rounded"
                  />
                ) : (
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 font-bold flex items-center justify-center rounded text-xl">
                    {p.name.charAt(0)}
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{p.name}</h3>
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    {p.techType} Internet
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 w-full md:w-auto text-center border-t border-b md:border-none py-3 md:py-0 border-gray-100">
                <div>
                  <div className="text-xs text-gray-500 uppercase font-medium">Max Speed</div>
                  <div className="text-lg font-extrabold text-blue-600">{p.downloadSpeed} Mbps</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase font-medium">Coverage</div>
                  <div className="text-lg font-bold text-gray-800">{p.coveragePct}%</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase font-medium">Starting At</div>
                  <div className="text-lg font-extrabold text-gray-900">${p.startingPrice}<span className="text-xs font-normal">/mo</span></div>
                </div>
              </div>

              <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:${p.phone.replace(/\D/g, '')}`}
                  className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-center transition-colors shadow-sm"
                >
                  Call {p.phone}
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}