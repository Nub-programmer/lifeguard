import React from 'react';
import { PageId, ScenarioId, ZoneId, SimulationState } from '../types';
import { BuildingScene } from '../components/3d/BuildingScene';
import { ScenarioSelector } from '../components/ScenarioSelector';
import { ZONES, ZONE_LIST } from '../lib/zoneMath';
import { DEMO_SCENARIOS } from '../lib/demoScenarios';
import { 
  Box, 
  Eye, 
  Layers, 
  Radio, 
  MapPin, 
  Sliders, 
  Play, 
  Pause, 
  RotateCcw,
  Volume2,
  VolumeX,
  Target,
  Sparkles
} from 'lucide-react';

interface Simulation3DProps {
  state: SimulationState;
  onSelectZone: (zoneId: ZoneId) => void;
  onSelectCoords: (x: number, z: number) => void;
  onScenarioChange: (id: ScenarioId) => void;
  onTogglePlay: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
  onSetCameraView: (view: 'isometric' | 'top' | 'perspective') => void;
  onToggleSignalWaves: () => void;
  onToggleZoneLabels: () => void;
  onToggleThermoOverlay: () => void;
  onToggleSound: () => void;
}

export const Simulation3D: React.FC<Simulation3DProps> = ({
  state,
  onSelectZone,
  onSelectCoords,
  onScenarioChange,
  onTogglePlay,
  onReset,
  onSpeedChange,
  onSetCameraView,
  onToggleSignalWaves,
  onToggleZoneLabels,
  onToggleThermoOverlay,
  onToggleSound
}) => {
  const currentZone = state.likelyZone !== 'NONE' ? ZONES[state.likelyZone] : null;

  return (
    <div className="space-y-6">
      {/* Top Header Bar */}
      <div className="bg-[#121814] border border-[#222e26] rounded-xl p-4 font-mono shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#b8ff3d] font-bold text-base">
            <Box className="w-5 h-5" />
            <h2>3D WI-FI SIGNAL PROPAGATION & BUILDING SIMULATOR</h2>
          </div>
          <p className="text-xs text-[#8a9d90] font-sans">
            Interactive Three.js environment showing ESP32 nodes, signal wave paths, and real-time spatial disturbance
          </p>
        </div>

        {/* Scene Toggles & Camera Controls */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Camera Presets */}
          <div className="bg-[#16201a] border border-[#26372b] p-1 rounded-lg flex items-center space-x-1">
            <span className="text-[10px] text-[#617366] px-1 font-bold">VIEW:</span>
            {(['isometric', 'top', 'perspective'] as const).map(v => (
              <button
                key={v}
                onClick={() => onSetCameraView(v)}
                className={`px-2 py-1 rounded text-[11px] font-bold uppercase transition ${
                  state.cameraView === v
                    ? 'bg-[#b8ff3d] text-[#0b0f0d]'
                    : 'text-[#8a9d90] hover:text-[#f2f5ef]'
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          {/* Toggle Signal Waves */}
          <button
            onClick={onToggleSignalWaves}
            className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg border text-xs font-bold transition ${
              state.showSignalWaves
                ? 'bg-[#1b2b20] text-[#b8ff3d] border-[#b8ff3d]/50'
                : 'bg-[#141a17] text-[#627568] border-[#222e26]'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>WAVES</span>
          </button>

          {/* Audio Toggle */}
          <button
            onClick={onToggleSound}
            className={`p-1.5 rounded-lg border transition ${
              state.soundEnabled
                ? 'bg-[#1b2b20] text-[#b8ff3d] border-[#b8ff3d]/50'
                : 'bg-[#141a17] text-[#627568] border-[#222e26]'
            }`}
            title="Toggle Audio Effects"
          >
            {state.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main 3D Canvas + Side Control Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[620px]">
        {/* 3D Scene Container (8 cols) */}
        <div className="lg:col-span-8 h-full">
          <BuildingScene
            state={state}
            onSelectZone={onSelectZone}
            onSelectCoords={onSelectCoords}
          />
        </div>

        {/* Side Controls & Real-Time Metrics (4 cols) */}
        <div className="lg:col-span-4 h-full bg-[#121814] border border-[#222e26] rounded-xl p-5 font-mono shadow-xl flex flex-col justify-between overflow-y-auto space-y-4">
          <div>
            {/* Live Target Status Box */}
            <div className="bg-[#0b0f0d] border border-[#202e24] p-3.5 rounded-lg mb-4">
              <span className="text-[10px] text-[#617366] font-bold block mb-1 uppercase">ESTIMATED LOCATION ZONE</span>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-3xl font-black text-[#b8ff3d] tracking-tight">
                    {state.likelyZone}
                  </span>
                  <span className="text-xs text-[#a0b2a6] block mt-0.5 font-sans">
                    {currentZone ? currentZone.name : 'Clear Space'}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold text-[#66ff99]">{state.confidence}%</span>
                  <span className="text-[10px] text-[#617366] block">Confidence</span>
                </div>
              </div>
            </div>

            {/* Zone Probability Breakdown */}
            <h4 className="text-xs font-bold text-[#f2f5ef] mb-2 flex items-center justify-between">
              <span>9-ZONE PROBABILITY MAP</span>
              <span className="text-[10px] text-[#b8ff3d]">REAL-TIME</span>
            </h4>

            <div className="space-y-1.5 mb-4">
              {ZONE_LIST.map(zone => {
                const prob = state.probabilities[zone.id] || 0;
                const isLikely = state.likelyZone === zone.id;

                return (
                  <button
                    key={zone.id}
                    onClick={() => onSelectZone(zone.id)}
                    className={`w-full text-left p-2 rounded border text-xs transition flex items-center justify-between ${
                      isLikely
                        ? 'bg-[#1b2a1f] border-[#b8ff3d] text-[#b8ff3d]'
                        : 'bg-[#141a17] border-[#222e26] text-[#8a9d90] hover:bg-[#1a241e]'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="font-bold">{zone.id}</span>
                      <span className="text-[10px] text-[#617366] truncate max-w-[110px]">{zone.name}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="font-bold">{prob.toFixed(1)}%</span>
                      <div className="w-12 bg-[#1c2820] h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${isLikely ? 'bg-[#b8ff3d]' : 'bg-[#4d6353]'}`}
                          style={{ width: `${prob}%` }}
                        />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Hint */}
          <div className="bg-[#141d18] border border-[#25382b] p-3 rounded-lg text-[11px] text-[#a0b2a6]">
            <div className="flex items-center space-x-1.5 text-[#b8ff3d] font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>3D INTERACTION GUIDE</span>
            </div>
            <p className="leading-normal">
              • Click any room on the 3D floor to reposition target.<br />
              • Drag to rotate camera • Scroll to zoom.<br />
              • Toggle WAVES to observe multipath signal arcs.
            </p>
          </div>
        </div>
      </div>

      {/* Scenario Controller */}
      <ScenarioSelector
        state={state}
        onScenarioChange={onScenarioChange}
        onTogglePlay={onTogglePlay}
        onReset={onReset}
        onSpeedChange={onSpeedChange}
      />
    </div>
  );
};
