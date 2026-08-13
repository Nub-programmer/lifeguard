import React from 'react';
import { PageId, ScenarioId } from '../types';
import { DEMO_SCENARIOS, SCENARIO_LIST } from '../lib/demoScenarios';
import { 
  Activity, 
  Box, 
  Grid, 
  BookOpen, 
  Cpu, 
  FileCheck2, 
  Award, 
  Radio, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  RotateCcw,
  Zap
} from 'lucide-react';

interface NavbarProps {
  activePage: PageId;
  onPageChange: (page: PageId) => void;
  activeScenarioId: ScenarioId;
  onScenarioChange: (scenarioId: ScenarioId) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onReset: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onPageChange,
  activeScenarioId,
  onScenarioChange,
  isPlaying,
  onTogglePlay,
  onReset,
  soundEnabled,
  onToggleSound
}) => {
  const navItems: { id: PageId; label: string; icon: React.ReactNode; isSpecial?: boolean }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <Activity className="w-4 h-4" /> },
    { id: 'simulation3d', label: '3D Simulation', icon: <Box className="w-4 h-4" /> },
    { id: 'thermomap', label: 'ThermoMap', icon: <Grid className="w-4 h-4" /> },
    { id: 'methodology', label: 'Methodology', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'architecture', label: 'Architecture', icon: <Cpu className="w-4 h-4" /> },
    { id: 'research', label: 'Research', icon: <FileCheck2 className="w-4 h-4" /> },
    { id: 'hardware', label: 'Future Hardware', icon: <Radio className="w-4 h-4" /> },
    { id: 'judge', label: 'Judge View', icon: <Award className="w-4 h-4" />, isSpecial: true },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0d120f]/90 backdrop-blur-md border-b border-[#222c25]">
      {/* Top Banner Status Bar */}
      <div className="hidden lg:flex items-center justify-between px-4 py-1 bg-[#070a08] border-b border-[#18221c] text-[11px] font-mono text-[#8a9b90]">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1 text-[#b8ff3d]">
            <span className="w-2 h-2 rounded-full bg-[#b8ff3d] animate-pulse"></span>
            <span className="font-bold">MODE: SIMULATION</span>
          </span>
          <span className="text-[#3d4d42]">|</span>
          <span className="text-[#66ff99] flex items-center space-x-1">
            <Radio className="w-3 h-3 animate-spin" />
            <span>NODES: VIRTUAL ONLINE (ESP32-TX / ESP32-RX)</span>
          </span>
          <span className="text-[#3d4d42]">|</span>
          <span className="text-[#d0e0d5]">SIGNAL ENGINE: ACTIVE (10Hz SYNTHESIS)</span>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-[#8a9b90]">ACTIVE SCENARIO:</span>
          <select
            value={activeScenarioId}
            onChange={(e) => onScenarioChange(e.target.value as ScenarioId)}
            className="bg-[#141a17] text-[#b8ff3d] font-bold border border-[#2a382e] rounded px-2 py-0.5 text-xs focus:outline-none focus:border-[#b8ff3d]"
          >
            {SCENARIO_LIST.map((sc) => (
              <option key={sc.id} value={sc.id} className="bg-[#101311] text-[#f2f5ef]">
                {sc.name} [{sc.badge}]
              </option>
            ))}
          </select>

          <button
            onClick={onTogglePlay}
            className="flex items-center space-x-1 px-2 py-0.5 bg-[#18241c] hover:bg-[#233328] border border-[#2d3f32] text-[#f2f5ef] rounded text-xs transition"
            title={isPlaying ? 'Pause Simulation' : 'Play Simulation'}
          >
            {isPlaying ? <Pause className="w-3 h-3 text-[#ffd54a]" /> : <Play className="w-3 h-3 text-[#b8ff3d]" />}
            <span>{isPlaying ? 'PAUSE' : 'RUN'}</span>
          </button>

          <button
            onClick={onReset}
            className="p-1 text-[#8a9b90] hover:text-[#b8ff3d] transition"
            title="Reset Simulation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onToggleSound}
            className={`p-1 transition ${soundEnabled ? 'text-[#b8ff3d]' : 'text-[#526357]'}`}
            title={soundEnabled ? 'Mute Sound' : 'Enable Audio'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Brand */}
        <div 
          onClick={() => onPageChange('dashboard')} 
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-lg bg-[#141d18] border border-[#2d3f32] group-hover:border-[#b8ff3d] flex items-center justify-center transition shadow-lg relative">
            <Zap className="w-5 h-5 text-[#b8ff3d]" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#b8ff3d] animate-ping" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-black tracking-wider text-[#f2f5ef] group-hover:text-[#b8ff3d] transition font-mono">
                LifeGuard
              </span>
              <span className="bg-[#1c2a20] text-[#b8ff3d] text-[10px] font-mono px-1.5 py-0.5 rounded border border-[#2a3c2e]">
                v1.0 EXP
              </span>
            </div>
            <p className="text-[11px] text-[#8a9b90] font-sans tracking-tight">
              Wi-Fi ThermoMap Indoor Presence Simulation
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-medium transition ${
                  item.isSpecial
                    ? isActive
                      ? 'bg-[#b8ff3d] text-[#0b0f0d] font-bold shadow-[0_0_15px_rgba(184,255,61,0.4)]'
                      : 'bg-[#1e2a22] text-[#b8ff3d] border border-[#2f4234] hover:bg-[#b8ff3d] hover:text-[#0b0f0d]'
                    : isActive
                    ? 'bg-[#1b251e] text-[#b8ff3d] border border-[#2e3e32]'
                    : 'text-[#a1b3a6] hover:text-[#f2f5ef] hover:bg-[#131a15]'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Mobile Page Dropdown */}
        <div className="md:hidden flex items-center space-x-2">
          <select
            value={activePage}
            onChange={(e) => onPageChange(e.target.value as PageId)}
            className="bg-[#141a17] text-[#b8ff3d] font-mono font-bold border border-[#2a382e] rounded px-3 py-1.5 text-xs"
          >
            {navItems.map((item) => (
              <option key={item.id} value={item.id} className="bg-[#101311] text-[#f2f5ef]">
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
};
