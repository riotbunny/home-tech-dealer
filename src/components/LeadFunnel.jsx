import React, { useState, useEffect } from 'react';
import { GoogleAddressAutocomplete } from './GoogleAddressAutocomplete';
import { 
  MapPin, 
  Gamepad2, 
  Briefcase, 
  Tv, 
  Globe, 
  ArrowRight, 
  CheckCircle2, 
  PhoneCall, 
  ShieldCheck,
  User,
  Phone,
  Activity,
  Wifi,
  Sparkles
} from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';

export function LeadFunnel({ phoneNumber, catalog = [] }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    address: '',
    usageType: '',
    firstName: '',
    phone: ''
  });
  const [progress, setProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState('Pinging local towers...');

  const telHref = `tel:${phoneNumber.replace(/\D/g, '')}`;

  const usageOptions = [
    { id: 'gaming', title: 'Hardcore Gaming', desc: 'Low ping, zero lag', icon: Gamepad2, color: 'text-purple-600', bg: 'bg-purple-100', border: 'border-purple-200' },
    { id: 'wfh', title: 'Work From Home', desc: 'Zoom, large uploads', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-100', border: 'border-blue-200' },
    { id: 'streaming', title: '4K Streaming', desc: 'Netflix, Hulu, Live TV', icon: Tv, color: 'text-rose-600', bg: 'bg-rose-100', border: 'border-rose-200' },
    { id: 'basic', title: 'Basic Browsing', desc: 'Email, social media', icon: Globe, color: 'text-emerald-600', bg: 'bg-emerald-100', border: 'border-emerald-200' }
  ];

  const handleNextStep = (nextStep) => {
    triggerHaptic('medium');
    setStep(nextStep);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startAnalysis = () => {
    triggerHaptic('heavy');
    setStep(4);
    setProgress(0);
    
    const duration = 4000;
    const interval = 50;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const percent = Math.min(100, Math.floor((currentStep / steps) * 100));
      setProgress(percent);

      if (percent < 25) setLoadingMessage('Pinging local towers...');
      else if (percent < 50) setLoadingMessage('Checking fiber node availability...');
      else if (percent < 75) setLoadingMessage('Applying unadvertised discounts...');
      else if (percent < 99) setLoadingMessage('Finalizing your top matches...');

      if (percent >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          triggerHaptic('success');
          setStep(5);
        }, 300);
      }
    }, interval);
  };

  // Select top 2 providers from catalog
  const activeProviders = catalog.filter(p => !p.paused).slice(0, 2);

  return (
    <div className="w-full bg-slate-50 min-h-[calc(100vh-80px)] flex flex-col pt-6 pb-24 px-4 sm:px-6">
      <div className="max-w-xl mx-auto w-full flex-1 flex flex-col">
        
        {/* Progress Tracker (Steps 1-3) */}
        {step < 4 && (
          <div className="mb-8">
            <div className="flex items-center justify-between relative mb-2">
              <div className="absolute left-0 right-0 top-1/2 h-1 bg-slate-200 -z-10 rounded-full" />
              {[1, 2, 3].map((num) => (
                <div 
                  key={num}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    step >= num ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {num}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <span>Address</span>
              <span className="pl-4">Usage</span>
              <span>Details</span>
            </div>
          </div>
        )}

        {/* STEP 1: ADDRESS */}
        {step === 1 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 border border-slate-100 animate-fade-in flex-1 flex flex-col">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
                Where do you need service?
              </h1>
              <p className="text-slate-500 text-sm">
                Enter your exact address to see the absolute fastest speeds available at your home.
              </p>
            </div>

            <div className="mt-auto mb-auto">
              <GoogleAddressAutocomplete 
                value={formData.address}
                onChange={(val) => setFormData({...formData, address: val})}
                onSelectAddress={(val) => {
                  setFormData({...formData, address: val});
                  setTimeout(() => handleNextStep(2), 400);
                }}
                placeholder="123 Main St, City, Zip"
                inputClassName="py-4 text-lg border-2 border-slate-200 focus:border-blue-600 rounded-2xl shadow-sm"
              />
            </div>

            <button
              onClick={() => handleNextStep(2)}
              disabled={formData.address.length < 5}
              className="mt-8 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-lg font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
            >
              <span>Continue</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* STEP 2: USAGE */}
        {step === 2 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 border border-slate-100 animate-fade-in flex-1 flex flex-col">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
                How do you use the internet?
              </h2>
              <p className="text-slate-500 text-sm">
                This helps us filter out weak plans and find the bandwidth that matches your lifestyle.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto mb-auto">
              {usageOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setFormData({...formData, usageType: opt.id});
                    setTimeout(() => handleNextStep(3), 300);
                  }}
                  className={`flex flex-col items-center text-center p-5 rounded-2xl border-2 transition-all ${
                    formData.usageType === opt.id 
                      ? 'border-blue-600 bg-blue-50 shadow-md shadow-blue-500/10 scale-[1.02]' 
                      : 'border-slate-100 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${opt.bg} ${opt.color}`}>
                    <opt.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">{opt.title}</h3>
                  <p className="text-[11px] text-slate-500 leading-tight">{opt.desc}</p>
                </button>
              ))}
            </div>

            <button
              onClick={() => handleNextStep(3)}
              disabled={!formData.usageType}
              className="mt-8 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-lg font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
            >
              <span>Continue</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* STEP 3: CONTACT INFO */}
        {step === 3 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 border border-slate-100 animate-fade-in flex-1 flex flex-col">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
                Who should we reserve this for?
              </h2>
              <p className="text-slate-500 text-sm">
                We're holding real-time deals in {formData.address ? formData.address.split(',')[0] : 'your area'}.
              </p>
            </div>

            <div className="space-y-5 mt-auto mb-auto">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">First Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    placeholder="e.g. John"
                    className="w-full pl-11 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-lg font-medium text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone className="w-5 h-5 text-slate-400" />
                  </div>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="(555) 123-4567"
                    className="w-full pl-11 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-lg font-medium text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={startAnalysis}
              disabled={!formData.firstName || formData.phone.length < 10}
              className="mt-8 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-lg font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
            >
              <span>Check My Availability</span>
              <Sparkles className="w-5 h-5" />
            </button>
            <p className="text-center text-[10px] text-slate-400 mt-4 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              Your information is secure and encrypted.
            </p>
          </div>
        )}

        {/* STEP 4: ANALYZING METER (Loading) */}
        {step === 4 && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 animate-fade-in flex-1 flex flex-col items-center justify-center text-center">
            
            <div className="relative w-40 h-40 mb-8">
              {/* Outer pulse */}
              <div className="absolute inset-0 rounded-full border-4 border-blue-100 animate-ping opacity-75"></div>
              {/* Inner Circle */}
              <div className="absolute inset-2 rounded-full border-4 border-slate-100"></div>
              {/* Progress Arc Mock */}
              <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="74"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-blue-600 transition-all duration-300 ease-out"
                  strokeDasharray={`${(progress / 100) * 465} 465`}
                  strokeLinecap="round"
                />
              </svg>
              {/* Center Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Activity className="w-8 h-8 text-blue-600 mb-1 animate-pulse" />
                <span className="text-2xl font-extrabold text-slate-900">{progress}%</span>
              </div>
            </div>

            <h2 className="text-xl font-bold text-slate-900 mb-2">Analyzing Connection...</h2>
            <p className="text-slate-500 text-sm h-6 transition-all">{loadingMessage}</p>

          </div>
        )}

        {/* STEP 5: RESULTS & CALL NOW */}
        {step === 5 && (
          <div className="animate-fade-in flex-1 flex flex-col">
            <div className="bg-emerald-600 text-white rounded-3xl p-8 text-center shadow-lg shadow-emerald-500/20 mb-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Wifi className="w-32 h-32" />
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-extrabold mb-2">Great news, {formData.firstName}!</h2>
                <p className="text-emerald-100 text-sm sm:text-base">
                  We found {activeProviders.length} high-speed providers available at your address today.
                </p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {activeProviders.map((provider) => (
                <div key={provider.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {provider.customLogo ? (
                      <img src={provider.customLogo} alt={provider.name} className="h-8 w-auto object-contain" />
                    ) : (
                      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-600 text-xs">
                        {provider.name}
                      </div>
                    )}
                    <div>
                      <h3 className="font-bold text-slate-900">{provider.name}</h3>
                      <p className="text-xs text-slate-500">Up to {provider.plans?.[0]?.downloadSpeed || '1000 Mbps'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-green-600 font-bold uppercase tracking-wider mb-0.5">Available</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 text-center border border-blue-200 shadow-xl shadow-blue-500/10 mt-auto">
              <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-2">Lock In Your Rate</p>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-6">Call now to claim these unadvertised deals before they expire.</h3>
              
              <a
                href={telHref}
                onClick={() => triggerHaptic('heavy')}
                className="w-full flex flex-col items-center justify-center py-5 bg-gradient-to-b from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-2xl shadow-xl shadow-green-500/30 transform hover:scale-[1.02] active:scale-95 transition-all"
              >
                <div className="flex items-center gap-3 mb-1">
                  <PhoneCall className="w-7 h-7 fill-white/20 animate-pulse" />
                  <span className="text-3xl font-extrabold tracking-tight">{phoneNumber}</span>
                </div>
                <span className="text-sm font-bold text-green-100">Live Agents Available • Fast Setup</span>
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
