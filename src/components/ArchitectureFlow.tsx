import React from 'react';
import { Radio, Zap, Activity, Cpu, Grid, LayoutDashboard, ArrowRight, Layers } from 'lucide-react';

export const ArchitectureFlow: React.FC = () => {
  const steps = [
    {
      title: 'ESP32 Node A (TX)',
      subtitle: 'Transmitter Node',
      desc: 'Injects continuous Wi-Fi packet bursts @ 2.4GHz / 5GHz across the physical indoor space.',
      icon: <Radio className="w-5 h-5 text-[#b8ff3d]" />,
      tech: '802.11n / ESP-NOW Packet Generator'
    },
    {
      title: 'Signal Propagation Field',
      subtitle: 'Physical Space',
      desc: 'Wi-Fi waves reflect, absorb, scatter, and undergo multipath interference as objects/humans pass through.',
      icon: <Zap className="w-5 h-5 text-[#ffd54a]" />,
      tech: 'Multipath Reflection & Body Blockage'
    },
    {
      title: 'ESP32 Node B (RX)',
      subtitle: 'Receiver Node',
      desc: 'Receives modified RF signal stream, capturing RSSI and CSI (Channel State Information) per packet.',
      icon: <Radio className="w-5 h-5 text-[#66ff99]" />,
      tech: 'Hardware RSSI / CSI Extractor'
    },
    {
      title: 'Feature Extraction Engine',
      subtitle: 'Signal Processing',
      desc: 'Computes rolling RSSI variance, attenuation delta, multipath Doppler phase shift, and spectral SNR.',
      icon: <Cpu className="w-5 h-5 text-[#5ce1e6]" />,
      tech: 'Rolling Variance & Attenuation Delta'
    },
    {
      title: 'Probabilistic Spatial Model',
      subtitle: 'Classification Kernel',
      desc: 'Maps extracted signal signatures against calibrated 3x3 spatial grid models to generate probability scores.',
      icon: <Activity className="w-5 h-5 text-[#b8ff3d]" />,
      tech: 'Random Forest / Gaussian Process'
    },
    {
      title: 'ThermoMap Dashboard',
      subtitle: 'Real-Time Visualization',
      desc: 'Renders heat intensity maps, confidence meters, 3D zone highlights, and telemetry analytics for operators.',
      icon: <Grid className="w-5 h-5 text-[#ffd54a]" />,
      tech: 'React Three Fiber + WebGL UI'
    }
  ];

  return (
    <div className="bg-[#121814] border border-[#222e26] rounded-xl p-6 font-mono shadow-xl">
      <div className="flex items-center space-x-3 mb-6 border-b border-[#1f2b22] pb-4">
        <Layers className="w-6 h-6 text-[#b8ff3d]" />
        <div>
          <h2 className="text-lg font-bold text-[#f2f5ef]">LIFEGUARD END-TO-END SYSTEM PIPELINE</h2>
          <p className="text-xs text-[#8a9d90]">
            Conceptual data flow from physical Wi-Fi signal generation to ThermoMap probability visualization
          </p>
        </div>
      </div>

      {/* Grid of Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="bg-[#0e1410] border border-[#222e26] rounded-lg p-4 relative group hover:border-[#b8ff3d] transition flex flex-col justify-between"
          >
            {/* Step Number Badge */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold text-[#0b0f0d] bg-[#b8ff3d] px-2 py-0.5 rounded">
                STEP 0{idx + 1}
              </span>
              <span className="text-[10px] text-[#617366] font-sans">{step.subtitle}</span>
            </div>

            {/* Icon & Title */}
            <div>
              <div className="flex items-center space-x-2.5 mb-2">
                <div className="p-2 bg-[#18231c] border border-[#2b3b30] rounded-lg">
                  {step.icon}
                </div>
                <h4 className="text-sm font-bold text-[#f2f5ef] group-hover:text-[#b8ff3d] transition">
                  {step.title}
                </h4>
              </div>

              <p className="text-xs text-[#8a9d90] leading-relaxed mb-3">
                {step.desc}
              </p>
            </div>

            {/* Tech tag */}
            <div className="pt-2 border-t border-[#1a251e] flex items-center justify-between text-[10px] text-[#66ff99]">
              <span className="truncate">{step.tech}</span>
              <ArrowRight className="w-3 h-3 text-[#3a4d40] group-hover:text-[#b8ff3d] transition shrink-0 ml-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
