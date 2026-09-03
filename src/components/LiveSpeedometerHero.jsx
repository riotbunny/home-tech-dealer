import React, { useState, useEffect } from 'react';
import { Gauge, Zap, Activity, Satellite, CheckCircle2, ChevronRight } from 'lucide-react';

/**
 * LiveSpeedometerHero
 * The showstopper visual anchor for the Hero section.
 * Interactive dark-glass HUD featuring an animated radial speed gauge,
 * live latency feedback, and instant speed tier selector.
 */
export function LiveSpeedometerHero({ onSelectSpeedTier }) {
  const [selectedPreset, setSelectedPreset] = useState('300');
  const [displayedSpeed, setDisplayedSpeed] = useState(300);
  const [displayedPing, setDisplayedPing] = useState(18);

  const presets = [
    {
      id: '300',
      label: '300 Mbps',
      tier: 'Streaming & 4K',
      speed: 300,
      ping: 22,
      desc: 'Ideal for 3–5 devices, Netflix 4K, and fast downloads.',
      tech: '5G Home & Fiber'
    },
    {
      id: '500',
      label: '500 Mbps',
      tier: 'Pro Work & Gaming',
      speed: 500,
      ping: 15,
      desc: 'Zero-lag Zoom calls, cloud backup, and multi-streamers.',
      tech: 'Ultra Fiber & 5G Plus'
    },
    {
      id: '1000',
      label: '1 Gig (1000M)',
      tier: 'Optical Gigabit',
      speed: 1000,
      ping: 11,
      desc: 'Symmetrical gigabit power for large homes & power users.',
      tech: 'Pure Symmetrical Fiber'
    },
    {
      id: 'starlink',
      label: 'Starlink LEO',
      tier: 'SpaceX Satellite',
      speed: 180,
      ping: 32,
      desc: 'High-speed broadband anywhere with an open sky view.',
      tech: 'Low-Earth Orbit'
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
    const targetPing = activePresetData.ping;
    setDisplayedSpeed(targetSpeed);
    setDisplayedPing(targetPing);
  }, [selectedPreset]);

  return (
    <div className="w-full max-w-xl mx-auto rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-slate-800 p-5 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.35)] text-white relative overflow-hidden">
      
      {/* Background Radial Glow */}
      <div className="absolute -right-20 -top-20 w-60 h-60 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3.5 mb-5">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-mono font-bold tracking-widest text-slate-300 uppercase">
            Broadband Telemetry HUD
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
          <Activity className="w-3.5 h-3.5 text-blue-400" />
          <span>Ping: <strong className="text-emerald-400">{displayedPing} ms</strong></span>
        </div>
      </div>

      {/* Centerpiece: Radial Speedometer Dial */}
      <div className="relative flex flex-col items-center justify-center my-2">
        
        {/* SVG Dial Arc */}
        <div className="relative w-64 h-36 flex items-center justify-center overflow-hidden">
          <svg className="w-64 h-64 -rotate-90 transform" viewBox="0 0 200 200">
            {/* Background Track */}
            <circle
              cx="100"
              cy="100"
              r="80"
              stroke="#1E293B"
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
              className="transition-all duration-700 ease-out"
            />
            <defs>
              <linearGradient id="speedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="50%" stopColor="#06B6D4" />
                <stop offset="100%" stopColor="#6366F1" />
              </linearGradient>
            </defs>
          </svg>

          {/* Needle Indicator */}
          <div 
            className="absolute bottom-4 w-1.5 h-24 bg-gradient-to-t from-white via-cyan-300 to-transparent origin-bottom rounded-full transition-transform duration-700 ease-out shadow-[0_0_12px_rgba(6,182,212,0.8)]"
            style={{ transform: `rotate(${needleAngle}deg)` }}
          />

          {/* Needle Hub Pivot Center */}
          <div className="absolute bottom-2 w-7 h-7 rounded-full bg-slate-900 border-2 border-cyan-400 shadow-md flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-cyan-300" />
          </div>
        </div>

        {/* Speed Value Readout */}
        <div className="text-center mt-2">
          <div className="flex items-baseline justify-center gap-1.5">
            <span className="text-5xl font-black tracking-tight text-white font-mono">
              {displayedSpeed}
            </span>
            <span className="text-lg font-bold text-cyan-400">
              Mbps
            </span>
          </div>

          <div className="text-xs font-semibold text-slate-300 mt-0.5">
            {activePresetData.tier} &bull; <span className="text-emerald-400">{activePresetData.tech}</span>
          </div>
          <p className="text-[11px] text-slate-400 max-w-xs mx-auto mt-1 leading-snug">
            {activePresetData.desc}
          </p>
        </div>

      </div>

      {/* Preset Speed Selector Tabs */}
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2">
        {presets.map((p) => {
          const isActive = p.id === selectedPreset;
          return (
            <button
              key={p.id}
              onClick={() => {
                setSelectedPreset(p.id);
                if (onSelectSpeedTier) onSelectSpeedTier(p.id);
              }}
              className={`py-2 px-2.5 rounded-xl text-center text-xs font-bold transition-all border ${
                isActive
                  ? 'bg-blue-600 text-white border-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.4)]'
                  : 'bg-slate-900/90 text-slate-400 hover:text-white hover:bg-slate-800 border-slate-800'
              }`}
            >
              <div className="truncate">{p.label}</div>
              <div className={`text-[10px] font-normal truncate ${isActive ? 'text-blue-100' : 'text-slate-500'}`}>
                {p.id === 'starlink' ? 'SpaceX LEO' : p.tier.split(' ')[0]}
              </div>
            </button>
          );
        })}
      </div>

    </div>
  );
}
