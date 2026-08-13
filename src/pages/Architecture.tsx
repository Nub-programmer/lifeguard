import React from 'react';
import { PageId } from '../types';
import { ArchitectureFlow } from '../components/ArchitectureFlow';
import { Cpu, Radio, Zap, Shield, CheckCircle, ArrowRight, Layers } from 'lucide-react';

export const Architecture: React.FC = () => {
  return (
    <div className="space-y-8 font-mono">
      {/* Header */}
      <div className="bg-[#121814] border border-[#222e26] rounded-xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <Cpu className="w-6 h-6 text-[#b8ff3d]" />
            <h1 className="text-xl font-bold text-[#f2f5ef]">SYSTEM ARCHITECTURE & SOFTWARE LAYERS</h1>
          </div>
          <p className="text-sm text-[#8a9d90] font-sans leading-relaxed">
            Modular multi-tier framework bridging wireless physical layer signals to probabilistic 3D UI overlays
          </p>
        </div>

        {/* Mode Comparison Badges */}
        <div className="flex items-center space-x-2 text-xs">
          <span className="bg-[#1b2b20] text-[#b8ff3d] border border-[#2e4032] px-3 py-1.5 rounded-lg font-bold flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-[#b8ff3d] animate-pulse" />
            <span>CURRENT MODE: SIMULATION-FIRST</span>
          </span>

          <span className="bg-[#141d18] text-[#8a9d90] border border-[#25362a] px-3 py-1.5 rounded-lg flex items-center space-x-1.5">
            <Radio className="w-3.5 h-3.5 text-[#66ff99]" />
            <span>FUTURE MODE: LIVE ESP32 HARWARE</span>
          </span>
        </div>
      </div>

      {/* Main Architecture Flow Diagram Component */}
      <ArchitectureFlow />

      {/* Hardware vs Simulation Architecture Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Simulation Stack */}
        <div className="bg-[#121814] border border-[#222e26] rounded-xl p-6 shadow-xl">
          <div className="flex items-center space-x-2 text-[#b8ff3d] font-bold text-sm mb-4 border-b border-[#1f2b22] pb-3">
            <CheckCircle className="w-4 h-4" />
            <span>CURRENT PROTOTYPE ARCHITECTURE (SIMULATION)</span>
          </div>

          <ul className="space-y-3 text-xs text-[#a0b2a6]">
            <li className="bg-[#0b0f0d] p-3 rounded border border-[#1e2a21] flex items-start space-x-2">
              <span className="text-[#b8ff3d] font-bold">•</span>
              <div>
                <strong className="text-[#f2f5ef] block">Virtual 10Hz Signal Synthesizer</strong>
                <span>Computes spatial distance Gaussian attenuation kernels and RSSI jitter mathematically.</span>
              </div>
            </li>

            <li className="bg-[#0b0f0d] p-3 rounded border border-[#1e2a21] flex items-start space-x-2">
              <span className="text-[#b8ff3d] font-bold">•</span>
              <div>
                <strong className="text-[#f2f5ef] block">React Three Fiber 3D Stage</strong>
                <span>Renders interactive building layout with real-time zone meshes and wave arcs.</span>
              </div>
            </li>

            <li className="bg-[#0b0f0d] p-3 rounded border border-[#1e2a21] flex items-start space-x-2">
              <span className="text-[#b8ff3d] font-bold">•</span>
              <div>
                <strong className="text-[#f2f5ef] block">Client-Side Bayesian Estimator</strong>
                <span>Calculates normalized 9-zone probabilities and confidence percentages in real time.</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Future Real ESP32 Stack */}
        <div className="bg-[#121814] border border-[#222e26] rounded-xl p-6 shadow-xl">
          <div className="flex items-center space-x-2 text-[#66ff99] font-bold text-sm mb-4 border-b border-[#1f2b22] pb-3">
            <Radio className="w-4 h-4" />
            <span>PLANNED HARDWARE ARCHITECTURE (ESP32 C/C++)</span>
          </div>

          <ul className="space-y-3 text-xs text-[#a0b2a6]">
            <li className="bg-[#0b0f0d] p-3 rounded border border-[#1e2a21] flex items-start space-x-2">
              <span className="text-[#66ff99] font-bold">•</span>
              <div>
                <strong className="text-[#f2f5ef] block">ESP32-S3 Promiscuous CSI Capture</strong>
                <span>Monitors 64 OFDM subcarrier amplitude and phase values per Wi-Fi packet frame.</span>
              </div>
            </li>

            <li className="bg-[#0b0f0d] p-3 rounded border border-[#1e2a21] flex items-start space-x-2">
              <span className="text-[#66ff99] font-bold">•</span>
              <div>
                <strong className="text-[#f2f5ef] block">UDP / WebSocket Binary Stream</strong>
                <span>Transmits raw CSI feature frames over local LAN to Python/TS inference backend.</span>
              </div>
            </li>

            <li className="bg-[#0b0f0d] p-3 rounded border border-[#1e2a21] flex items-start space-x-2">
              <span className="text-[#66ff99] font-bold">•</span>
              <div>
                <strong className="text-[#f2f5ef] block">Pre-Trained Machine Learning Model</strong>
                <span>Lightweight Random Forest / XGBoost model classifies physical room occupancy.</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
