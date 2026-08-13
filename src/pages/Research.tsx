import React from 'react';
import { PageId } from '../types';
import { 
  FileCheck2, 
  HelpCircle, 
  Target, 
  FlaskConical, 
  BarChart2, 
  AlertTriangle, 
  CheckCircle2,
  Info
} from 'lucide-react';

export const Research: React.FC = () => {
  const confusionMatrix = [
    { actual: 'A1', A1: 91, A2: 6, A3: 0, B1: 3, B2: 0, B3: 0, C1: 0, C2: 0, C3: 0 },
    { actual: 'A2', A1: 4, A2: 88, A3: 5, B1: 0, B2: 3, B3: 0, C1: 0, C2: 0, C3: 0 },
    { actual: 'A3', A1: 0, A2: 5, A3: 92, B1: 0, B2: 0, B3: 3, C1: 0, C2: 0, C3: 0 },
    { actual: 'B1', A1: 2, A2: 0, A3: 0, B1: 89, B2: 7, B3: 0, C1: 2, C2: 0, C3: 0 },
    { actual: 'B2', A1: 0, A2: 3, A3: 0, B1: 4, B2: 90, B3: 3, C1: 0, C2: 0, C3: 0 },
    { actual: 'B3', A1: 0, A2: 0, A3: 2, B1: 0, B2: 5, B3: 88, C1: 0, C2: 0, C3: 5 },
    { actual: 'C1', A1: 0, A2: 0, A3: 0, B1: 3, B2: 0, B3: 0, C1: 93, C2: 4, C3: 0 },
    { actual: 'C2', A1: 0, A2: 0, A3: 0, B1: 0, B2: 2, B3: 0, C1: 4, C2: 91, C3: 3 },
    { actual: 'C3', A1: 0, A2: 0, A3: 0, B1: 0, B2: 0, B3: 4, C1: 0, C2: 3, C3: 93 },
  ];

  const accuracyData = [
    { noise: 'Baseline (0 dB)', acc: 92.4, fp: 3.8, fn: 3.8, conf: 91.5 },
    { noise: 'Low RF Interference (-88 dBm)', acc: 88.6, fp: 5.2, fn: 6.2, conf: 84.2 },
    { noise: 'Medium RF Congestion (-82 dBm)', acc: 79.1, fp: 9.8, fn: 11.1, conf: 72.8 },
    { noise: 'Heavy Spectrum Noise (-76 dBm)', acc: 62.5, fp: 18.2, fn: 19.3, conf: 58.4 },
  ];

  return (
    <div className="space-y-8 font-mono">
      {/* Page Header */}
      <div className="bg-[#121814] border border-[#222e26] rounded-xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <FlaskConical className="w-6 h-6 text-[#b8ff3d]" />
            <h1 className="text-xl font-bold text-[#f2f5ef]">RESEARCH METHODOLOGY & PROTOTYPE METRICS</h1>
          </div>
          <p className="text-sm text-[#8a9d90] font-sans leading-relaxed">
            Formulated research hypotheses, experimental variables, and simulated evaluation benchmarks for school science exhibition judging.
          </p>
        </div>

        <span className="bg-[#1b2b20] text-[#b8ff3d] border border-[#2e4032] px-3 py-1.5 rounded-lg text-xs font-bold">
          PROTOTYPE RESEARCH LAYER
        </span>
      </div>

      {/* Core Research Hypotheses & Variables */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Research Question & Hypothesis */}
        <div className="bg-[#121814] border border-[#222e26] rounded-xl p-6 shadow-xl space-y-4">
          <div>
            <span className="text-xs font-bold text-[#b8ff3d] block mb-1">RESEARCH QUESTION</span>
            <p className="text-sm text-[#f2f5ef] font-sans leading-relaxed bg-[#0b0f0d] p-3 rounded border border-[#1e2a21]">
              “Can changes in Wi-Fi propagation within a controlled indoor space be used to estimate the probable location zone of a person or object without cameras, GPS, or wearable devices?”
            </p>
          </div>

          <div>
            <span className="text-xs font-bold text-[#66ff99] block mb-1">HYPOTHESIS</span>
            <p className="text-sm text-[#f2f5ef] font-sans leading-relaxed bg-[#0b0f0d] p-3 rounded border border-[#1e2a21]">
              “If fixed wireless nodes are placed in an indoor area, then the presence or movement of a person/object will alter signal behavior in measurable ways, allowing a model to estimate the most likely occupied zone.”
            </p>
          </div>
        </div>

        {/* Variables Table */}
        <div className="bg-[#121814] border border-[#222e26] rounded-xl p-6 shadow-xl">
          <span className="text-xs font-bold text-[#ffd54a] block mb-3">EXPERIMENTAL VARIABLES</span>
          <div className="space-y-2 text-xs">
            <div className="bg-[#0b0f0d] p-2.5 rounded border border-[#1e2a21]">
              <strong className="text-[#b8ff3d] block">INDEPENDENT VARIABLE</strong>
              <span className="text-[#a0b2a6]">Physical location (Zone A1–C3), subject presence/type, and movement trajectory.</span>
            </div>

            <div className="bg-[#0b0f0d] p-2.5 rounded border border-[#1e2a21]">
              <strong className="text-[#66ff99] block">DEPENDENT VARIABLE</strong>
              <span className="text-[#a0b2a6]">Wi-Fi RSSI attenuation delta, SNR variance, calculated zone probability %, and confidence score.</span>
            </div>

            <div className="bg-[#0b0f0d] p-2.5 rounded border border-[#1e2a21]">
              <strong className="text-[#ffd54a] block">CONTROLLED VARIABLES</strong>
              <span className="text-[#a0b2a6]">Fixed node coordinates, TX transmit power (20 dBm), 3x3 layout geometry, baseline RF calibration.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Simulated Experimental Output: Confusion Matrix */}
      <div className="bg-[#121814] border border-[#222e26] rounded-xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4 border-b border-[#1f2b22] pb-3">
          <div>
            <h3 className="text-base font-bold text-[#f2f5ef] flex items-center space-x-2">
              <BarChart2 className="w-5 h-5 text-[#b8ff3d]" />
              <span>ZONE CLASSIFICATION CONFUSION MATRIX</span>
            </h3>
            <span className="text-xs text-[#ffd54a] font-mono">SIMULATED EXPERIMENTAL OUTPUT • CONCEPTUAL PREVIEW</span>
          </div>

          <span className="bg-[#1a291f] text-[#b8ff3d] text-xs px-2.5 py-1 rounded border border-[#2a3c2e]">
            OVERALL ACCURACY: ~90.1%
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-center text-xs text-[#a0b2a6]">
            <thead className="bg-[#0b0f0d] text-[#617366] text-[10px]">
              <tr>
                <th className="p-2 border border-[#1e2a21]">ACTUAL \ PREDICTED</th>
                {['A1','A2','A3','B1','B2','B3','C1','C2','C3'].map(z => (
                  <th key={z} className="p-2 border border-[#1e2a21] text-[#b8ff3d] font-bold">{z}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {confusionMatrix.map(row => (
                <tr key={row.actual} className="hover:bg-[#16201a]">
                  <td className="p-2 border border-[#1e2a21] text-[#b8ff3d] font-bold bg-[#0b0f0d]">{row.actual}</td>
                  {['A1','A2','A3','B1','B2','B3','C1','C2','C3'].map(col => {
                    const val = (row as unknown as Record<string, number>)[col];
                    const isDiagonal = row.actual === col;
                    return (
                      <td
                        key={col}
                        className={`p-2 border border-[#1e2a21] ${
                          isDiagonal ? 'bg-[#1e3324] text-[#b8ff3d] font-bold' : val > 0 ? 'text-[#ff6464]' : 'text-[#47574c]'
                        }`}
                      >
                        {val}%
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Accuracy vs RF Noise Level Table */}
      <div className="bg-[#121814] border border-[#222e26] rounded-xl p-6 shadow-xl">
        <h3 className="text-base font-bold text-[#f2f5ef] mb-4 flex items-center space-x-2 border-b border-[#1f2b22] pb-3">
          <Target className="w-5 h-5 text-[#66ff99]" />
          <span>MODEL ACCURACY vs SPECTRUM NOISE LEVEL (SIMULATED DATASET)</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#a0b2a6]">
            <thead className="bg-[#0b0f0d] text-[#617366] text-[10px]">
              <tr>
                <th className="p-3 border-b border-[#1f2b22]">RF ENVIRONMENT CONDITIONS</th>
                <th className="p-3 border-b border-[#1f2b22]">SIMULATED LOCALIZATION ACCURACY</th>
                <th className="p-3 border-b border-[#1f2b22]">FALSE POSITIVE RATE</th>
                <th className="p-3 border-b border-[#1f2b22]">FALSE NEGATIVE RATE</th>
                <th className="p-3 border-b border-[#1f2b22]">AVG CONFIDENCE</th>
              </tr>
            </thead>
            <tbody>
              {accuracyData.map((d, idx) => (
                <tr key={idx} className="border-b border-[#18231c]">
                  <td className="p-3 font-bold text-[#f2f5ef]">{d.noise}</td>
                  <td className="p-3 text-[#b8ff3d] font-bold">{d.acc}%</td>
                  <td className="p-3 text-[#ffd54a]">{d.fp}%</td>
                  <td className="p-3 text-[#ff6464]">{d.fn}%</td>
                  <td className="p-3 text-[#66ff99]">{d.conf}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Limitations & Science Fair Honest Notice */}
      <div className="bg-[#0b0f0d] border border-[#202d23] rounded-xl p-6 text-xs text-[#a0b2a6] space-y-2">
        <div className="flex items-center space-x-2 text-[#ffd54a] font-bold text-sm">
          <AlertTriangle className="w-4 h-4" />
          <span>PROTOTYPE RESEARCH LIMITATIONS & FUTURE WORK</span>
        </div>
        <p className="font-sans leading-relaxed">
          1. <strong>Simulation Model Constraints</strong>: Current probability estimates are generated using spatial Gaussian distance kernels and simulated multipath attenuation. Actual physical Wi-Fi signals experience complex room-specific boundary reflections.<br />
          2. <strong>Multi-Person Ambiguity</strong>: When multiple individuals occupy the same space simultaneously, signal scattering overlaps. Future work will incorporate multi-subcarrier CSI phase decomposition.<br />
          3. <strong>Hardware Calibration Requirement</strong>: Transitioning from simulation to physical deployment requires a 5-minute offline fingerprinting phase across each 3×3 zone.
        </p>
      </div>
    </div>
  );
};
