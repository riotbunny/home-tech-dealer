import React, { useState, FormEvent, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Zap, ShieldCheck, DollarSign, MapPin, CheckCircle2, PhoneCall, Clock } from 'lucide-react';
import MyFinanceWidget from '../components/MyFinanceWidget';

export const HomePage: React.FC = () => {
  const [zipInput, setZipInput] = useState('');
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const navigate = useNavigate();

  // PHONE & HOURS CONFIGURATION ($150 Payout Integration)
  const PHONE_NUMBER = "1-855-215-8469";
  const TEL_HREF = "tel:18552158469";
  const HOURS_DISPLAY = "Mon–Fri 7am–8pm CT | Sat 9am–5pm CT";

  // DYNAMIC IP & GEOLOCATION AUTO-ROUTING
  useEffect(() => {
    let isMounted = true;

    fetch('https://ipapi.co/json/')
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data && data.postal) {
          const userZip = data.postal.trim();
          const state = (data.region_code || 'tx').toLowerCase();
          
          // Format real city name (e.g., "Brownsville" -> "brownsville")
          const rawCity = data.city || 'area';
          const citySlug = rawCity.toLowerCase().replace(/[^a-z0-9]+/g, '-');

          setZipInput(userZip);

          // Auto-route root traffic to exact city/state/zip page
          if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
            navigate(`/internet/${state}/${citySlug}/${userZip}`, { replace: true });
          }
        }
      })
      .catch((err) => {
        console.warn('GeoIP lookup failed, keeping default view:', err);
      });

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const cleanedZip = zipInput.trim();
    if (cleanedZip) {
      // Use 'area' fallback slug for manual searches
      navigate(`/internet/tx/area/${cleanedZip}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col text-gray-900 font-sans pb-20">
      
      {/* Primary Sticky Top Announcement Bar */}
      <div className="bg-amber-400 text-amber-950 font-bold text-center py-2.5 px-4 text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 shadow-md sticky top-0 z-40">
        <div className="flex items-center space-x-1.5">
          <PhoneCall className="w-4 h-4 animate-bounce text-amber-900" />
          <span>Call Home Tech Dealer Sales Center:</span>
          <a href={TEL_HREF} className="underline hover:text-black font-black text-sm sm:text-base">
            {PHONE_NUMBER}
          </a>
        </div>
        <div className="flex items-center text-amber-900 text-xs font-semibold space-x-1">
          <Clock className="w-3.5 h-3.5" />
          <span>{HOURS_DISPLAY}</span>
        </div>
      </div>

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
          <p className="text-xs text-blue-200 mt-3">
            Or skip searching and call <a href={TEL_HREF} className="font-bold text-amber-400 underline">{PHONE_NUMBER}</a> for live address lookup.
          </p>
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
          
          {/* Custom MyFinanceWidget Preserved */}
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

      {/* SEO & Legal Compliant Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10 px-4 text-xs border-t border-gray-800 text-center">
        <div className="max-w-5xl mx-auto space-y-4">
          
          {/* Modal Triggers */}
          <div className="flex flex-wrap justify-center items-center gap-4 text-gray-300 font-medium text-xs">
            <button onClick={() => setActiveModal('privacy')} className="hover:text-amber-400 transition-colors">Privacy Policy</button>
            <span>•</span>
            <button onClick={() => setActiveModal('terms')} className="hover:text-amber-400 transition-colors">Terms of Service</button>
            <span>•</span>
            <button onClick={() => setActiveModal('disclaimer')} className="hover:text-amber-400 transition-colors">Disclaimer</button>
            <span>•</span>
            <button onClick={() => setActiveModal('dnc')} className="hover:text-amber-400 transition-colors">Do Not Call Policy</button>
          </div>

          <p className="max-w-3xl mx-auto text-[11px] text-gray-500 leading-relaxed">
            Home Tech Dealer is an independent provider comparison platform and marketing partner. Trademarks, service marks, logos, and brand names featured on this site are the property of their respective owners. Speeds and availability vary by address.
          </p>

          <p>© {new Date().getFullYear()} Home Tech Dealer. All rights reserved.</p>
        </div>
      </footer>

      {/* Sticky Bottom Mobile/Desktop Call Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-blue-950 text-white border-t-2 border-amber-400 p-3 shadow-2xl z-50 flex items-center justify-between px-4 sm:px-8">
        <div className="flex items-center space-x-3">
          <div className="bg-amber-400 text-amber-950 p-2 rounded-full animate-bounce hidden sm:block">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-blue-200 font-semibold uppercase tracking-wider hidden sm:block">
              Fastest Setup Option
            </p>
            <p className="text-sm sm:text-base font-black text-amber-400">
              Speak With a Local Internet Specialist
            </p>
          </div>
        </div>

        <a
          href={TEL_HREF}
          className="bg-amber-400 hover:bg-amber-300 text-amber-950 font-black px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl shadow-lg text-sm sm:text-base flex items-center space-x-2 transition-transform active:scale-95 whitespace-nowrap"
        >
          <PhoneCall className="w-4 h-4 fill-current" />
          <span>Call {PHONE_NUMBER}</span>
        </a>
      </div>

      {/* Pop-up Legal Overlay Modal */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] flex flex-col overflow-hidden shadow-2xl border border-gray-200 text-gray-800 text-left">
            <div className="p-4 bg-gray-900 text-white flex justify-between items-center">
              <h3 className="font-bold text-lg capitalize">
                {activeModal === 'dnc' ? 'Do Not Call Policy' : `${activeModal} Policy`}
              </h3>
              <button 
                onClick={() => setActiveModal(null)} 
                className="text-gray-400 hover:text-white font-bold text-xl px-2"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm leading-relaxed text-gray-600">
              {activeModal === 'privacy' && (
                <>
                  <p><strong>Privacy Policy:</strong> Home Tech Dealer respects your privacy. We collect minimal personal information solely for facilitating broadband and telecommunication service connections with verified providers.</p>
                  <p>Information requested over the phone or through explicit input is used strictly to verify geographic coverage and route requests. We do not sell or rent user data to unauthorized third-party marketers.</p>
                </>
              )}

              {activeModal === 'terms' && (
                <>
                  <p><strong>Terms of Service:</strong> By accessing Home Tech Dealer, you agree to use our information services for personal, non-commercial service comparison purposes.</p>
                  <p>Pricing, speed tiers, and promotional estimates are provided for informational purposes only. Final rates, installation schedules, and terms are governed by the primary telecommunication service provider upon account confirmation.</p>
                </>
              )}

              {activeModal === 'disclaimer' && (
                <>
                  <p><strong>Affiliate &amp; Partner Disclaimer:</strong> Home Tech Dealer operates as an independent referral resource and authorized marketing dealer.</p>
                  <p>All trademarks, trade names, and logos displayed remain the property of their respective owners. Mention of third-party brand names does not imply direct endorsement unless explicitly noted. Speeds, pricing, and availability vary by address.</p>
                </>
              )}

              {activeModal === 'dnc' && (
                <>
                  <p><strong>Do Not Call Policy:</strong> Home Tech Dealer strictly adheres to TCPA and federal Do Not Call guidelines.</p>
                  <p>Telephone requests placed to 1-855-215-8469 connect directly to authorized sales agents. You may request to be placed on our internal Do Not Call list at any time during a call or by written request.</p>
                </>
              )}
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-200 text-right">
              <button 
                onClick={() => setActiveModal(null)} 
                className="bg-blue-900 text-white font-bold px-5 py-2 rounded-lg text-xs hover:bg-blue-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;