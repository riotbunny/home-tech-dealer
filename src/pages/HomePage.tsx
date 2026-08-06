import React, { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Zap, ShieldCheck, DollarSign, MapPin, CheckCircle2 } from 'lucide-react';
import MyFinanceWidget from '../components/MyFinanceWidget';

export const HomePage: React.FC = () => {
  const [zipInput, setZipInput] = useState('');
  const navigate = useNavigate();

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
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            Find the Best High-Speed Internet in Your Area
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Compare live speeds, coverage maps, and exclusive pricing from top nationwide providers.
          </p>

          {/* ZIP Code Search Bar */}
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
        {/* Featured Widget Search Box */}
        <section>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Live Provider Availability &amp; Custom Offers
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Search live deals active in your immediate neighborhood.
            </p>
          </div>
          <MyFinanceWidget zipCode={zipInput || '78520'} />
        </section>

        {/* Core Value Props */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Gigabit Speeds</h3>
            <p className="text-sm text-gray-600">
              Find fiber optic and high-speed broadband connections capable of up to 5,000 Mbps.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Exclusive Savings</h3>
            <p className="text-sm text-gray-600">
              Unlock promotional introductory rates, contract buyouts, and gift card incentives.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Verified Coverage</h3>
            <p className="text-sm text-gray-600">
              View accurate FCC-verified availability maps for cable, fiber, satellite, and 5G wireless.
            </p>
          </div>
        </section>

        {/* Quick Location Shortcuts (Internal SEO Links) */}
        <section className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Popular Internet Search Locations
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-sm">
            <Link to="/internet/ca/beverly-hills/90210" className="text-blue-600 hover:underline flex items-center space-x-1">
              <CheckCircle2 className="w-4 h-4 text-blue-500" />
              <span>Beverly Hills, CA (90210)</span>
            </Link>
            <Link to="/internet/tx/brownsville/78520" className="text-blue-600 hover:underline flex items-center space-x-1">
              <CheckCircle2 className="w-4 h-4 text-blue-500" />
              <span>Brownsville, TX (78520)</span>
            </Link>
            <Link to="/internet/fl/miami/33101" className="text-blue-600 hover:underline flex items-center space-x-1">
              <CheckCircle2 className="w-4 h-4 text-blue-500" />
              <span>Miami, FL (33101)</span>
            </Link>
            <Link to="/internet/ny/new-york/10001" className="text-blue-600 hover:underline flex items-center space-x-1">
              <CheckCircle2 className="w-4 h-4 text-blue-500" />
              <span>New York, NY (10001)</span>
            </Link>
            <Link to="/internet/il/chicago/60601" className="text-blue-600 hover:underline flex items-center space-x-1">
              <CheckCircle2 className="w-4 h-4 text-blue-500" />
              <span>Chicago, IL (60601)</span>
            </Link>
            <Link to="/internet/az/phoenix/85001" className="text-blue-600 hover:underline flex items-center space-x-1">
              <CheckCircle2 className="w-4 h-4 text-blue-500" />
              <span>Phoenix, AZ (85001)</span>
            </Link>
          </div>
        </section>
      </main>

      {/* Simple Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-4 text-center text-xs border-t border-gray-800">
        <div className="max-w-5xl mx-auto space-y-3">
          <div className="flex justify-center space-x-6 text-gray-300 font-medium">
            <Link to="/about" className="hover:underline">About</Link>
            <Link to="/contact" className="hover:underline">Contact</Link>
            <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:underline">Terms of Service</Link>
          </div>
          <p>© {new Date().getFullYear()} Home Tech Dealer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;