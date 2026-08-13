import React, { useState } from 'react';
import { PageId } from './types';
import { useSimulationEngine } from './lib/simulationEngine';
import { Navbar } from './components/Navbar';
import { FooterDisclaimer } from './components/FooterDisclaimer';

// Pages
import { Dashboard } from './pages/Dashboard';
import { Simulation3D } from './pages/Simulation3D';
import { ThermoMap } from './pages/ThermoMap';
import { Methodology } from './pages/Methodology';
import { Architecture } from './pages/Architecture';
import { Research } from './pages/Research';
import { JudgeView } from './pages/JudgeView';
import { FutureHardware } from './pages/FutureHardware';

export default function App() {
  const [activePage, setActivePage] = useState<PageId>('dashboard');

  const {
    state,
    setScenario,
    setManualTarget,
    togglePlay,
    resetSimulation,
    setSpeed,
    setCameraView,
    toggleSignalWaves,
    toggleZoneLabels,
    toggleThermoOverlay,
    toggleSound
  } = useSimulationEngine();

  const handleSelectCoords = (x: number, z: number) => {
    setManualTarget(x, z);
  };

  return (
    <div className="min-h-screen bg-[#0b0f0d] text-[#f2f5ef] flex flex-col justify-between selection:bg-[#b8ff3d] selection:text-[#0b0f0d]">
      {/* Navbar rendered on all views */}
      <Navbar
        activePage={activePage}
        onPageChange={setActivePage}
        activeScenarioId={state.activeScenarioId}
        onScenarioChange={setScenario}
        isPlaying={state.isPlaying}
        onTogglePlay={togglePlay}
        onReset={resetSimulation}
        soundEnabled={state.soundEnabled}
        onToggleSound={toggleSound}
      />

      {/* Main Page Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full flex-grow">
        {activePage === 'dashboard' && (
          <Dashboard
            state={state}
            onPageChange={setActivePage}
            onScenarioChange={setScenario}
            onSelectZone={(zoneId) => setManualTarget(0, 0, zoneId)}
            onTogglePlay={togglePlay}
            onReset={resetSimulation}
            onSpeedChange={setSpeed}
          />
        )}

        {activePage === 'simulation3d' && (
          <Simulation3D
            state={state}
            onSelectZone={(zoneId) => setManualTarget(0, 0, zoneId)}
            onSelectCoords={handleSelectCoords}
            onScenarioChange={setScenario}
            onTogglePlay={togglePlay}
            onReset={resetSimulation}
            onSpeedChange={setSpeed}
            onSetCameraView={setCameraView}
            onToggleSignalWaves={toggleSignalWaves}
            onToggleZoneLabels={toggleZoneLabels}
            onToggleThermoOverlay={toggleThermoOverlay}
            onToggleSound={toggleSound}
          />
        )}

        {activePage === 'thermomap' && (
          <ThermoMap
            state={state}
            onSelectZone={(zoneId) => setManualTarget(0, 0, zoneId)}
            onPageChange={setActivePage}
          />
        )}

        {activePage === 'methodology' && <Methodology />}

        {activePage === 'architecture' && <Architecture />}

        {activePage === 'research' && <Research />}

        {activePage === 'hardware' && <FutureHardware />}

        {activePage === 'judge' && (
          <JudgeView
            state={state}
            onSelectZone={(zoneId) => setManualTarget(0, 0, zoneId)}
            onScenarioChange={setScenario}
            onTogglePlay={togglePlay}
            onReset={resetSimulation}
            onPageChange={setActivePage}
          />
        )}
      </main>

      {/* Footer Disclaimer */}
      {activePage !== 'judge' && <FooterDisclaimer />}
    </div>
  );
}
