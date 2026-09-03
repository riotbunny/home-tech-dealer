import React, { useState } from 'react';
import { 
  X, 
  Users, 
  Laptop, 
  Gamepad2, 
  Tv, 
  Check, 
  ArrowRight, 
  Wifi, 
  Zap
} from 'lucide-react';

export function SpeedQuizModal({ isOpen, onClose, onApplySpeedFilter }) {
  const [householdSize, setHouseholdSize] = useState('3-4');
  const [activities, setActivities] = useState(['streaming', 'work']);
  const [deviceCount, setDeviceCount] = useState('10-15');

  if (!isOpen) return null;

  const toggleActivity = (id) => {
    setActivities(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const getRecommendation = () => {
    let score = 0;
    if (householdSize === '1-2') score += 1;
    if (householdSize === '3-4') score += 2;
    if (householdSize === '5+') score += 3;

    if (activities.includes('streaming')) score += 1;
    if (activities.includes('work')) score += 1;
    if (activities.includes('gaming')) score += 2;
    if (activities.includes('smarthome')) score += 1;

    if (deviceCount === '1-5') score += 0;
    if (deviceCount === '6-10') score += 1;
    if (deviceCount === '10-15') score += 2;
    if (deviceCount === '16+') score += 3;

    if (score <= 3) {
      return {
        tier: '300',
        label: '300 Mbps High-Speed',
        headline: 'Great for Everyday Browsing & HD Streaming',
        desc: 'Plenty of speed for 1–2 users watching HD movies, browsing the web, and casual remote work.',
        badge: 'Best Value Pick'
      };
    } else if (score <= 6) {
      return {
        tier: '500',
        label: '500 Mbps Super-Fast',
        headline: 'Ideal for Families & Remote Work',
        desc: 'Easily handles multiple 4K video streams, simultaneous Zoom calls, and dozens of smart home devices with zero buffering.',
        badge: 'Most Popular Recommendation'
      };
    } else {
      return {
        tier: '1000',
        label: '1 Gig (1000 Mbps) Gigabit Fiber',
        headline: 'Ultimate Speed for Gaming & Heavy Households',
        desc: 'Lightning-fast gigabit speeds. Download full movies in seconds, stream on 10+ screens at once, and game with ultra-low latency.',
        badge: 'Maximum Performance'
      };
    }
  };

  const recommendation = getRecommendation();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Internet Speed Matcher
              </h3>
              <p className="text-xs text-slate-500">
                Answer 3 quick questions to discover the right speed for your home.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[75vh]">
          
          {/* Question 1 */}
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block mb-2">
              1. How many people use the internet in your home?
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: '1-2', label: '1 - 2 People', icon: Users },
                { id: '3-4', label: '3 - 4 People', icon: Users },
                { id: '5+', label: '5+ People', icon: Users }
              ].map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setHouseholdSize(opt.id)}
                  className={`p-3 rounded-2xl border text-xs font-semibold flex flex-col items-center gap-2 transition-all ${
                    householdSize === opt.id
                      ? 'bg-blue-50 border-blue-600 text-blue-800 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <opt.icon className="w-5 h-5 text-blue-600" />
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Question 2 */}
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block mb-2">
              2. What do you do online? (Select all that apply)
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'streaming', label: '4K Movie Streaming', icon: Tv },
                { id: 'work', label: 'Remote Work & Video Calls', icon: Laptop },
                { id: 'gaming', label: 'Online Gaming', icon: Gamepad2 },
                { id: 'smarthome', label: 'Smart Home & Cameras', icon: Wifi }
              ].map(act => {
                const isSelected = activities.includes(act.id);
                return (
                  <button
                    key={act.id}
                    type="button"
                    onClick={() => toggleActivity(act.id)}
                    className={`p-3 rounded-2xl border text-xs font-semibold flex items-center justify-between transition-all text-left ${
                      isSelected
                        ? 'bg-blue-50 border-blue-600 text-blue-800 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <act.icon className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{act.label}</span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-blue-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 3 */}
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block mb-2">
              3. Approximately how many connected devices in your home?
            </label>
            <div className="grid grid-cols-4 gap-2">
              {['1-5', '6-10', '10-15', '16+'].map(count => (
                <button
                  key={count}
                  type="button"
                  onClick={() => setDeviceCount(count)}
                  className={`py-2 px-2 rounded-xl border text-xs font-semibold text-center transition-all ${
                    deviceCount === count
                      ? 'bg-blue-50 border-blue-600 text-blue-800 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{count} Devices</span>
                </button>
              ))}
            </div>
          </div>

          {/* Recommendation Box */}
          <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase bg-blue-600 text-white px-2 py-0.5 rounded-full">
                {recommendation.badge}
              </span>
              <span className="text-xs font-bold text-blue-700">
                Recommended Speed
              </span>
            </div>

            <div className="text-xl font-extrabold text-slate-900">
              {recommendation.label}
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {recommendation.desc}
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  onApplySpeedFilter(recommendation.tier);
                  onClose();
                }}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <span>View {recommendation.label} Plans at My Address</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
