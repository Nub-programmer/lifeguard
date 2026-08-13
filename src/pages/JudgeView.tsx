import React from 'react';
import { PageId, ScenarioId, SimulationState, ZoneId } from '../types';
import { ThermoGrid } from '../components/ThermoGrid';
import { BuildingScene } from '../components/3d/BuildingScene';
import { ZONES } from '../lib/zoneMath';
import { SCENARIO_LIST } from '../lib/demoScenarios';
import { 
  Award, 
  Target, 
  Shield, 
  EyeOff, 
  Cpu, 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles,
  Zap,
  Radio,
  MapPin
} from 'lucide-react';

interface JudgeViewProps {
  state: SimulationState;
  onSelectZone: (zoneId: ZoneId) => void;
  onScenarioChange: (id: ScenarioId) => void;
  onTogglePlay: () => void;
  onReset: () => void;
  onPageChange: (page: PageId) => void;
}

export const JudgeView: React.FC<JudgeViewProps> = ({
  state,
  onSelectZone,
  onScenarioChange,
  onTogglePlay,
  onReset,
  onPageChange
}) => {
  const currentZone = state.likelyZone !== 'NONE' ? ZONES[state.likelyZone] : null;

  return (
    <div className="min-h-screen bg-[#070a08] text-[#f2f5ef] font-mono p-4 sm:p-6 space-y-6">
      {/* Judge View Exhibition Top Banner */}
      <div className="bg-[#101712] border-2 border-[#b8ff3d] rounded-2xl p-6 shadow-[0_0_30px_rgba(184,255,61,0.2)] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-[#b8ff3d] text-[#0b0f0d] rounded-xl font-bold shadow-lg">
            <Award className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl sm:text-3xl font-black text-[#f2f5ef] tracking-tight">
                LifeGuard
              </h1>
              <span className="bg-[#b8ff3d] text-[#0b0f0d] text-xs font-bold px-2 py-0.5 rounded">
                EXHIBITION JUDGE VIEW
              </span>
            </div>
            <p className="text-xs text-[#a0b2a6] font-sans">
              Wi-Fi ThermoMap Indoor Presence Simulation • Camera-Free Indoor Sensing Concept
            </p>
          </div>
        </div>

        {/* Quick Demo Controls for Judges */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onTogglePlay}
            className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center space-x-2 transition ${
              state.isPlaying
                ? 'bg-[#ffd54a] text-[#0b0f0d]'
                : 'bg-[#b8ff3d] text-[#0b0f0d] hover:bg-[#c7ff5c]'
            }`}
          >
            {state.isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{state.isPlaying ? 'PAUSE DEMO' : 'RUN DEMO'}</span>
          </button>

          <button
            onClick={onReset}
            className="px-3 py-2 bg-[#1a261f] text-[#a0b2a6] border border-[#2a3c2f] rounded-lg hover:text-[#b8ff3d] transition text-xs font-bold"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* GIANT HIGH-IMPACT JUDGE KPI DISPLAY */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Giant Likely Zone Box */}
        <div className="bg-[#121914] border-2 border-[#b8ff3d] rounded-2xl p-6 shadow-2xl flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-[#8a9d90] font-bold">
            <span className="flex items-center space-x-1 text-[#b8ff3d]">
              <MapPin className="w-4 h-4" />
              <span>MOST LIKELY ZONE</span>
            </span>
            <span className="bg-[#b8ff3d]/10 text-[#b8ff3d] px-2 py-0.5 rounded border border-[#b8ff3d]/30">
              REAL-TIME
            </span>
          </div>

          <div className="my-4">
            <span className="text-5xl sm:text-6xl font-black text-[#b8ff3d] tracking-tight drop-shadow-[0_0_15px_rgba(184,255,61,0.5)]">
              {state.likelyZone}
            </span>
            <span className="text-sm text-[#f2f5ef] font-sans block mt-2 font-bold">
              {currentZone ? currentZone.name : 'No Active Person Detected'}
            </span>
          </div>

          <div className="text-[11px] text-[#6b7d70] border-t border-[#1f2c22] pt-2">
            Target Type: <strong className="text-[#a0b2a6]">{state.targetPos.type}</strong>
          </div>
        </div>

        {/* Giant Confidence Box */}
        <div className="bg-[#121914] border-2 border-[#66ff99] rounded-2xl p-6 shadow-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#8a9d90] font-bold">
            <span className="flex items-center space-x-1 text-[#66ff99]">
              <Target className="w-4 h-4" />
              <span>MODEL CONFIDENCE</span>
            </span>
            <span className="bg-[#66ff99]/10 text-[#66ff99] px-2 py-0.5 rounded border border-[#66ff99]/30">
              BAYESIAN KERNEL
            </span>
          </div>

          <div className="my-4">
            <span className="text-5xl sm:text-6xl font-black text-[#66ff99] tracking-tight">
              {state.confidence}%
            </span>
            <div className="w-full bg-[#1b2a1f] h-2.5 rounded-full mt-3 overflow-hidden border border-[#2b3e30]">
              <div
                className="bg-[#66ff99] h-full transition-all duration-300"
                style={{ width: `${state.confidence}%` }}
              />
            </div>
          </div>

          <div className="text-[11px] text-[#6b7d70] border-t border-[#1f2c22] pt-2">
            Signal SNR: <strong className="text-[#a0b2a6]">{state.snrCurrent} dB</strong>
          </div>
        </div>

        {/* Giant Status Box */}
        <div className="bg-[#121914] border-2 border-[#ffd54a] rounded-2xl p-6 shadow-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#8a9d90] font-bold">
            <span className="flex items-center space-x-1 text-[#ffd54a]">
              <Zap className="w-4 h-4" />
              <span>PRESENCE STATUS</span>
            </span>
            <span className="bg-[#ffd54a]/10 text-[#ffd54a] px-2 py-0.5 rounded border border-[#ffd54a]/30">
              TELEMETRY
            </span>
          </div>

          <div className="my-4">
            <span className="text-2xl sm:text-3xl font-black text-[#ffd54a] tracking-tight leading-tight block">
              {state.presenceStatus}
            </span>
            <p className="text-xs text-[#a0b2a6] font-sans mt-2">
              Detected through direct Wi-Fi RF body blockage & multipath attenuation.
            </p>
          </div>

          <div className="text-[11px] text-[#6b7d70] border-t border-[#1f2c22] pt-2">
            Active Scenario: <strong className="text-[#a0b2a6]">{SCENARIO_LIST.find(s => s.id === state.activeScenarioId)?.name}</strong>
          </div>
        </div>
      </div>

      {/* Main 3D / 2D Visualizer for Judges */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 3D Scene View (7 cols) */}
        <div className="lg:col-span-7 h-[450px]">
          <BuildingScene state={state} onSelectZone={onSelectZone} />
        </div>

        {/* 2D ThermoMap Grid (5 cols) */}
        <div className="lg:col-span-5 bg-[#121814] border border-[#222e26] rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#f2f5ef] mb-3 flex items-center space-x-2">
              <Zap className="w-4 h-4 text-[#b8ff3d]" />
              <span>3×3 THERMOMAP PROBABILITY GRID</span>
            </h3>
            <ThermoGrid state={state} onSelectZone={onSelectZone} size="normal" />
          </div>

          {/* Scenario Trigger Buttons for Quick Judge Demo */}
          <div className="mt-4 pt-3 border-t border-[#1f2c22]">
            <span className="text-[10px] text-[#617366] block mb-2 font-bold uppercase">QUICK DEMO SCENARIO SELECTOR</span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {SCENARIO_LIST.slice(0, 4).map(sc => (
                <button
                  key={sc.id}
                  onClick={() => onScenarioChange(sc.id)}
                  className={`p-2 rounded border text-left font-bold transition ${
                    state.activeScenarioId === sc.id
                      ? 'bg-[#b8ff3d] text-[#0b0f0d] border-[#b8ff3d]'
                      : 'bg-[#141a17] text-[#a0b2a6] border border-[#222e26] hover:bg-[#1a231d]'
                  }`}
                >
                  <div className="truncate">{sc.name}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Key Judge Takeaways Bar */}
      <div className="bg-[#101712] border border-[#233328] rounded-2xl p-6">
        <h3 className="text-base font-bold text-[#b8ff3d] mb-4 flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-[#b8ff3d]" />
          <span>KEY INNOVATION TAKEAWAYS FOR JUDGES</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans text-[#a0b2a6]">
          <div className="bg-[#141d17] p-4 rounded-xl border border-[#223026]">
            <div className="flex items-center space-x-2 text-[#b8ff3d] font-mono font-bold text-sm mb-1">
              <EyeOff className="w-4 h-4" />
              <span>100% Privacy Preserved</span>
            </div>
            <p className="leading-relaxed">
              No optical cameras, microphones, or client wearables required. Physical privacy is fully preserved in private living areas and restrooms.
            </p>
          </div>

          <div className="bg-[#141d17] p-4 rounded-xl border border-[#223026]">
            <div className="flex items-center space-x-2 text-[#66ff99] font-mono font-bold text-sm mb-1">
              <Cpu className="w-4 h-4" />
              <span>Ultra Low-Cost Hardware</span>
            </div>
            <p className="leading-relaxed">
              Utilizes commodity $4 ESP32 Wi-Fi microcontrollers without requiring expensive radar arrays or specialized hardware setup.
            </p>
          </div>

          <div className="bg-[#141d17] p-4 rounded-xl border border-[#223026]">
            <div className="flex items-center space-x-2 text-[#ffd54a] font-mono font-bold text-sm mb-1">
              <Shield className="w-4 h-4" />
              <span>Search & Rescue Application</span>
            </div>
            <p className="leading-relaxed">
              Provides emergency responders with rapid spatial occupancy awareness in smoke-filled buildings during disaster rescue operations.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <div className="text-center text-xs text-[#526357] font-mono py-4">
        “LifeGuard is a simulation-based concept prototype demonstrating camera-free indoor presence estimation using Wi-Fi signal behavior.”
      </div>
    </div>
  );
};
