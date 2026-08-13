import React from 'react';
import { ZoneId, SimulationState } from '../types';
import { ZONE_LIST, ZONES } from '../lib/zoneMath';
import { Target, Sparkles, MapPin } from 'lucide-react';

interface ThermoGridProps {
  state: SimulationState;
  onSelectZone: (zoneId: ZoneId) => void;
  interactive?: boolean;
  size?: 'normal' | 'large' | 'compact';
}

export const ThermoGrid: React.FC<ThermoGridProps> = ({
  state,
  onSelectZone,
  interactive = true,
  size = 'normal'
}) => {
  const { probabilities, disturbanceMap, likelyZone, targetPos } = state;

  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-3 p-3 bg-[#0d120f] border border-[#222d25] rounded-xl shadow-2xl relative">
        {ZONE_LIST.map((zone) => {
          const prob = probabilities[zone.id] || 0;
          const disturbance = disturbanceMap[zone.id] || 0;
          const isLikely = likelyZone === zone.id && prob > 25;

          // Compute heat background color dynamically
          // Low prob: #111714 -> High prob: #b8ff3d or glowing green
          const intensity = Math.min(100, Math.max(0, prob));
          
          return (
            <div
              key={zone.id}
              onClick={() => interactive && onSelectZone(zone.id)}
              className={`relative rounded-lg p-3 border font-mono transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                interactive ? 'cursor-pointer hover:border-[#b8ff3d] hover:scale-[1.02]' : ''
              } ${
                size === 'large' ? 'min-h-[140px]' : size === 'compact' ? 'min-h-[85px]' : 'min-h-[110px]'
              } ${
                isLikely
                  ? 'bg-gradient-to-br from-[#1a2e1f] via-[#243d2b] to-[#122116] border-[#b8ff3d] shadow-[0_0_25px_rgba(184,255,61,0.25)] ring-1 ring-[#b8ff3d]/50'
                  : 'bg-[#121814] border-[#222e26] hover:bg-[#16201b]'
              }`}
            >
              {/* Heat overlay intensity fill */}
              <div
                className="absolute inset-0 pointer-events-none transition-all duration-500 opacity-25"
                style={{
                  background: isLikely
                    ? `radial-gradient(circle at center, rgba(184,255,61,0.6) 0%, rgba(102,255,153,0.1) 70%, transparent 100%)`
                    : `radial-gradient(circle at center, rgba(184,255,61,${intensity / 180}) 0%, transparent 70%)`
                }}
              />

              {/* Top Row: Zone Badge & Room Tag */}
              <div className="flex items-start justify-between z-10">
                <div className="flex items-center space-x-1.5">
                  <span className={`text-xs font-black px-1.5 py-0.5 rounded ${
                    isLikely
                      ? 'bg-[#b8ff3d] text-[#0b0f0d]'
                      : 'bg-[#1b251f] text-[#8a9d90] border border-[#2b3b30]'
                  }`}>
                    {zone.id}
                  </span>
                  {isLikely && (
                    <span className="flex items-center space-x-1 text-[10px] text-[#b8ff3d] font-bold bg-[#b8ff3d]/10 px-1 py-0.5 rounded border border-[#b8ff3d]/30 animate-pulse">
                      <Target className="w-2.5 h-2.5" />
                      <span>MOST PROBABLE</span>
                    </span>
                  )}
                </div>

                <span className="text-[10px] text-[#63756a] truncate max-w-[90px]">
                  {zone.name}
                </span>
              </div>

              {/* Center: Big Probability % */}
              <div className="my-1 z-10">
                <div className="flex items-baseline space-x-1">
                  <span className={`font-black tracking-tight ${
                    size === 'large' ? 'text-3xl' : size === 'compact' ? 'text-lg' : 'text-2xl'
                  } ${
                    isLikely ? 'text-[#b8ff3d] drop-shadow-[0_0_8px_rgba(184,255,61,0.5)]' : prob > 20 ? 'text-[#66ff99]' : 'text-[#8a9d90]'
                  }`}>
                    {prob.toFixed(1)}
                  </span>
                  <span className={`text-xs ${isLikely ? 'text-[#b8ff3d]' : 'text-[#5d7064]'}`}>%</span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-[#18221c] h-1.5 rounded-full mt-1 overflow-hidden border border-[#233027]">
                  <div
                    className={`h-full transition-all duration-300 rounded-full ${
                      isLikely ? 'bg-[#b8ff3d]' : prob > 20 ? 'bg-[#66ff99]' : 'bg-[#3b4d42]'
                    }`}
                    style={{ width: `${Math.min(100, Math.max(2, prob))}%` }}
                  />
                </div>
              </div>

              {/* Bottom: Disturbance & Info */}
              <div className="flex items-center justify-between text-[10px] text-[#63756a] z-10 pt-1 border-t border-[#1a251e]">
                <span>DISTURB: <strong className="text-[#a0b2a6]">{disturbance.toFixed(0)}%</strong></span>
                <span className="truncate">{zone.description.split(' ')[0]}</span>
              </div>

              {/* Pulse Ring if likely zone */}
              {isLikely && (
                <div className="absolute inset-0 border-2 border-[#b8ff3d]/40 rounded-lg pointer-events-none animate-ping opacity-25" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
