import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface ZipRecord {
  zip_code: string;
  [key: string]: any;
}

const CityPage: React.FC = () => {
  const { state, city } = useParams<{ state: string; city: string }>();
  const [zipCodes, setZipCodes] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchCityZips() {
      if (!state || !city) return;

      setLoading(true);
      const cleanCity = city.replace(/-/g, ' ').trim();
      const targetState = state.trim().toLowerCase();

      // Fetch all records for the city name
      const { data, error } = await supabase
        .from('zip_codes')
        .select('*')
        .ilike('city', cleanCity);

      if (error) {
        console.error('Supabase query error:', error.message);
      } else if (data) {
        console.log('Raw Supabase rows returned for city:', data);

        // Filter out out-of-state records by checking all state property variations
        const filteredRows = data.filter((item: ZipRecord) => {
          const rawVal =
            item.state ||
            item.state_code ||
            item.state_id ||
            item.state_abbr ||
            item.state_name ||
            '';
          const stateVal = String(rawVal).trim().toLowerCase();

          if (!stateVal) return true;

          return (
            stateVal === targetState ||
            (targetState === 'tx' && (stateVal === 'tx' || stateVal === 'texas'))
          );
        });

        const formattedZips = filteredRows
          .filter((item: ZipRecord) => Boolean(item.zip_code))
          .map((item: ZipRecord) => String(item.zip_code).padStart(5, '0'));

        const uniqueZips = Array.from(new Set(formattedZips));
        setZipCodes(uniqueZips.sort());
      }

      setLoading(false);
    }

    fetchCityZips();
  }, [state, city]);

  const formattedCity = city ? city.replace(/-/g, ' ') : '';
  const formattedState = state ? state.toUpperCase() : '';

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem', fontFamily: 'system-ui, sans-serif' }}>
      <nav style={{ marginBottom: '1.5rem' }}>
        <Link to={`/internet/${state}`} style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 500 }}>
          ← Back to {formattedState}
        </Link>
      </nav>

      <h1 style={{ fontSize: '2rem', fontWeight: 700, textTransform: 'capitalize', color: '#111827', marginBottom: '0.5rem' }}>
        Internet Providers & ZIP Codes in {formattedCity}, {formattedState}
      </h1>
      <p style={{ color: '#4b5563', marginBottom: '2rem' }}>
        Select your specific ZIP code below to see localized internet plans, speeds, and provider coverage.
      </p>

      {loading ? (
        <p style={{ color: '#6b7280' }}>Loading local ZIP codes...</p>
      ) : zipCodes.length === 0 ? (
        <p style={{ color: '#dc2626' }}>No ZIP codes found for this city.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '1rem' }}>
          {zipCodes.map((zip) => (
            <Link
              key={zip}
              to={`/internet/${state}/${city}/${zip}`}
              style={{
                display: 'block',
                padding: '0.75rem 1rem',
                backgroundColor: '#f3f4f6',
                borderRadius: '0.5rem',
                color: '#1d4ed8',
                fontWeight: 600,
                textAlign: 'center',
                textDecoration: 'none',
                border: '1px solid #e5e7eb',
              }}
            >
              ZIP {zip}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CityPage;