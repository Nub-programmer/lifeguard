import React from 'react';
import { PageId, ScenarioId, ZoneId, SimulationState } from '../types';
import { HeroSection } from './HeroSection';
import { StatusCard } from '../components/StatusCard';
import { ScenarioSelector } from '../components/ScenarioSelector';
import { SignalChart } from '../components/SignalChart';
import { ThermoGrid } from '../components/ThermoGrid';
import { ZONES } from '../lib/zoneMath';
import { DEMO_SCENARIOS } from '../lib/demoScenarios';
import { 
  Activity, 
  Radio, 
  Zap, 
  MapPin, 
  ShieldCheck, 
  BarChart3, 
  Grid, 
  ArrowRight,
  Wifi,
  Cpu
} from 'lucide-react';

interface DashboardProps {
  state: SimulationState;
  onPageChange: (page: PageId) => void;
  onScenarioChange: (id: ScenarioId) => void;
  onSelectZone: (zoneId: ZoneId) => void;
  onTogglePlay: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  state,
  onPageChange,
  onScenarioChange,
  onSelectZone,
  onTogglePlay,
  onReset,
  onSpeedChange
}) => {
  const currentZone = state.likelyZone !== 'NONE' ? ZONES[state.likelyZone] : null;
  const currentScenario = DEMO_SCENARIOS[state.activeScenarioId];

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <HeroSection onPageChange={onPageChange} />

      {/* Primary KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusCard
          label="PREDICTED LIKELY ZONE"
          value={state.likelyZone !== 'NONE' ? state.likelyZone : 'NONE'}
          subValue={currentZone ? currentZone.name : 'Clear Building'}
          badge={state.likelyZone !== 'NONE' ? 'ESTIMATED' : 'BASELINE'}
          badgeColor={state.likelyZone !== 'NONE' ? 'green' : 'cyan'}
          icon={<MapPin className="w-4 h-4" />}
          trend={currentZone ? `Probability: ${state.probabilities[state.likelyZone as ZoneId]}%` : 'No active blockage'}
        />

        <StatusCard
          label="MODEL CONFIDENCE"
          value={`${state.confidence}%`}
          badge={state.confidence > 80 ? 'HIGH' : state.confidence > 60 ? 'MEDIUM' : 'LOW'}
          badgeColor={state.confidence > 80 ? 'green' : state.confidence > 60 ? 'yellow' : 'red'}
          icon={<ShieldCheck className="w-4 h-4" />}
          trend={`Noise Floor: ${state.noiseFloor} dBm`}
        />

        <StatusCard
          label="PRESENCE STATUS"
          value={state.presenceStatus}
          badge="REAL-TIME"
          badgeColor="green"
          icon={<Zap className="w-4 h-4" />}
          trend={`Target Type: ${state.targetPos.type}`}
        />

        <StatusCard
          label="RX SIGNAL RSSI"
          value={`${state.rssiCurrent} dBm`}
          subValue={`SNR: ${state.snrCurrent} dB`}
          badge="STABLE"
          badgeColor="cyan"
          icon={<Radio className="w-4 h-4" />}
          trend={`Packet Rate: ${state.packetRate} pkts/s`}
        />
      </div>

      {/* Scenario Controller */}
      <ScenarioSelector
        state={state}
        onScenarioChange={onScenarioChange}
        onTogglePlay={onTogglePlay}
        onReset={onReset}
        onSpeedChange={onSpeedChange}
      />

      {/* Middle Section: ThermoMap Grid Preview & Waveform Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ThermoMap 2D Matrix Preview (5 cols) */}
        <div className="lg:col-span-5 bg-[#121814] border border-[#222e26] rounded-xl p-5 font-mono shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#1f2b22]">
              <div className="flex items-center space-x-2">
                <Grid className="w-4 h-4 text-[#b8ff3d]" />
                <h3 className="text-sm font-bold text-[#f2f5ef]">3×3 THERMOMAP PROBABILITY GRID</h3>
              </div>
              <button
                onClick={() => onPageChange('thermomap')}
                className="text-xs text-[#b8ff3d] hover:underline flex items-center space-x-1"
              >
                <span>FULL THERMOMAP</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <ThermoGrid state={state} onSelectZone={onSelectZone} size="normal" />
          </div>

          <div className="mt-4 pt-3 border-t border-[#1f2b22] flex items-center justify-between text-xs text-[#8a9d90]">
            <span>Click any room cell to reposition target</span>
            <span className="text-[#b8ff3d] font-bold">Interactive Mode</span>
          </div>
        </div>

        {/* Real-time Telemetry Charts (7 cols) */}
        <div className="lg:col-span-7 bg-[#121814] border border-[#222e26] rounded-xl p-5 font-mono shadow-xl space-y-6">
          {/* Chart 1: RSSI Signal Waveform */}
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-[#1f2b22] pb-2">
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-[#b8ff3d]" />
                <h3 className="text-sm font-bold text-[#f2f5ef]">SIGNAL AMPLITUDE WAVEFORM (RSSI dBm)</h3>
              </div>
              <span className="text-xs text-[#66ff99]">CHANNEL FREQUENCY RESPONSE</span>
            </div>
            <SignalChart
              waveformHistory={state.waveformHistory}
              probabilities={state.probabilities}
              likelyZone={state.likelyZone}
              type="waveform"
            />
          </div>

          {/* Chart 2: Zone Probability Distribution */}
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-[#1f2b22] pb-2">
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4 text-[#ffd54a]" />
                <h3 className="text-sm font-bold text-[#f2f5ef]">ZONE PROBABILITY DISTRIBUTION (%)</h3>
              </div>
              <span className="text-xs text-[#ffd54a]">BAYESIAN CLASSIFIER</span>
            </div>
            <SignalChart
              waveformHistory={state.waveformHistory}
              probabilities={state.probabilities}
              likelyZone={state.likelyZone}
              type="probability"
            />
          </div>
        </div>
      </div>

      {/* Side Hardware Node Diagnostics Bar */}
      <div className="bg-[#101612] border border-[#202d23] rounded-xl p-5 font-mono text-xs shadow-lg">
        <div className="flex items-center space-x-2 text-[#b8ff3d] font-bold text-sm mb-3">
          <Cpu className="w-4 h-4" />
          <span>VIRTUAL HARDWARE NODE DIAGNOSTICS</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-[#8a9d90]">
          <div className="bg-[#141c17] p-3 rounded border border-[#223026]">
            <span className="text-[10px] text-[#617366] block">TRANSMITTER NODE (TX)</span>
            <span className="font-bold text-[#f2f5ef] block mt-0.5">ESP32-NODE-A</span>
            <span className="text-[#66ff99] text-[10px]">TX Power: 20 dBm • 2.412 GHz</span>
          </div>

          <div className="bg-[#141c17] p-3 rounded border border-[#223026]">
            <span className="text-[10px] text-[#617366] block">RECEIVER NODE (RX)</span>
            <span className="font-bold text-[#f2f5ef] block mt-0.5">ESP32-NODE-B</span>
            <span className="text-[#66ff99] text-[10px]">RX Sensitivity: -95 dBm</span>
          </div>

          <div className="bg-[#141c17] p-3 rounded border border-[#223026]">
            <span className="text-[10px] text-[#617366] block">TELEMETRY STREAM</span>
            <span className="font-bold text-[#f2f5ef] block mt-0.5">120 Packets / sec</span>
            <span className="text-[#ffd54a] text-[10px]">Buffer Loss: 0.02%</span>
          </div>

          <div className="bg-[#141c17] p-3 rounded border border-[#223026]">
            <span className="text-[10px] text-[#617366] block">SIMULATION ENGINE</span>
            <span className="font-bold text-[#b8ff3d] block mt-0.5">SYNTHESIS ACTIVE</span>
            <span className="text-[#8a9d90] text-[10px]">Time: {state.currentTime.toFixed(1)}s</span>
          </div>
        </div>
      </div>
    </div>
  );
};
