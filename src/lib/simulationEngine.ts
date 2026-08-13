import { useState, useEffect, useRef, useCallback } from 'react';
import { SimulationState, ScenarioId, TargetPosition, ZoneId, WaveformDataPoint } from '../types';
import { DEMO_SCENARIOS } from './demoScenarios';
import { calculateZoneState, ZONES } from './zoneMath';
import { soundEngine } from './soundEffects';

const INITIAL_STATE: SimulationState = {
  isPlaying: true,
  speed: 1.0,
  activeScenarioId: 'static_b2',
  currentTime: 0,
  targetPos: DEMO_SCENARIOS['static_b2'].initialPos,
  probabilities: calculateZoneState(DEMO_SCENARIOS['static_b2'].initialPos, 'LOW', 0).probabilities,
  disturbanceMap: calculateZoneState(DEMO_SCENARIOS['static_b2'].initialPos, 'LOW', 0).disturbanceMap,
  likelyZone: 'B2',
  confidence: 91.5,
  presenceStatus: 'PRESENCE DETECTED',
  rssiCurrent: -78.4,
  snrCurrent: 19.8,
  packetRate: 124,
  noiseFloor: -92.0,
  waveformHistory: [],
  cameraView: 'isometric',
  showSignalWaves: true,
  showZoneLabels: true,
  showThermoOverlay: true,
  soundEnabled: false,
  manualTargetActive: false,
};

export function useSimulationEngine() {
  const [state, setState] = useState<SimulationState>(INITIAL_STATE);
  const stateRef = useRef(state);
  stateRef.current = state;

  const waypointsIdxRef = useRef(0);
  const waypointsProgressRef = useRef(0);

  // Sound sync
  useEffect(() => {
    soundEngine.enabled = state.soundEnabled;
  }, [state.soundEnabled]);

  // Handle Scenario Switch
  const setScenario = useCallback((scenarioId: ScenarioId) => {
    const sc = DEMO_SCENARIOS[scenarioId];
    if (!sc) return;

    waypointsIdxRef.current = 0;
    waypointsProgressRef.current = 0;

    const calc = calculateZoneState(sc.initialPos, sc.noiseLevel, 0);

    setState(prev => ({
      ...prev,
      activeScenarioId: scenarioId,
      targetPos: sc.initialPos,
      currentTime: 0,
      probabilities: calc.probabilities,
      disturbanceMap: calc.disturbanceMap,
      likelyZone: calc.likelyZone,
      confidence: calc.confidence,
      presenceStatus: calc.presenceStatus,
      rssiCurrent: calc.rssi,
      snrCurrent: calc.snr,
      manualTargetActive: false,
    }));

    soundEngine.playClick();
  }, []);

  // Set Manual Target Position (when user clicks on 3D building or 2D ThermoMap grid!)
  const setManualTarget = useCallback((x: number, z: number, zoneId?: ZoneId) => {
    let finalX = x;
    let finalZ = z;

    if (zoneId && ZONES[zoneId]) {
      [finalX, , finalZ] = ZONES[zoneId].worldPos3D;
    }

    const newTarget: TargetPosition = {
      x: finalX,
      z: finalZ,
      type: 'HUMAN',
      label: zoneId ? `Manual (${zoneId})` : 'Custom Target',
    };

    const currentScenario = DEMO_SCENARIOS[stateRef.current.activeScenarioId];
    const calc = calculateZoneState(newTarget, currentScenario?.noiseLevel || 'LOW', stateRef.current.currentTime);

    setState(prev => ({
      ...prev,
      targetPos: newTarget,
      probabilities: calc.probabilities,
      disturbanceMap: calc.disturbanceMap,
      likelyZone: calc.likelyZone,
      confidence: calc.confidence,
      presenceStatus: calc.presenceStatus,
      rssiCurrent: calc.rssi,
      snrCurrent: calc.snr,
      manualTargetActive: true,
    }));

    soundEngine.playZoneAlert();
  }, []);

  // Controls
  const togglePlay = useCallback(() => {
    setState(prev => {
      soundEngine.playClick();
      return { ...prev, isPlaying: !prev.isPlaying };
    });
  }, []);

  const resetSimulation = useCallback(() => {
    setScenario(stateRef.current.activeScenarioId);
  }, [setScenario]);

  const setSpeed = useCallback((speed: number) => {
    setState(prev => ({ ...prev, speed }));
  }, []);

  const setCameraView = useCallback((cameraView: 'isometric' | 'top' | 'perspective') => {
    setState(prev => ({ ...prev, cameraView }));
  }, []);

  const toggleSignalWaves = useCallback(() => {
    setState(prev => ({ ...prev, showSignalWaves: !prev.showSignalWaves }));
  }, []);

  const toggleZoneLabels = useCallback(() => {
    setState(prev => ({ ...prev, showZoneLabels: !prev.showZoneLabels }));
  }, []);

  const toggleThermoOverlay = useCallback(() => {
    setState(prev => ({ ...prev, showThermoOverlay: !prev.showThermoOverlay }));
  }, []);

  const toggleSound = useCallback(() => {
    setState(prev => {
      const nextSound = !prev.soundEnabled;
      soundEngine.enabled = nextSound;
      if (nextSound) soundEngine.playClick();
      return { ...prev, soundEnabled: nextSound };
    });
  }, []);

  // Tick interval for 10Hz simulation update loop
  useEffect(() => {
    const interval = setInterval(() => {
      if (!stateRef.current.isPlaying) return;

      setState(prev => {
        const delta = 0.1 * prev.speed;
        const newTime = prev.currentTime + delta;

        const currentScenario = DEMO_SCENARIOS[prev.activeScenarioId];
        let currentPos = { ...prev.targetPos };

        // Animate waypoints if applicable and not manual
        if (!prev.manualTargetActive && currentScenario && currentScenario.isAnimated && currentScenario.waypoints && currentScenario.waypoints.length > 1) {
          const waypoints = currentScenario.waypoints;
          const currentWp = waypoints[waypointsIdxRef.current];
          const nextWpIdx = (waypointsIdxRef.current + 1) % waypoints.length;
          const nextWp = waypoints[nextWpIdx];

          waypointsProgressRef.current += delta * 0.35;
          if (waypointsProgressRef.current >= 1) {
            waypointsProgressRef.current = 0;
            waypointsIdxRef.current = nextWpIdx;
          }

          const t = waypointsProgressRef.current;
          // Smooth cosine interpolation between waypoints
          const smoothT = (1 - Math.cos(t * Math.PI)) / 2;

          currentPos = {
            x: currentWp.x + (nextWp.x - currentWp.x) * smoothT,
            z: currentWp.z + (nextWp.z - currentWp.z) * smoothT,
            type: currentWp.type,
            label: `Moving: ${currentWp.label} → ${nextWp.label}`,
          };
        }

        // Recalculate physics and probability map
        const calc = calculateZoneState(
          currentPos,
          currentScenario?.noiseLevel || 'LOW',
          newTime
        );

        // Packet rate variation
        const pktVariation = Math.floor(Math.sin(newTime * 5) * 6);
        const currentPktRate = Math.max(90, 120 + pktVariation - (currentScenario?.noiseLevel === 'HIGH' ? 25 : 0));

        // Append to waveform history buffer (keep max 30 data points)
        const newWavePoint: WaveformDataPoint = {
          time: newTime.toFixed(1) + 's',
          timestamp: Date.now(),
          txPower: 20, // 20 dBm
          rxRssi: calc.rssi,
          baselineRssi: -72.0,
          rssiDelta: parseFloat((calc.rssi - (-72.0)).toFixed(1)),
          snr: calc.snr,
          confidence: calc.confidence,
          disturbance: calc.disturbanceMap[calc.likelyZone as ZoneId] || 10,
          packetRate: currentPktRate,
        };

        const updatedHistory = [...prev.waveformHistory, newWavePoint].slice(-30);

        return {
          ...prev,
          currentTime: newTime,
          targetPos: currentPos,
          probabilities: calc.probabilities,
          disturbanceMap: calc.disturbanceMap,
          likelyZone: calc.likelyZone,
          confidence: calc.confidence,
          presenceStatus: calc.presenceStatus,
          rssiCurrent: calc.rssi,
          snrCurrent: calc.snr,
          packetRate: currentPktRate,
          waveformHistory: updatedHistory,
        };
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return {
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
    toggleSound,
  };
}
