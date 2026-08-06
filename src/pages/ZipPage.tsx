import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { createClient } from '@supabase/supabase-js';
import { ProviderCard, ProviderCoverage } from '../components/ProviderCard';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const ZipPage: React.FC = () => {
  const { state, city, zip } = useParams<{ state: string; city: string; zip: string }>();
  const navigate = useNavigate();

  const [searchZip, setSearchZip] = useState('');
  const [loading, setLoading] = useState(true);
  const [providers, setProviders] = useState<ProviderCoverage[]>([]);
  const [zipDetails, setZipDetails] = useState<{ city: string; state_code: string } | null>(null);

  const formattedCity = zipDetails?.city
    ? zipDetails.city.split(' ').map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')
    : city
    ? city.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : '';
  const formattedState = (zipDetails?.state_code || state || '').toUpperCase();
  const currentZip = zip || '';

  useEffect(() => {
    async function fetchData() {
      if (!currentZip) return;
      setLoading(true);

      // 1. Fetch ZIP info
      const { data: zipData } = await supabase
        .from('zip_codes')
        .select('city, state_code')
        .eq('zip_code', currentZip)
        .single();

      if (zipData) {
        setZipDetails(zipData);
      }

      // 2. Fetch Providers for this ZIP
      const { data: coverageData, error } = await supabase
        .from('provider_zip_coverage')
        .select(`
          coverage_percentage,
          max_download_speed,
          starting_price,
          technology_type,
          providers (
            id,
            name,
            logo_url,
            phone_number
          )
        `)
        .eq('zip_code', currentZip);

      if (!error && coverageData) {
        const mapped = coverageData.map((row: any) => ({
          id: row.providers?.id || Math.random().toString(),
          name: row.providers?.name || 'Unknown Provider',
          logo_url: row.providers?.logo_url,
          phone_number: row.providers?.phone_number,
          technology_type: row.technology_type,
          max_download_speed: row.max_download_speed,
          coverage_percentage: row.coverage_percentage,
          starting_price: row.starting_price,
        }));
        setProviders(mapped);
      }
      setLoading(false);
    }

    fetchData();
  }, [currentZip]);

  const handleZipSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchZip || searchZip.trim().length !== 5) return;

    const targetZip = searchZip.trim();
    const { data } = await supabase
      .from('zip_codes')
      .select('city, state_code')
      .eq('zip_code', targetZip)
      .single();

    if (data) {
      const citySlug = data.city.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
      const stateSlug = data.state_code.toLowerCase();
      navigate(`/internet/${stateSlug}/${citySlug}/${targetZip}`);
    } else {
      navigate(`/internet/us/search/${targetZip}`);
    }
  };

  const pageTitle = `Top Internet Providers in ${formattedCity}, ${formattedState} (${currentZip}) | HomeTech`;
  const metaDescription = `Compare high-speed internet providers in ${formattedCity}, ${formattedState} ${currentZip}. Check speeds up to 1000 Mbps, plan coverage, and pricing starting at $49.99/mo.`;
  const canonicalUrl = `https://hometechdealersite.com/internet/${state}/${city}/${currentZip}`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
      </Helmet>

      {/* Header Banner */}
      <div className="bg-blue-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <nav className="text-sm text-blue-200 mb-4">
            <span>Home</span> / <span>{formattedCity}, {formattedState}</span> / <span className="text-white font-semibold">{currentZip}</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-3">
            Internet Providers in {formattedCity}, {formattedState} ({currentZip})
          </h1>
          <p className="text-blue-100 text-lg mb-8 max-w-3xl">
            Compare speeds, plans, and pricing from top residential internet providers serving ZIP code {currentZip}.
          </p>

          <form onSubmit={handleZipSearch} className="flex flex-col sm:flex-row gap-3 max-w-md bg-white p-2 rounded-xl shadow-lg">
            <input
              type="text"
              value={searchZip}
              onChange={(e) => setSearchZip(e.target.value)}
              placeholder="Enter 5-digit ZIP (e.g. 78520)"
              maxLength={5}
              className="flex-1 px-4 py-3 text-gray-900 outline-none rounded-lg text-base"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg transition-colors"
            >
              Check Availability
            </button>
          </form>
        </div>
      </div>

      {/* Content Section */}
      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Top Internet Providers Available in {currentZip}
          </h2>
          <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
            Verified Coverage
          </span>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-500">Loading coverage details for {currentZip}...</p>
          </div>
        ) : providers.length > 0 ? (
          <div className="space-y-4">
            {providers.map((p) => (
              <ProviderCard key={p.id} provider={p} zipCode={currentZip} />
            ))}
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 text-center">
            <h3 className="text-xl font-bold text-yellow-900 mb-2">No coverage results for {currentZip}</h3>
            <p className="text-yellow-700">Try searching for a neighboring ZIP code above.</p>
          </div>
        )}
      </main>
    </>
  );
};