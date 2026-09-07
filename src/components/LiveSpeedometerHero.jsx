import React, { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

export function LiveSpeedometerHero({ onSelectSpeedTier }) {
  const [selectedPreset, setSelectedPreset] = useState('300');
  const [displayedSpeed, setDisplayedSpeed] = useState(300);

  const presets = [
    {
      id: '300',
      label: '300 Mbps',
      tier: 'Streaming & 4K',
      speed: 300,
      desc: 'Great for 3-5 devices, streaming Netflix, and fast downloads.',
      tech: '5G & Basic Fiber'
    },
    {
      id: '500',
      label: '500 Mbps',
      tier: 'Work & Gaming',
      speed: 500,
      desc: 'Smooth video calls, cloud backup, and multiple people online.',
      tech: 'Fast Fiber & 5G'
    },
    {
      id: '1000',
      label: '1000 Mbps',
      tier: 'Gigabit Internet',
      speed: 1000,
      desc: 'Maximum speed for large homes and heavy internet users.',
      tech: 'High-Speed Fiber'
    },
    {
      id: 'starlink',
      label: 'Satellite',
      tier: 'Remote Areas',
      speed: 180,
      desc: 'High-speed internet anywhere with a clear view of the sky.',
      tech: 'Satellite Internet'
    }
  ];

  const activePresetData = presets.find(p => p.id === selectedPreset) || presets[0];

  // Calculate needle rotation angle (0 to 1000 Mbps maps from -110deg to +110deg)
  const calculateAngle = (speed) => {
    const minAngle = -115;
    const maxAngle = 115;
    const clampedSpeed = Math.min(Math.max(speed, 0), 1000);
    return minAngle + (clampedSpeed / 1000) * (maxAngle - minAngle);
  };

  const needleAngle = calculateAngle(displayedSpeed);

  // Smooth number interpolation when switching presets
  useEffect(() => {
    const targetSpeed = activePresetData.speed;
    setDisplayedSpeed(targetSpeed);
  }, [selectedPreset]);

  return (
    <div className="w-full max-w-xl mx-auto rounded-[2rem] bg-white/70 backdrop-blur-2xl border border-white/60 p-6 sm:p-8 shadow-2xl shadow-indigo-900/10 text-slate-800 relative overflow-hidden transition-all hover:shadow-indigo-900/15">
      
      {/* Background Soft Glow */}
      <div className="absolute -right-20 -top-20 w-60 h-60 bg-blue-100 rounded-full blur-[80px] pointer-events-none opacity-50" />
      <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-emerald-50 rounded-full blur-[80px] pointer-events-none opacity-50" />

      {/* Top Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-200/60 pb-4 mb-2 relative">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
          <span className="text-xs font-bold tracking-widest text-slate-500 uppercase font-sans">
            Live Speed Simulator
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-sans font-semibold text-slate-500 bg-slate-100/50 px-2.5 py-1 rounded-md border border-slate-200/50">
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          <span>Connection: <strong className="text-emerald-600">Fast</strong></span>
        </div>
      </div>

      {/* Centerpiece: Radial Speedometer Dial */}
      <div className="relative flex flex-col items-center justify-center my-4">
        
        {/* SVG Dial Arc Container */}
        <div className="relative w-64 h-[180px] mx-auto overflow-hidden">
          <svg className="w-64 h-64 -rotate-90 transform drop-shadow-md absolute top-0 left-0" viewBox="0 0 200 200">
            {/* Background Track */}
            <circle
              cx="100"
              cy="100"
              r="80"
              stroke="#F1F5F9"
              strokeWidth="14"
              fill="none"
              strokeDasharray="360"
              strokeDashoffset="110"
              strokeLinecap="round"
            />
            {/* Glowing Active Arc */}
            <circle
              cx="100"
              cy="100"
              r="80"
              stroke="url(#speedGradient)"
              strokeWidth="14"
              fill="none"
              strokeDasharray="360"
              strokeDashoffset={360 - (displayedSpeed / 1000) * 250}
              strokeLinecap="round"
              className="transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            />
            <defs>
              <linearGradient id="speedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="50%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </svg>

          {/* Needle Indicator */}
          <div 
            className="absolute left-[125px] top-[128px] w-1.5 h-24 -mt-24 bg-gradient-to-t from-slate-300 via-indigo-500 to-indigo-600 origin-bottom rounded-full transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-[0_0_12px_rgba(99,102,241,0.4)]"
            style={{ transform: `rotate(${needleAngle}deg)` }}
          />

          {/* Needle Hub Pivot Center */}
          <div className="absolute left-[112px] top-[112px] w-8 h-8 rounded-full bg-white border-[3px] border-indigo-100 shadow-md flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
          </div>
        </div>

        {/* Speed Value Readout */}
        <div className="text-center mt-2">
          <div className="flex items-baseline justify-center gap-1.5">
            <span className="text-6xl font-black tracking-tighter text-slate-900 font-sans">
              {displayedSpeed}
            </span>
            <span className="text-lg font-bold text-slate-500 tracking-tight">
              Mbps
            </span>
          </div>

          <div className="text-xs font-bold text-slate-600 mt-2 uppercase tracking-wide">
            {activePresetData.tier} &bull; <span className="text-indigo-600">{activePresetData.tech}</span>
          </div>
          <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1.5 leading-relaxed font-medium">
            {activePresetData.desc}
          </p>
        </div>

      </div>

      {/* Preset Speed Selector Tabs */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-2.5 bg-slate-100/50 p-2 rounded-[1.25rem] border border-slate-200/50 backdrop-blur-sm">
        {presets.map((p) => {
          const isActive = p.id === selectedPreset;
          return (
            <button
              key={p.id}
              onClick={() => {
                setSelectedPreset(p.id);
                if (onSelectSpeedTier) onSelectSpeedTier(p.id);
              }}
              className={`py-2 px-2.5 rounded-[1rem] text-center text-xs font-bold transition-all ${
                isActive
                  ? 'bg-white text-indigo-700 border-none shadow-[0_4px_12px_rgba(0,0,0,0.05)] ring-1 ring-slate-200'
                  : 'bg-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
              }`}
            >
              <div className="truncate">{p.label}</div>
              <div className={`text-[10px] font-medium truncate mt-0.5 ${isActive ? 'text-slate-500' : 'text-slate-400'}`}>
                {p.tier}
              </div>
            </button>
          );
        })}
      </div>

    </div>
  );
}
