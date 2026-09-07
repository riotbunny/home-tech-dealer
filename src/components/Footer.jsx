import React from 'react';
import { Wifi, ShieldCheck, PhoneCall, CheckCircle2, Lock, MapPin, Compass } from 'lucide-react';
import { DEFAULT_PHONE_NUMBER } from '../services/catalogService';

export function Footer({ 
  onNavigate, 
  onOpenAdminLogin,
  phoneNumber = DEFAULT_PHONE_NUMBER,
  onOpenCityDirectory,
  onSelectCity
}) {
  const telHref = `tel:${phoneNumber.replace(/\D/g, '')}`;
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-400 text-xs pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
                <Wifi className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-base text-white">
                Home Tech Dealer <span className="text-blue-400">Inc.</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              America's simplest home broadband comparison marketplace. Comparing fiber, cable, satellite, and 5G internet across 27 national and regional providers.
            </p>
            <div className="pt-1 flex items-center gap-2 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Free Service &bull; Zero Markups or Hidden Fees</span>
            </div>
          </div>

          {/* Customer Navigation */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">
              Quick Links
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => onNavigate('qualifier')} className="hover:text-white transition-colors">
                  Find Internet at My Address
                </button>
              </li>
              {onOpenCityDirectory && (
                <li>
                  <button 
                    onClick={onOpenCityDirectory} 
                    className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Browse 50 US States Directory</span>
                  </button>
                </li>
              )}
              <li>
                <button onClick={() => onNavigate('mover')} className="hover:text-white transition-colors">
                  Moving Guide &amp; Checklist
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('providers')} className="hover:text-white transition-colors">
                  All 27 Providers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Toll-Free Customer Order Desk */}
          <div className="md:col-span-5 space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">
              Toll-Free Phone Order Desk
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Prefer speaking with a human? Call our direct concierge line to check promotional gift cards, lock in your rate, and pick an installation date.
            </p>
            <div className="pt-1">
              <a
                href={telHref}
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm transition-all shadow-sm"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call: {phoneNumber}</span>
              </a>
              <div className="text-xs text-slate-400 mt-1.5">
                Open 7 Days a Week &bull; Zero Hold Time
              </div>
            </div>
          </div>
        </div>

        {/* Crawlable Nationwide pSEO Directory Links for Googlebot & Users */}
        <div className="mt-8 pt-6 border-b border-slate-800 pb-8 space-y-6">
          {/* Section A: 50 State Hubs Backbone */}
          <div>
            <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>Browse 50 US States Internet Directories</span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-10 gap-x-2 gap-y-1.5 text-[11px] text-slate-400">
              {[
                'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
                'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
                'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
                'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
                'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
              ].map(st => (
                <a
                  key={st}
                  href={`/internet/${st.toLowerCase()}`}
                  onClick={(e) => {
                    if (onSelectCity) {
                      e.preventDefault();
                      onSelectCity(`/internet/${st.toLowerCase()}`);
                    }
                  }}
                  className="hover:text-cyan-300 transition-colors font-medium"
                >
                  {st} Internet
                </a>
              ))}
            </div>
          </div>

          {/* Section B: Popular Head-to-Head Carrier Comparisons */}
          <div>
            <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>Popular Provider Comparisons</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-1.5 text-xs text-slate-400">
              {[
                { name: 'Spectrum vs AT&T', path: '/compare/spectrum-vs-att' },
                { name: 'AT&T vs Xfinity', path: '/compare/att-vs-comcast' },
                { name: 'Verizon vs T-Mobile 5G', path: '/compare/verizon-vs-tmobile' },
                { name: 'Frontier vs Spectrum', path: '/compare/frontier-vs-spectrum' },
                { name: 'Cox vs AT&T Fiber', path: '/compare/cox-vs-att' },
                { name: 'Starlink vs ViaSat', path: '/compare/starlink-vs-viasat' },
                { name: 'Optimum vs Verizon', path: '/compare/optimum-vs-verizon' },
                { name: 'EarthLink vs AT&T', path: '/compare/earthlink-vs-att' }
              ].map(comp => (
                <a
                  key={comp.path}
                  href={comp.path}
                  onClick={(e) => {
                    if (onSelectCity) {
                      e.preventDefault();
                      onSelectCity(comp.path);
                    }
                  }}
                  className="hover:text-amber-300 transition-colors truncate"
                >
                  {comp.name}
                </a>
              ))}
            </div>
          </div>

          {/* Section C: Top Metro Markets */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
              <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-cyan-400" />
                <span>Top Metro Markets (44k ZIP Footprint)</span>
              </div>
              {onOpenCityDirectory && (
                <button
                  onClick={onOpenCityDirectory}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-bold underline"
                >
                  View Full 50-State Directory &rarr;
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-x-4 gap-y-2 text-xs text-slate-400">
              {[
                { name: 'Brownsville, TX 78522', path: '/internet/tx/brownsville/78522' },
                { name: 'Austin, TX 78701', path: '/internet/tx/austin/78701' },
                { name: 'Dallas, TX 75201', path: '/internet/tx/dallas/75201' },
                { name: 'Houston, TX 77002', path: '/internet/tx/houston/77002' },
                { name: 'Los Angeles, CA 90012', path: '/internet/ca/los-angeles/90012' },
                { name: 'San Francisco, CA 94102', path: '/internet/ca/san-francisco/94102' },
                { name: 'Miami, FL 33101', path: '/internet/fl/miami/33101' },
                { name: 'Orlando, FL 32801', path: '/internet/fl/orlando/32801' },
                { name: 'Tampa, FL 33602', path: '/internet/fl/tampa/33602' },
                { name: 'New York, NY 10001', path: '/internet/ny/new-york/10001' },
                { name: 'Chicago, IL 60601', path: '/internet/il/chicago/60601' },
                { name: 'Columbus, OH 43215', path: '/internet/oh/columbus/43215' },
                { name: 'Seattle, WA 98101', path: '/internet/wa/seattle/98101' },
                { name: 'Phoenix, AZ 85004', path: '/internet/az/phoenix/85004' },
                { name: 'Atlanta, GA 30303', path: '/internet/ga/atlanta/30303' },
                { name: 'Denver, CO 80202', path: '/internet/co/denver/80202' },
                { name: 'Philadelphia, PA 19107', path: '/internet/pa/philadelphia/19107' },
                { name: 'Boston, MA 02201', path: '/internet/ma/boston/02201' },
                { name: 'Nashville, TN 37201', path: '/internet/tn/nashville/37201' },
                { name: 'Salt Lake City, UT 84111', path: '/internet/ut/salt-lake-city/84111' }
              ].map(city => (
                <a
                  key={city.path}
                  href={city.path}
                  onClick={(e) => {
                    if (onSelectCity) {
                      e.preventDefault();
                      onSelectCity(city.path);
                    }
                  }}
                  className="hover:text-cyan-300 transition-colors truncate"
                >
                  Internet in {city.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Carrier Disclaimers & Trademarks */}
        <div className="mt-8 pt-2 text-[11px] text-slate-500 space-y-2 leading-relaxed">
          <p>
            Trademarks: Verizon, T-Mobile, EarthLink, Starlink, AT&amp;T, Spectrum, Xfinity (Comcast), Frontier, Cox, Optimum, Ziply, DIRECTV, Mediacom, Astound, Kinetic, Metronet, Breezeline, TDS, WOW!, Clearwave, Altafiber, Buckeye, Bend, Hawaiian Telcom, Consolidated (Fidium), SmithVille, and ViaSat are registered trademarks of their respective owners.
          </p>
          <p>
            Home Tech Dealer Inc. is an independent consumer comparison marketplace. Pricing, gift cards, and technician availability are subject to carrier confirmation at your specific address.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-400">
            <div className="flex items-center gap-2.5">
              <span>© 2026 Home Tech Dealer Inc. All rights reserved.</span>
              <span className="text-slate-600">&bull;</span>
              <button
                onClick={onOpenAdminLogin}
                className="text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1 text-[11px]"
                title="Carrier Pricing & Package Admin"
              >
                <Lock className="w-3 h-3 text-slate-500" />
                <span>Admin Management</span>
              </button>
            </div>
            <div className="text-xs text-slate-400">
              Toll-Free Support &amp; Orders: {phoneNumber}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
