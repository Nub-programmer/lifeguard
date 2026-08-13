import React from 'react';
import { PageId } from '../types';
import { ArchitectureFlow } from '../components/ArchitectureFlow';
import { 
  BookOpen, 
  Radio, 
  Zap, 
  Layers, 
  Compass, 
  Cpu, 
  HelpCircle,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

export const Methodology: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Fixed Dual Node Placement',
      desc: 'Two ESP32 Wi-Fi nodes (Node A as TX Transmitter and Node B as RX Receiver) are mounted in fixed diagonal positions across the building perimeter.'
    },
    {
      num: '02',
      title: '3×3 Grid Space Division',
      desc: 'The indoor floor plan is logically partitioned into a 3×3 spatial monitoring matrix (Zones A1 through C3), establishing uniform baseline references.'
    },
    {
      num: '03',
      title: 'Propagation Path Alteration',
      desc: 'When a human or dense object moves into a room, physical body composition (70% water) absorbs, reflects, and scatters the 2.4GHz / 5GHz Wi-Fi radio waves.'
    },
    {
      num: '04',
      title: 'Feature Extraction & Processing',
      desc: 'Node B captures incoming packets and computes spectral metrics: RSSI drop, SNR variance, Doppler phase shifts, and multipath power delay profiles.'
    },
    {
      num: '05',
      title: 'Probabilistic Model Mapping',
      desc: 'The extracted feature vector is processed through a spatial classifier trained on pre-calibrated zone signatures to estimate individual zone likelihoods.'
    },
    {
      num: '06',
      title: 'ThermoMap Grid Visualization',
      desc: 'Zone probabilities are rendered on a high-contrast 3×3 ThermoMap heat grid, highlighting the most likely zone with neon intensity and confidence scores.'
    },
    {
      num: '07',
      title: 'Continuous Real-Time Telemetry',
      desc: 'The pipeline updates at 10Hz, providing smooth dynamic tracking as subjects move across rooms without requiring wearables or optical cameras.'
    }
  ];

  const sciencePhysics = [
    {
      title: 'RF Absorption',
      desc: 'Human tissue is rich in water molecules, causing significant attenuation (~3 to 12 dB drop) when a person stands directly on the Line-of-Sight (LoS) path.'
    },
    {
      title: 'Multipath Reflection',
      desc: 'Wi-Fi signals bounce off concrete walls, metallic desks, and glass partitions, creating non-line-of-sight (NLoS) echo paths that shift when objects move.'
    },
    {
      title: 'Rayleigh Scattering',
      desc: 'Small objects or irregular physical surfaces scatter radio signals in multiple directions, changing local signal phase and variance signatures.'
    },
    {
      title: 'Doppler Phase Shift',
      desc: 'Physical body movement introduces minute frequency and phase fluctuations in received Wi-Fi subcarrier signals over time.'
    }
  ];

  return (
    <div className="space-y-8 font-mono">
      {/* Header */}
      <div className="bg-[#121814] border border-[#222e26] rounded-xl p-6 shadow-xl">
        <div className="flex items-center space-x-3 mb-2">
          <BookOpen className="w-6 h-6 text-[#b8ff3d]" />
          <h1 className="text-xl font-bold text-[#f2f5ef]">LIFEGUARD METHODOLOGY & SIGNAL SCIENCE</h1>
        </div>
        <p className="text-sm text-[#8a9d90] font-sans leading-relaxed">
          Comprehensive step-by-step workflow and physics explanation of camera-free Wi-Fi indoor sensing through channel disturbance analysis.
        </p>
      </div>

      {/* Workflow Diagram Component */}
      <ArchitectureFlow />

      {/* Step-by-Step 1..7 Grid */}
      <div className="bg-[#121814] border border-[#222e26] rounded-xl p-6 shadow-xl">
        <h2 className="text-base font-bold text-[#f2f5ef] mb-6 flex items-center space-x-2 border-b border-[#1f2b22] pb-3">
          <Compass className="w-5 h-5 text-[#b8ff3d]" />
          <span>7-STEP CONCEPTUAL SENSING WORKFLOW</span>
        </h2>

        <div className="space-y-4">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="bg-[#0b0f0d] border border-[#1f2c22] rounded-lg p-4 flex flex-col sm:flex-row items-start space-y-2 sm:space-y-0 sm:space-x-4 hover:border-[#b8ff3d] transition"
            >
              <div className="bg-[#b8ff3d] text-[#0b0f0d] font-black text-sm px-3 py-1.5 rounded shrink-0">
                STEP {s.num}
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#f2f5ef] mb-1">{s.title}</h3>
                <p className="text-xs text-[#8a9d90] font-sans leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Signal Physics Breakdown */}
      <div className="bg-[#121814] border border-[#222e26] rounded-xl p-6 shadow-xl">
        <h2 className="text-base font-bold text-[#f2f5ef] mb-6 flex items-center space-x-2 border-b border-[#1f2b22] pb-3">
          <Zap className="w-5 h-5 text-[#ffd54a]" />
          <span>WI-FI SIGNAL PROPAGATION PHYSICS</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sciencePhysics.map((p, idx) => (
            <div key={idx} className="bg-[#0e1410] border border-[#222e26] rounded-lg p-4">
              <span className="text-xs font-bold text-[#b8ff3d] block mb-1">{p.title}</span>
              <p className="text-xs text-[#a0b2a6] font-sans leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
