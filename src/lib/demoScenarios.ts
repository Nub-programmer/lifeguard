import { Scenario, ScenarioId } from '../types';

export const DEMO_SCENARIOS: Record<ScenarioId, Scenario> = {
  idle: {
    id: 'idle',
    name: 'Idle / Empty Building',
    subtitle: 'Baseline RF signal space without human interference',
    description: 'Simulates a calm indoor environment with no moving subjects or heavy attenuation. Demonstrates baseline Wi-Fi RSSI stability (~-72 dBm).',
    targetType: 'NONE',
    initialPos: { x: 0, z: 0, type: 'NONE', label: 'Empty Space' },
    isAnimated: false,
    noiseLevel: 'LOW',
    expectedZone: 'NONE',
    defaultConfidence: 18.2,
    badge: 'BASELINE'
  },
  static_b2: {
    id: 'static_b2',
    name: 'Static Person in B2 (Central Atrium)',
    subtitle: 'Clear stationary body blockage between nodes',
    description: 'Subject standing at the center of the building (Zone B2). Direct multipath absorption creates high confidence (~92%) zone classification.',
    targetType: 'HUMAN',
    initialPos: { x: 0, z: 0, type: 'HUMAN', label: 'Person (B2)' },
    isAnimated: false,
    noiseLevel: 'LOW',
    expectedZone: 'B2',
    defaultConfidence: 91.5,
    badge: 'HIGH CONFIDENCE'
  },
  movement_a1_b2: {
    id: 'movement_a1_b2',
    name: 'Movement Trajectory: A1 → A2 → B2',
    subtitle: 'Live dynamic tracking across entrance corridor to atrium',
    description: 'Subject enters at Zone A1 (Entrance Lobby), walks down A2 (Corridor), and stops in B2 (Central Atrium). Demonstrates real-time ThermoMap shifting.',
    targetType: 'HUMAN',
    initialPos: { x: -4.5, z: -4.5, type: 'HUMAN', label: 'Moving Subject' },
    isAnimated: true,
    waypoints: [
      { x: -4.5, z: -4.5, type: 'HUMAN', label: 'Entrance A1' },
      { x: -2.2, z: -4.5, type: 'HUMAN', label: 'Corridor A2' },
      { x: 0, z: -2.2, type: 'HUMAN', label: 'Transition' },
      { x: 0, z: 0, type: 'HUMAN', label: 'Atrium B2' }
    ],
    noiseLevel: 'LOW',
    expectedZone: 'B2',
    defaultConfidence: 88.0,
    badge: 'DYNAMIC TRACK'
  },
  object_c3: {
    id: 'object_c3',
    name: 'Stationary Object in C3 (East Wing)',
    subtitle: 'Metallic / dense equipment placement near Node B',
    description: 'Large stationary object or equipment box placed in Zone C3. Constant localized RF scattering provides high zone probability (~90%).',
    targetType: 'OBJECT',
    initialPos: { x: 4.5, z: 4.5, type: 'OBJECT', label: 'Dense Object' },
    isAnimated: false,
    noiseLevel: 'LOW',
    expectedZone: 'C3',
    defaultConfidence: 89.8,
    badge: 'OBJECT REFLECTION'
  },
  noisy_env: {
    id: 'noisy_env',
    name: 'Heavy RF Noise & Interference',
    subtitle: '2.4GHz spectrum congestion & background noise',
    description: 'Simulates heavy external RF interference (microwave / Bluetooth / high traffic). Shows model resilience under noisy signal conditions (~62% confidence).',
    targetType: 'HUMAN',
    initialPos: { x: 0, z: -4.5, type: 'HUMAN', label: 'Person in A2' },
    isAnimated: true,
    waypoints: [
      { x: 0, z: -4.5, type: 'HUMAN', label: 'A2' },
      { x: 4.5, z: -4.5, type: 'HUMAN', label: 'A3' }
    ],
    noiseLevel: 'HIGH',
    expectedZone: 'A2',
    defaultConfidence: 61.4,
    badge: 'SPECTRUM NOISE'
  },
  weak_alignment: {
    id: 'weak_alignment',
    name: 'Weak Node Alignment & Obstruction',
    subtitle: 'Partial Line-of-Sight blocking with wall reflection',
    description: 'Subject located in B3 (Executive Office) behind a reinforced drywall partition. Demonstrates scattering multi-path signature with moderate confidence (~74%).',
    targetType: 'HUMAN',
    initialPos: { x: 4.5, z: 0, type: 'HUMAN', label: 'Behind Wall (B3)' },
    isAnimated: false,
    noiseLevel: 'MEDIUM',
    expectedZone: 'B3',
    defaultConfidence: 73.8,
    badge: 'WALL ATTENUATION'
  },
  ambiguous_b1_b2: {
    id: 'ambiguous_b1_b2',
    name: 'Zone Boundary Ambiguity (B1 / B2)',
    subtitle: 'Subject standing directly on boundary line',
    description: 'Subject positioned between Zone B1 (Conference) and B2 (Atrium). Highlights probabilistic heat spread across neighboring grid cells.',
    targetType: 'HUMAN',
    initialPos: { x: -2.2, z: 0, type: 'HUMAN', label: 'Boundary Person' },
    isAnimated: false,
    noiseLevel: 'LOW',
    expectedZone: 'AMBIGUOUS',
    defaultConfidence: 54.2,
    badge: 'PROBABILISTIC OVERLAP'
  }
};

export const SCENARIO_LIST: Scenario[] = Object.values(DEMO_SCENARIOS);
