import React, { useState } from 'react';
import { PageId, ZoneId, SimulationState } from '../types';
import { ThermoGrid } from '../components/ThermoGrid';
import { ZONES, ZONE_LIST } from '../lib/zoneMath';
import { StatusCard } from '../components/StatusCard';
import { 
  Grid, 
  Target, 
  Activity, 
  Layers, 
  Radio, 
  MapPin, 
  ShieldCheck, 
  Flame,
  Info
} from 'lucide-react';

interface ThermoMapProps {
  state: SimulationState;
  onSelectZone: (zoneId: ZoneId) => void;
  onPageChange: (page: PageId) => void;
}

export const ThermoMap: React.FC<ThermoMapProps> = ({
  state,
  onSelectZone,
  onPageChange
}) => {
  const [viewMode, setViewMode] = useState<'probability' | 'disturbance' | 'rssi'>('probability');
  const currentZone = state.likelyZone !== 'NONE' ? ZONES[state.likelyZone] : null;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-[#121814] border border-[#222e26] rounded-xl p-5 font-mono shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#b8ff3d] font-bold text-lg">
            <Flame className="w-5 h-5 text-[#b8ff3d]" />
            <h2>THERMOMAP SPATIAL PRESENCE ANALYSIS</h2>
          </div>
          <p className="text-xs text-[#8a9d90] font-sans">
            Probable indoor presence region mapped across 3×3 monitoring grid using Wi-Fi channel disturbance features
          </p>
        </div>

        {/* Heatmap Mode Toggles */}
        <div className="flex items-center space-x-1 bg-[#16201a] border border-[#26372b] p-1 rounded-lg text-xs">
          <span className="text-[10px] text-[#617366] px-1 font-bold">MODE:</span>
          {(['probability', 'disturbance', 'rssi'] as const).map(m => (
            <button
              key={m}
              onClick={() => setViewMode(m)}
              className={`px-3 py-1 rounded text-xs font-bold uppercase transition ${
                viewMode === m
                  ? 'bg-[#b8ff3d] text-[#0b0f0d]'
                  : 'text-[#8a9d90] hover:text-[#f2f5ef]'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusCard
          label="ESTIMATED PROBABILITY"
          value={`${state.likelyZone !== 'NONE' ? state.probabilities[state.likelyZone as ZoneId] : 0}%`}
          badge="BAYESIAN"
          badgeColor="green"
          icon={<Target className="w-4 h-4" />}
          trend="Confidence Score Kernel"
        />

        <StatusCard
          label="LIKELY ZONE"
          value={state.likelyZone}
          subValue={currentZone ? currentZone.name : 'Clear Building'}
          badge="PRIMARY REGION"
          badgeColor="green"
          icon={<MapPin className="w-4 h-4" />}
          trend="Grid Location Marker"
        />

        <StatusCard
          label="SIGNAL STABILITY INDEX"
          value={state.confidence > 75 ? 'STABLE' : 'UNSTABLE'}
          badge={`${state.snrCurrent} dB SNR`}
          badgeColor={state.confidence > 75 ? 'green' : 'yellow'}
          icon={<Activity className="w-4 h-4" />}
          trend={`Noise Floor: ${state.noiseFloor} dBm`}
        />

        <StatusCard
          label="PACKET SAMPLE RATE"
          value={`${state.packetRate}`}
          subValue="pkts/sec"
          badge="10Hz REFRESH"
          badgeColor="cyan"
          icon={<Radio className="w-4 h-4" />}
          trend="Real-time UDP Stream"
        />
      </div>

      {/* Large 3x3 ThermoMap Grid */}
      <div className="bg-[#121814] border border-[#222e26] rounded-xl p-6 font-mono shadow-xl">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#1f2b22]">
          <div className="flex items-center space-x-2">
            <Grid className="w-5 h-5 text-[#b8ff3d]" />
            <h3 className="text-base font-bold text-[#f2f5ef]">3×3 PROBABLE PRESENCE REGION MAP</h3>
          </div>
          <span className="text-xs text-[#66ff99] bg-[#1a291f] px-2.5 py-1 rounded border border-[#2a3c2e]">
            ACTIVE ESTIMATION KERNEL
          </span>
        </div>

        <ThermoGrid state={state} onSelectZone={onSelectZone} size="large" />
      </div>

      {/* Zone Analytics Matrix Table */}
      <div className="bg-[#121814] border border-[#222e26] rounded-xl p-6 font-mono shadow-xl">
        <h3 className="text-sm font-bold text-[#f2f5ef] mb-4 flex items-center space-x-2">
          <Layers className="w-4 h-4 text-[#b8ff3d]" />
          <span>ZONE-BY-ZONE SIGNAL DISTURBANCE ANALYTICS</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#a0b2a6]">
            <thead className="bg-[#0b0f0d] text-[#617366] uppercase text-[10px]">
              <tr>
                <th className="p-3 border-b border-[#1f2b22]">ZONE ID</th>
                <th className="p-3 border-b border-[#1f2b22]">ROOM / AREA NAME</th>
                <th className="p-3 border-b border-[#1f2b22]">ESTIMATED PROBABILITY</th>
                <th className="p-3 border-b border-[#1f2b22]">DISTURBANCE INTENSITY</th>
                <th className="p-3 border-b border-[#1f2b22]">RSSI ATTENUATION DELTA</th>
                <th className="p-3 border-b border-[#1f2b22]">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {ZONE_LIST.map(zone => {
                const prob = state.probabilities[zone.id] || 0;
                const disturbance = state.disturbanceMap[zone.id] || 0;
                const isLikely = state.likelyZone === zone.id;
                const delta = ((disturbance / 100) * 16.5).toFixed(1);

                return (
                  <tr
                    key={zone.id}
                    onClick={() => onSelectZone(zone.id)}
                    className={`cursor-pointer border-b border-[#18231c] transition ${
                      isLikely ? 'bg-[#1b2a1f] text-[#b8ff3d] font-bold' : 'hover:bg-[#151d18]'
                    }`}
                  >
                    <td className="p-3 font-bold">{zone.id}</td>
                    <td className="p-3 text-[#f2f5ef]">{zone.name}</td>
                    <td className="p-3">
                      <span className={isLikely ? 'text-[#b8ff3d] text-sm' : ''}>
                        {prob.toFixed(1)}%
                      </span>
                    </td>
                    <td className="p-3">{disturbance.toFixed(1)}%</td>
                    <td className="p-3 text-[#ff6464]">-{delta} dBm</td>
                    <td className="p-3">
                      {isLikely ? (
                        <span className="bg-[#b8ff3d] text-[#0b0f0d] px-2 py-0.5 rounded text-[10px] font-bold">
                          PROBABLE REGION
                        </span>
                      ) : prob > 20 ? (
                        <span className="text-[#66ff99] text-[10px]">ELEVATED SCATTER</span>
                      ) : (
                        <span className="text-[#516356] text-[10px]">NOMINAL BASELINE</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
