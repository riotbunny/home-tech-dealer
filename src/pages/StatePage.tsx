import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface CityGroup {
  cityName: string;
  citySlug: string;
}

const StatePage: React.FC = () => {
  const { state } = useParams<{ state: string }>();
  const [cities, setCities] = useState<CityGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchStateCities() {
      if (!state) return;

      setLoading(true);
      const cleanStateUpper = state.trim().toUpperCase();

      // Query state_code column directly (e.g. 'TX')
      let { data, error } = await supabase
        .from('zip_codes')
        .select('city, state_code, state')
        .ilike('state_code', cleanStateUpper)
        .limit(10000);

      // Fallback to 'state' column if state_code returned 0 rows
      if (!error && (!data || data.length === 0)) {
        const fallback = await supabase
          .from('zip_codes')
          .select('city, state_code, state')
          .ilike('state', `%${cleanStateUpper}%`)
          .limit(10000);

        if (fallback.data && fallback.data.length > 0) {
          data = fallback.data;
        }
      }

      if (error) {
        console.error('State query error:', error.message);
      } else if (data) {
        const cityMap = new Map<string, string>();

        data.forEach((item) => {
          if (item.city) {
            const cityName = item.city.trim();
            const citySlug = cityName.toLowerCase().replace(/\s+/g, '-');
            if (!cityMap.has(citySlug)) {
              cityMap.set(citySlug, cityName);
            }
          }
        });

        const sortedCities = Array.from(cityMap.entries())
          .map(([citySlug, cityName]) => ({ citySlug, cityName }))
          .sort((a, b) => a.cityName.localeCompare(b.cityName));

        setCities(sortedCities);
      }

      setLoading(false);
    }

    fetchStateCities();
  }, [state]);

  const formattedState = state ? state.toUpperCase() : '';

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem', fontFamily: 'system-ui, sans-serif' }}>
      <nav style={{ marginBottom: '1.5rem' }}>
        <Link to="/" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 500 }}>
          ← Back to Home
        </Link>
      </nav>

      <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#111827', marginBottom: '0.5rem' }}>
        Internet Providers by City in {formattedState}
      </h1>
      <p style={{ color: '#4b5563', marginBottom: '2rem' }}>
        Select a city in {formattedState} to view available broadband options and local ZIP codes.
      </p>

      {loading ? (
        <p style={{ color: '#6b7280' }}>Loading cities in {formattedState}...</p>
      ) : cities.length === 0 ? (
        <p style={{ color: '#dc2626' }}>No cities found for this state.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
          {cities.map(({ citySlug, cityName }) => (
            <Link
              key={citySlug}
              to={`/internet/${state}/${citySlug}`}
              style={{
                display: 'block',
                padding: '0.75rem 1rem',
                backgroundColor: '#ffffff',
                borderRadius: '0.5rem',
                color: '#1d4ed8',
                fontWeight: 600,
                textAlign: 'center',
                textDecoration: 'none',
                border: '1px solid #d1d5db',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                textTransform: 'capitalize',
              }}
            >
              {cityName}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatePage;