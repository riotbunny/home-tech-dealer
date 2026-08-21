import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  HelpCircle, 
  PhoneCall, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  AlertCircle, 
  MapPin, 
  Activity, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  Lock,
  Radio,
  UserCheck
} from 'lucide-react';
import { supabase } from '../lib/supabase';

export const SecurityZipPage: React.FC = () => {
  const { state, city, zipCode } = useParams<{ state?: string; city?: string; zipCode?: string }>();
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [nearbyZips, setNearbyZips] = useState<string[]>([]);
  const [expandedPackages, setExpandedPackages] = useState<{ [key: number]: boolean }>({});
  const [localStats, setLocalStats] = useState({
    providerCount: 3,
    maxSpeed: 'Pro Monitoring',
    hasFiber: true,
    county: '',
  });

  // PHONE & HOURS CONFIGURATION (Route to ADT Partnership Line)
  const PHONE_NUMBER = "1-855-215-8469";
  const TEL_HREF = "tel:18552158469";
  const HOURS_DISPLAY = "Mon–Fri 7am–8pm CT | Sat 9am–5pm CT";

  // CONVERSION EVENT TRACKER
  const trackCall = (buttonSource: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        event_category: 'Security_Lead',
        event_action: 'Phone_Call_Click',
        event_label: `security_${buttonSource}_${zipCode || 'unknown'}`,
        value: 1.0,
      });
    }
  };

  const rawCity = city?.trim() || '';
  const rawState = state?.trim() || '';
  const currentZip = zipCode?.trim() || '';

  const isInvalid = (str: string) =>
    !str || ['unknown', 'unknown-city', '00000', '000', 'null', 'undefined'].includes(str.toLowerCase());

  const hasValidLocation = Boolean(
    rawCity && rawState && currentZip && !isInvalid(rawCity) && !isInvalid(rawState) && !isInvalid(currentZip)
  );

  const formattedCity = hasValidLocation
    ? rawCity.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : 'Your Location';
  const formattedState = hasValidLocation ? rawState.toUpperCase() : '';
  const locationTitle = hasValidLocation ? `${formattedCity}, ${formattedState} (${currentZip})` : 'Your Location';
  const displayZip = hasValidLocation ? currentZip : 'Your Location';

  const canonicalUrl = hasValidLocation
    ? `https://hometechdealer.com/security/${rawState.toLowerCase()}/${rawCity.toLowerCase()}/${currentZip}`
    : `https://hometechdealer.com/security`;

  const togglePackageSpecs = (index: number) => {
    setExpandedPackages((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const adtPackages = [
    {
      name: "ADT Smart Home Security",
      badge: "Authorized ADT Partnership",
      badgeColor: "bg-red-600 text-white",
      highlightText: "Professional 24/7 monitoring with Google Nest integration",
      startingPrice: "$24.99/mo*",
      unclaimedPromo: "Free Security Equipment Package Available",
      topSpeed: "24/7 Live Monitoring",
      features: ["Professional Installation", "Mobile App Control", "Zero False Alarm Guarantee"],
    },
    {
      name: "ADT Video & Smart Automation",
      badge: "Best Value Bundle",
      badgeColor: "bg-amber-400 text-amber-950",
      highlightText: "Includes smart doorbell cameras, HD outdoor cams, and automated locks",
      startingPrice: "$45.99/mo*",
      unclaimedPromo: "Free Video Doorbell Promo Active in " + displayZip,
      topSpeed: "HD Live Streaming",
      features: ["Smart Doorbell Camera Included", "Voice Control Ready", "Instant Mobile Alerts"],
    },
  ];

  useEffect(() => {
    document.title = hasValidLocation
      ? `ADT Home Security Systems in ${formattedCity}, ${formattedState} (${currentZip}) | Home Tech Dealer`
      : `Compare ADT Home Security Systems in Your Location | Home Tech Dealer`;
  }, [hasValidLocation, formattedCity, formattedState, currentZip]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col text-gray-900 font-sans pb-20 md:pb-0">
      {/* Persistent Floating Bottom Bar on Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-red-600 border-t-2 border-red-700 p-3 z-50 md:hidden shadow-2xl flex items-center justify-between gap-2">
        <div className="text-white text-xs font-black leading-tight">
          <span className="block">ADT Security Specialists Active</span>
          <span className="text-[10px] text-red-100 font-bold">{HOURS_DISPLAY}</span>
        </div>
        <a
          href={TEL_HREF}
          onClick={() => trackCall('mobile_bottom_floating_bar')}
          className="bg-gray-900 text-white font-black px-5 py-2.5 rounded-xl text-sm flex items-center gap-2 shadow-lg active:scale-95 transition-transform whitespace-nowrap"
        >
          <PhoneCall className="w-4 h-4 text-red-500 fill-red-500" />
          <span>CALL {PHONE_NUMBER}</span>
        </a>
      </div>

      {/* Primary Sticky Top Bar */}
      <div className="bg-red-600 text-white font-black text-center py-2.5 px-4 text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 shadow-md sticky top-0 z-40">
        <div className="flex items-center space-x-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400"></span>
          </span>
          <span className="uppercase tracking-wide text-xs font-black">Authorized ADT Dispatch Line:</span>
          <a href={TEL_HREF} onClick={() => trackCall('sticky_top_bar')} className="underline hover:text-gray-200 text-sm sm:text-base font-black">
            {PHONE_NUMBER}
          </a>
        </div>
      </div>

      {/* Hero Header Section */}
      <section className="bg-gradient-to-b from-gray-900 via-blue-950 to-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-gray-900/90 border border-gray-700 px-4 py-1.5 rounded-full text-xs font-bold text-red-400">
            <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
            <span>Official ADT Security Partnership Zone: <strong className="text-white">{locationTitle}</strong></span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Protect Your Home With Verified <span className="text-red-500 underline decoration-red-500/40">ADT Security Systems</span> in {locationTitle}
          </h1>

          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto font-medium">
            Secure your property with 24/7 professional monitoring, smart home automation, and unadvertised equipment bundle promos.
          </p>

          {/* Call Box */}
          <div className="bg-gradient-to-br from-gray-900 via-blue-950 to-gray-950 border-2 border-red-500 p-6 sm:p-8 rounded-3xl max-w-xl mx-auto shadow-2xl space-y-4">
            <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Call <a href={TEL_HREF} onClick={() => trackCall('hero_box_number_link')} className="text-red-500 underline hover:text-red-400">{PHONE_NUMBER}</a>
            </div>
            <a
              href={TEL_HREF}
              onClick={() => trackCall('hero_primary_button')}
              className="inline-flex items-center justify-center space-x-3 bg-red-600 hover:bg-red-500 text-white font-black px-8 py-4 rounded-2xl shadow-2xl text-xl transition-all duration-200 transform active:scale-95 w-full border-b-4 border-red-800"
            >
              <PhoneCall className="w-6 h-6 fill-white" />
              <span>CLAIM ADT PROMOS: {PHONE_NUMBER}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 py-10 flex-grow w-full space-y-10">
        <section className="space-y-6">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-black text-gray-900 mb-1">
              Available ADT Security Packages in {locationTitle}
            </h2>
            <p className="text-gray-600 text-sm max-w-2xl mx-auto font-medium">
              Call <a href={TEL_HREF} onClick={() => trackCall('subheading_phone_link')} className="font-black text-red-600 underline">{PHONE_NUMBER}</a> to verify equipment eligibility for ZIP {displayZip}.
            </p>
          </div>

          <div className="space-y-4">
            {adtPackages.map((pkg, idx) => (
              <article key={idx} className="bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden">
                <div className="p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-1.5 max-w-lg">
                    <span className={`inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-0.5 rounded-md uppercase tracking-wide ${pkg.badgeColor}`}>
                      <Sparkles className="w-3 h-3 fill-current" />
                      {pkg.badge}
                    </span>
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">{pkg.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium">{pkg.highlightText}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-[11px] text-gray-500 font-extrabold uppercase block">Starting At</span>
                      <div className="text-xl font-black text-gray-900">{pkg.startingPrice}</div>
                    </div>
                    <a
                      href={TEL_HREF}
                      onClick={() => trackCall(`security_lock_${pkg.name}`)}
                      className="bg-red-600 hover:bg-red-500 text-white font-black px-5 py-3 rounded-xl shadow-md text-sm transition-transform active:scale-95 whitespace-nowrap"
                    >
                      Call {PHONE_NUMBER}
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10 px-4 text-xs border-t border-gray-800 text-center">
        <p>© {new Date().getFullYear()} Home Tech Dealer &amp; ADT Authorized Provider. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SecurityZipPage;