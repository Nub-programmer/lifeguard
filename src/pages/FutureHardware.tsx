import React from 'react';
import { PageId } from '../types';
import { Radio, Cpu, Wifi, Terminal, ArrowRight, Zap, Layers, CheckCircle2 } from 'lucide-react';

export const FutureHardware: React.FC = () => {
  const hardwareSteps = [
    {
      step: '01',
      title: 'Fixed Node Mounting',
      desc: 'Mount ESP32-S3 Node A (TX) and Node B (RX) at diagonal wall corners (2.0m height) for maximum room multipath coverage.'
    },
    {
      step: '02',
      title: 'Grid Baseline Calibration',
      desc: 'Run a 3-minute offline measurement scan across all 9 grid zones (A1–C3) to build background RSSI/CSI baseline fingerprints.'
    },
    {
      step: '03',
      title: 'High-Rate Packet Streaming',
      desc: 'Node A transmits 100 ESP-NOW UDP packets/sec. Node B extracts CSI subcarriers and streams frames via USB serial / WebSocket.'
    },
    {
      step: '04',
      title: 'Feature Extraction Pipeline',
      desc: 'Local Python/TypeScript backend calculates rolling RSSI variance, attenuation delta, and Doppler phase shift.'
    },
    {
      step: '05',
      title: 'Machine Learning Classification',
      desc: 'Pre-trained Random Forest model outputs probability distribution across the 3×3 zone grid in real time.'
    },
    {
      step: '06',
      title: 'ThermoMap Dashboard Integration',
      desc: 'Live WebSocket feeds stream probability matrix directly to LifeGuard ThermoMap UI @ 10Hz.'
    }
  ];

  return (
    <div className="space-y-8 font-mono">
      {/* Page Header */}
      <div className="bg-[#121814] border border-[#222e26] rounded-xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <Radio className="w-6 h-6 text-[#b8ff3d]" />
            <h1 className="text-xl font-bold text-[#f2f5ef]">FUTURE REAL HARDWARE INTEGRATION ROADMAP</h1>
          </div>
          <p className="text-sm text-[#8a9d90] font-sans leading-relaxed">
            Detailed hardware blueprint and execution plan for upgrading LifeGuard from simulation to physical ESP32 Wi-Fi nodes.
          </p>
        </div>

        <span className="bg-[#1b2b20] text-[#66ff99] border border-[#2e4032] px-3 py-1.5 rounded-lg text-xs font-bold">
          PHYSICAL DEPLOYMENT PLAN
        </span>
      </div>

      {/* Hardware Specs & Component Specs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#121814] border border-[#222e26] rounded-xl p-5 shadow-xl">
          <div className="flex items-center space-x-2 text-[#b8ff3d] font-bold text-sm mb-3">
            <Cpu className="w-4 h-4" />
            <span>NODE A (TX TRANSMITTER)</span>
          </div>
          <ul className="text-xs text-[#a0b2a6] space-y-2">
            <li>• Microcontroller: ESP32-S3-WROOM-1</li>
            <li>• Frequency: 2.412 GHz (Channel 1)</li>
            <li>• Output TX Power: +20 dBm</li>
            <li>• Antenna: +5 dBi Omnidirectional</li>
            <li>• Packet Protocol: ESP-NOW Raw UDP</li>
          </ul>
        </div>

        <div className="bg-[#121814] border border-[#222e26] rounded-xl p-5 shadow-xl">
          <div className="flex items-center space-x-2 text-[#66ff99] font-bold text-sm mb-3">
            <Radio className="w-4 h-4" />
            <span>NODE B (RX RECEIVER)</span>
          </div>
          <ul className="text-xs text-[#a0b2a6] space-y-2">
            <li>• Microcontroller: ESP32-S3-WROOM-1</li>
            <li>• Mode: Promiscuous CSI Capture</li>
            <li>• Subcarrier Resolution: 64 OFDM Bins</li>
            <li>• Sampling Rate: 100 Hz</li>
            <li>• Data Interface: High-speed UART / WebSockets</li>
          </ul>
        </div>

        <div className="bg-[#121814] border border-[#222e26] rounded-xl p-5 shadow-xl">
          <div className="flex items-center space-x-2 text-[#ffd54a] font-bold text-sm mb-3">
            <Terminal className="w-4 h-4" />
            <span>LOCAL GATEWAY / EDGE PC</span>
          </div>
          <ul className="text-xs text-[#a0b2a6] space-y-2">
            <li>• Platform: Raspberry Pi 4 / Laptop</li>
            <li>• Parser: Node.js SerialPort / Python</li>
            <li>• Feature Engine: Scikit-learn Random Forest</li>
            <li>• Dashboard: React + Three.js UI</li>
            <li>• Latency Target: &lt; 100 ms</li>
          </ul>
        </div>
      </div>

      {/* Hardware Pipeline Flow Diagram */}
      <div className="bg-[#121814] border border-[#222e26] rounded-xl p-6 shadow-xl">
        <h2 className="text-base font-bold text-[#f2f5ef] mb-6 flex items-center space-x-2 border-b border-[#1f2b22] pb-3">
          <Layers className="w-5 h-5 text-[#b8ff3d]" />
          <span>REAL HARDWARE DATA PIPELINE FLOW</span>
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
          <div className="bg-[#0b0f0d] border border-[#223026] p-3 rounded-lg text-center">
            <span className="text-[#b8ff3d] font-bold block">TX Node A</span>
            <span className="text-[10px] text-[#617366]">ESP32 Wi-Fi Burst</span>
          </div>
          <ArrowRight className="w-4 h-4 text-[#43594b]" />

          <div className="bg-[#0b0f0d] border border-[#223026] p-3 rounded-lg text-center">
            <span className="text-[#ffd54a] font-bold block">Wi-Fi Field</span>
            <span className="text-[10px] text-[#617366]">Multipath Attenuation</span>
          </div>
          <ArrowRight className="w-4 h-4 text-[#43594b]" />

          <div className="bg-[#0b0f0d] border border-[#223026] p-3 rounded-lg text-center">
            <span className="text-[#66ff99] font-bold block">RX Node B</span>
            <span className="text-[10px] text-[#617366]">CSI / RSSI Capture</span>
          </div>
          <ArrowRight className="w-4 h-4 text-[#43594b]" />

          <div className="bg-[#0b0f0d] border border-[#223026] p-3 rounded-lg text-center">
            <span className="text-[#5ce1e6] font-bold block">Serial / Parser</span>
            <span className="text-[10px] text-[#617366]">WebSocket Stream</span>
          </div>
          <ArrowRight className="w-4 h-4 text-[#43594b]" />

          <div className="bg-[#b8ff3d] text-[#0b0f0d] p-3 rounded-lg text-center font-bold">
            ThermoMap Dashboard
            <span className="text-[10px] block opacity-80">Probability UI</span>
          </div>
        </div>
      </div>

      {/* Planned Real Hardware Workflow 01..06 */}
      <div className="bg-[#121814] border border-[#222e26] rounded-xl p-6 shadow-xl">
        <h2 className="text-base font-bold text-[#f2f5ef] mb-6 border-b border-[#1f2b22] pb-3">
          PLANNED HARDWARE DEPLOYMENT WORKFLOW
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {hardwareSteps.map((s, idx) => (
            <div key={idx} className="bg-[#0e1410] border border-[#222e26] rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold bg-[#1b291f] text-[#b8ff3d] px-2 py-0.5 rounded border border-[#2b3c30]">
                  PHASE {s.step}
                </span>
                <CheckCircle2 className="w-4 h-4 text-[#66ff99]" />
              </div>
              <h4 className="text-sm font-bold text-[#f2f5ef] mb-1">{s.title}</h4>
              <p className="text-xs text-[#a0b2a6] font-sans leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
