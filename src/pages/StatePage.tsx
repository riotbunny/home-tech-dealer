import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface CityGroup {
  cityName: string;
  citySlug: string;
}

const StatePage: React.FC = () => {
  const { state } = useParams<{ state: string }>();
  const [cities, setCities] = useState<CityGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    async function fetchStateCities() {
      if (!state) return;

      setLoading(true);
      const cleanStateUpper = state.trim().toUpperCase();
      const cityMap = new Map<string, string>();

      let page = 0;
      const pageSize = 1000;
      let hasMore = true;

      // Loop through chunked queries to bypass PostgREST limit and pull ALL rows
      while (hasMore) {
        let { data, error } = await supabase
          .from('zip_codes')
          .select('city, state_code, state')
          .ilike('state_code', cleanStateUpper)
          .range(page * pageSize, (page + 1) * pageSize - 1);

        // Fallback to 'state' column if state_code returns no data on first run
        if (page === 0 && (!error && (!data || data.length === 0))) {
          const fallback = await supabase
            .from('zip_codes')
            .select('city, state_code, state')
            .ilike('state', `%${cleanStateUpper}%`)
            .range(page * pageSize, (page + 1) * pageSize - 1);

          if (fallback.data && fallback.data.length > 0) {
            data = fallback.data;
          }
        }

        if (error) {
          console.error('State query error:', error.message);
          hasMore = false;
        } else if (data && data.length > 0) {
          data.forEach((item) => {
            if (item.city) {
              const cityName = item.city.trim();
              const citySlug = cityName.toLowerCase().replace(/\s+/g, '-');
              if (!cityMap.has(citySlug)) {
                cityMap.set(citySlug, cityName);
              }
            }
          });

          // Stop fetching if the returned dataset is less than page size
          if (data.length < pageSize) {
            hasMore = false;
          } else {
            page++;
          }
        } else {
          hasMore = false;
        }
      }

      const sortedCities = Array.from(cityMap.entries())
        .map(([citySlug, cityName]) => ({ citySlug, cityName }))
        .sort((a, b) => a.cityName.localeCompare(b.cityName));

      setCities(sortedCities);
      setLoading(false);
    }

    fetchStateCities();
  }, [state]);

  // Real-time filter against the complete dataset
  const filteredCities = useMemo(() => {
    if (!searchQuery.trim()) return cities;
    const query = searchQuery.toLowerCase().trim();
    return cities.filter(({ cityName }) =>
      cityName.toLowerCase().includes(query)
    );
  }, [cities, searchQuery]);

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
      <p style={{ color: '#4b5563', marginBottom: '1.5rem' }}>
        Select or search for a city in {formattedState} to view available broadband options and local ZIP codes.
      </p>

      {/* Instant Filter Search Bar */}
      <div style={{ position: 'relative', maxWidth: '480px', marginBottom: '2rem' }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Search ${cities.length} cities in ${formattedState}...`}
          style={{
            width: '100%',
            padding: '0.75rem 1rem 0.75rem 2.5rem',
            fontSize: '0.95rem',
            borderRadius: '0.5rem',
            border: '1px solid #d1d5db',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            outline: 'none',
          }}
        />
        <Search
          style={{
            position: 'absolute',
            left: '0.75rem',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '1.2rem',
            height: '1.2rem',
            color: '#9ca3af',
          }}
        />
      </div>

      {loading ? (
        <p style={{ color: '#6b7280' }}>Loading cities in {formattedState}...</p>
      ) : filteredCities.length === 0 ? (
        <p style={{ color: '#dc2626' }}>
          No cities found matching "{searchQuery}".
        </p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
          {filteredCities.map(({ citySlug, cityName }) => (
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