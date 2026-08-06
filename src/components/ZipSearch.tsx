import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { lookupZipData } from '../services/zipLookup';

export default function ZipSearch(): React.JSX.Element {
  const [inputZip, setInputZip] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanZip = inputZip.trim();

    if (!/^\d{5}$/.test(cleanZip)) {
      setErrorMessage('Please enter a valid 5-digit ZIP code.');
      return;
    }

    setLoading(true);
    const { data, error } = await lookupZipData(cleanZip);
    setLoading(false);

    if (error || !data) {
      setErrorMessage(error || `No coverage data found for ZIP code ${cleanZip}.`);
      return;
    }

    const stateSlug = data.location.state_code.toLowerCase();
    const citySlug = data.location.city.toLowerCase().replace(/\s+/g, '-');

    navigate(`/internet/${stateSlug}/${citySlug}/${cleanZip}`);
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white p-4 rounded-xl shadow-md border border-gray-100 text-left">
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          maxLength={5}
          placeholder="Enter 5-digit ZIP (e.g. 78520)"
          value={inputZip}
          onChange={(e) => setInputZip(e.target.value.replace(/\D/g, ''))}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 whitespace-nowrap"
        >
          {loading ? 'Searching...' : 'Check Availability'}
        </button>
      </form>
      {errorMessage && (
        <p className="mt-3 text-sm text-red-600 font-medium">{errorMessage}</p>
      )}
    </div>
  );
}