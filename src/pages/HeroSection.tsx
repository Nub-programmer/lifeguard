import React from 'react';
import { PageId } from '../types';
import { Radio, Zap, ShieldCheck, ArrowRight, Award, Compass } from 'lucide-react';

interface HeroSectionProps {
  onPageChange: (page: PageId) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onPageChange }) => {
  return (
    <div className="bg-[#0b0f0d] border border-[#222f25] rounded-2xl p-6 sm:p-10 mb-8 font-mono relative overflow-hidden shadow-2xl">
      {/* Background Subtle Cyber Grid Shader */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#b8ff3d_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Top Tagline Badge */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#141d18] border border-[#2c3d30] rounded-full text-xs text-[#b8ff3d] mb-6">
          <Zap className="w-3.5 h-3.5" />
          <span className="font-bold tracking-wide">SCHOOL SCIENCE EXHIBITION CONCEPT DEMO</span>
        </div>

        {/* Title & Subtitle */}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#f2f5ef] tracking-tight uppercase leading-tight mb-4">
          CAMERA-FREE WI-FI INDOOR SENSING — VISUALIZED THROUGH AN INTERACTIVE <span className="text-[#b8ff3d] underline decoration-[#b8ff3d]/50 underline-offset-8">THERMOMAP SIMULATION</span>
        </h1>

        <p className="text-sm sm:text-base text-[#a0b2a6] font-sans leading-relaxed max-w-3xl mx-auto mb-8">
          LifeGuard simulates how Wi-Fi signal disturbances between strategically placed nodes may be used to estimate the probable indoor location of a person or object without cameras, GPS, or wearable devices.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <button
            onClick={() => onPageChange('simulation3d')}
            className="flex items-center space-x-2 px-6 py-3 bg-[#b8ff3d] hover:bg-[#c7ff5c] text-[#0b0f0d] font-bold rounded-lg text-sm transition shadow-[0_0_20px_rgba(184,255,61,0.3)] hover:scale-105"
          >
            <span>LAUNCH 3D SIMULATION</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onPageChange('judge')}
            className="flex items-center space-x-2 px-6 py-3 bg-[#1e2c22] hover:bg-[#283b2d] text-[#b8ff3d] border border-[#374c3d] font-bold rounded-lg text-sm transition"
          >
            <Award className="w-4 h-4 text-[#ffd54a]" />
            <span>JUDGE EXHIBITION VIEW</span>
          </button>

          <button
            onClick={() => onPageChange('methodology')}
            className="flex items-center space-x-2 px-6 py-3 bg-[#141a17] hover:bg-[#1a231f] text-[#a0b2a6] border border-[#27362b] font-bold rounded-lg text-sm transition"
          >
            <Compass className="w-4 h-4" />
            <span>EXPLORE METHODOLOGY</span>
          </button>
        </div>

        {/* Architecture Strip */}
        <div className="bg-[#121914] border border-[#222f25] rounded-xl p-4 text-xs font-mono">
          <span className="text-[#627568] uppercase text-[10px] block mb-2 font-bold tracking-widest">CONCEPT SIGNAL PIPELINE</span>
          <div className="flex flex-wrap items-center justify-center gap-2 text-[#f2f5ef]">
            <span className="bg-[#1a251e] px-2.5 py-1 rounded text-[#b8ff3d] border border-[#2b3d30]">Node A (TX)</span>
            <span className="text-[#627568]">→</span>
            <span className="bg-[#1a251e] px-2.5 py-1 rounded text-[#66ff99] border border-[#2b3d30]">Wi-Fi Field</span>
            <span className="text-[#627568]">→</span>
            <span className="bg-[#1a251e] px-2.5 py-1 rounded text-[#ffd54a] border border-[#2b3d30]">Human / Object</span>
            <span className="text-[#627568]">→</span>
            <span className="bg-[#1a251e] px-2.5 py-1 rounded text-[#5ce1e6] border border-[#2b3d30]">Signal Disturbance</span>
            <span className="text-[#627568]">→</span>
            <span className="bg-[#1a251e] px-2.5 py-1 rounded text-[#b8ff3d] border border-[#2b3d30]">ThermoMap</span>
            <span className="text-[#627568]">→</span>
            <span className="bg-[#b8ff3d] text-[#0b0f0d] px-2.5 py-1 rounded font-bold">Probable Zone</span>
          </div>
        </div>

        {/* Stat Badges Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 text-left">
          <div className="bg-[#101612] border border-[#202d23] p-3 rounded-lg">
            <span className="text-[10px] text-[#627568] block">CAMERAS REQUIRED</span>
            <span className="text-xl font-bold text-[#b8ff3d]">0</span>
            <span className="text-[10px] text-[#8a9d90] block">100% Privacy Preserved</span>
          </div>

          <div className="bg-[#101612] border border-[#202d23] p-3 rounded-lg">
            <span className="text-[10px] text-[#627568] block">ESP32 NODES</span>
            <span className="text-xl font-bold text-[#66ff99]">2 Nodes</span>
            <span className="text-[10px] text-[#8a9d90] block">Dual Baseline System</span>
          </div>

          <div className="bg-[#101612] border border-[#202d23] p-3 rounded-lg">
            <span className="text-[10px] text-[#627568] block">TARGET GRID</span>
            <span className="text-xl font-bold text-[#ffd54a]">3×3 Grid</span>
            <span className="text-[10px] text-[#8a9d90] block">9 Monitored Zones</span>
          </div>

          <div className="bg-[#101612] border border-[#202d23] p-3 rounded-lg">
            <span className="text-[10px] text-[#627568] block">UPDATE RATE</span>
            <span className="text-xl font-bold text-[#5ce1e6]">10 Hz</span>
            <span className="text-[10px] text-[#8a9d90] block">Real-time Telemetry</span>
          </div>
        </div>
      </div>
    </div>
  );
};
