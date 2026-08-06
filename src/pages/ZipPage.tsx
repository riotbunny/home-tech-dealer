import React, { useState, FormEvent, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search, MapPin, Zap, ShieldCheck, DollarSign, HelpCircle } from 'lucide-react';
import MyFinanceWidget from '../components/MyFinanceWidget';

export const ZipPage: React.FC = () => {
  const { state, city, zipCode } = useParams<{ state?: string; city?: string; zipCode?: string }>();
  const navigate = useNavigate();
  const [zipInput, setZipInput] = useState(zipCode || '');

  const formattedCity = city ? city.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()) : 'Your Area';
  const formattedState = state ? state.toUpperCase() : '';
  const currentZip = zipCode || '78520';

  // Dynamic SEO Meta Tag & Canonical Link Injection
  useEffect(() => {
    // 1. Dynamic Title
    const pageTitle = `Best High-Speed Internet in ${formattedCity}, ${formattedState} (${currentZip}) | Home Tech Dealer`;
    document.title = pageTitle;

    // 2. Dynamic Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute(
      'content',
      `Compare top high-speed internet providers in ${formattedCity}, ${formattedState} (${currentZip}). View live fiber, cable, and 5G availability, speed options, and local pricing.`
    );

    // 3. Self-Referential Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    const cleanState = state ? state.toLowerCase().trim() : 'us';
    const cleanCity = city ? city.toLowerCase().trim() : 'area';
    canonicalLink.setAttribute(
      'href',
      `https://hometechdealer.com/internet/${cleanState}/${cleanCity}/${currentZip}`
    );
  }, [formattedCity, formattedState, currentZip, state, city]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const cleanedZip = zipInput.trim();
    if (cleanedZip) {
      navigate(`/location/${cleanedZip}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col text-gray-900 font-sans">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            High-Speed Internet Providers in {formattedCity}, {formattedState} ({currentZip})
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Compare live speeds, coverage maps, and exclusive local pricing from top nationwide providers.
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
        <section id="conversion-widget">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Live Internet Availability &amp; Custom Offers in {formattedCity}
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Search active promotions and speed options available in {currentZip}.
            </p>
          </div>
          <MyFinanceWidget zipCode={currentZip} />
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            Internet Speed &amp; Coverage Highlights for {formattedCity}, {formattedState}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Gigabit Speed Options</h3>
              <p className="text-sm text-gray-600">
                Fiber optic connections delivering speeds up to 5,000 Mbps available across select neighborhoods in {currentZip}.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Exclusive Local Savings</h3>
              <p className="text-sm text-gray-600">
                Access introductory rates, contract buyouts, and equipment credits for new subscribers.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Verified Coverage</h3>
              <p className="text-sm text-gray-600">
                Data backed by FCC coverage maps covering cable, fiber, satellite, and 5G Home Internet.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center space-x-2 text-blue-900">
            <HelpCircle className="w-6 h-6" />
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-bold text-gray-900">What is the fastest internet provider in {formattedCity}, {formattedState}?</h3>
              <p className="text-sm text-gray-600 mt-1">
                Fiber internet providers typically deliver the fastest speeds in {formattedCity}, offering symmetrical download and upload speeds up to 1,000 Mbps or higher.
              </p>
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">How do I check live availability for ZIP code {currentZip}?</h3>
              <p className="text-sm text-gray-600 mt-1">
                Use our search widget above to enter your exact street address in {currentZip} to check live speeds, pricing, and available installation dates.
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