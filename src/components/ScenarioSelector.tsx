import React from 'react';
import { ScenarioId, SimulationState } from '../types';
import { SCENARIO_LIST } from '../lib/demoScenarios';
import { Play, Pause, RotateCcw, Sliders, Zap, CheckCircle2 } from 'lucide-react';

interface ScenarioSelectorProps {
  state: SimulationState;
  onScenarioChange: (id: ScenarioId) => void;
  onTogglePlay: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
}

export const ScenarioSelector: React.FC<ScenarioSelectorProps> = ({
  state,
  onScenarioChange,
  onTogglePlay,
  onReset,
  onSpeedChange
}) => {
  const currentScenario = SCENARIO_LIST.find(s => s.id === state.activeScenarioId);

  return (
    <div className="bg-[#121814] border border-[#222e26] rounded-xl p-4 font-mono shadow-xl">
      <div className="flex items-center justify-between mb-3 border-b border-[#1f2b22] pb-2">
        <div className="flex items-center space-x-2">
          <Sliders className="w-4 h-4 text-[#b8ff3d]" />
          <h3 className="text-sm font-bold text-[#f2f5ef]">SCENARIO CONTROL MATRIX</h3>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <button
            onClick={onTogglePlay}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded font-bold transition ${
              state.isPlaying
                ? 'bg-[#29382b] text-[#ffd54a] border border-[#3e5241]'
                : 'bg-[#b8ff3d] text-[#0b0f0d] hover:bg-[#c7ff5c]'
            }`}
          >
            {state.isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{state.isPlaying ? 'PAUSE' : 'PLAY'}</span>
          </button>

          <button
            onClick={onReset}
            className="flex items-center space-x-1 px-2.5 py-1 bg-[#18221c] text-[#a0b2a6] border border-[#28382c] rounded hover:text-[#b8ff3d] hover:border-[#b8ff3d] transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RESET</span>
          </button>
        </div>
      </div>

      {/* Scenario List Buttons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-4">
        {SCENARIO_LIST.map((sc) => {
          const isSelected = sc.id === state.activeScenarioId;
          return (
            <button
              key={sc.id}
              onClick={() => onScenarioChange(sc.id)}
              className={`text-left p-2.5 rounded-lg border transition flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#1b281f] border-[#b8ff3d] shadow-[0_0_12px_rgba(184,255,61,0.2)]'
                  : 'bg-[#151c17] border-[#222e26] hover:bg-[#1a231d] hover:border-[#334538]'
              }`}
            >
              <div className="flex items-start justify-between mb-1">
                <span className={`text-xs font-bold truncate max-w-[170px] ${isSelected ? 'text-[#b8ff3d]' : 'text-[#f2f5ef]'}`}>
                  {sc.name}
                </span>
                {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#b8ff3d] shrink-0" />}
              </div>
              <p className="text-[10px] text-[#6b7d70] line-clamp-1">{sc.subtitle}</p>
              <div className="mt-2 flex items-center justify-between text-[9px]">
                <span className="bg-[#1f2c22] text-[#8a9d90] px-1.5 py-0.5 rounded border border-[#2c3d30]">
                  {sc.badge}
                </span>
                <span className="text-[#6b7d70]">CONF: ~{sc.defaultConfidence}%</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Current Scenario Info Box */}
      {currentScenario && (
        <div className="bg-[#0b0f0d] border border-[#1e2a21] rounded-lg p-3 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2 text-[#b8ff3d] font-bold">
              <Zap className="w-3.5 h-3.5" />
              <span>ACTIVE: {currentScenario.name}</span>
            </div>
            <p className="text-[#8a9d90] text-[11px] mt-0.5 max-w-xl">
              {currentScenario.description}
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs shrink-0">
            <span className="text-[#6b7d70]">SPEED:</span>
            {[0.5, 1.0, 2.0].map((spd) => (
              <button
                key={spd}
                onClick={() => onSpeedChange(spd)}
                className={`px-2 py-0.5 rounded text-xs font-bold transition ${
                  state.speed === spd
                    ? 'bg-[#b8ff3d] text-[#0b0f0d]'
                    : 'bg-[#18221c] text-[#8a9d90] border border-[#27372b] hover:text-[#f2f5ef]'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
