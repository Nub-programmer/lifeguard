export type PageId = 
  | 'dashboard' 
  | 'simulation3d' 
  | 'thermomap' 
  | 'methodology' 
  | 'architecture' 
  | 'research' 
  | 'judge' 
  | 'hardware';

export type ZoneId = 'A1' | 'A2' | 'A3' | 'B1' | 'B2' | 'B3' | 'C1' | 'C2' | 'C3';

export interface ZoneInfo {
  id: ZoneId;
  row: 'A' | 'B' | 'C';
  col: 1 | 2 | 3;
  name: string;
  description: string;
  gridPos: [number, number]; // [rowIdx 0..2, colIdx 0..2]
  worldPos3D: [number, number, number]; // [x, y, z] in 3D scene
}

export type PresenceType = 'HUMAN' | 'OBJECT' | 'NONE' | 'MULTIPLE';

export interface TargetPosition {
  x: number; // 3D world x (-6 to 6)
  z: number; // 3D world z (-6 to 6)
  type: PresenceType;
  label?: string;
}

export interface ZoneProbability {
  zoneId: ZoneId;
  probability: number; // 0..100
  disturbanceIntensity: number; // 0..100
  rssiDelta: number; // dBm drop
  snr: number; // dB
}

export interface NodeStatus {
  id: string;
  name: string;
  role: 'TRANSMITTER (TX)' | 'RECEIVER (RX)';
  status: 'ONLINE' | 'CALIBRATING' | 'OFFLINE';
  ip: string;
  frequency: string;
  txPower: number; // dBm
  packetsSent: number;
  packetsReceived: number;
  rssiAvg: number;
  position3D: [number, number, number];
  zoneLocation: ZoneId;
}

export type ScenarioId = 
  | 'idle' 
  | 'static_b2' 
  | 'movement_a1_b2' 
  | 'object_c3' 
  | 'noisy_env' 
  | 'weak_alignment' 
  | 'ambiguous_b1_b2';

export interface Scenario {
  id: ScenarioId;
  name: string;
  subtitle: string;
  description: string;
  targetType: PresenceType;
  initialPos: TargetPosition;
  isAnimated: boolean;
  waypoints?: TargetPosition[];
  noiseLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  expectedZone: ZoneId | 'NONE' | 'AMBIGUOUS';
  defaultConfidence: number;
  badge: string;
}

export interface WaveformDataPoint {
  time: string;
  timestamp: number;
  txPower: number;
  rxRssi: number;
  baselineRssi: number;
  rssiDelta: number;
  snr: number;
  confidence: number;
  disturbance: number;
  packetRate: number;
}

export interface SimulationState {
  isPlaying: boolean;
  speed: number;
  activeScenarioId: ScenarioId;
  currentTime: number; // seconds elapsed
  targetPos: TargetPosition;
  probabilities: Record<ZoneId, number>;
  disturbanceMap: Record<ZoneId, number>;
  likelyZone: ZoneId | 'NONE';
  confidence: number; // 0..100
  presenceStatus: 'PRESENCE DETECTED' | 'OBJECT DETECTED' | 'NO ACTIVE PRESENCE' | 'SIGNAL UNSTABLE';
  rssiCurrent: number; // dBm
  snrCurrent: number; // dB
  packetRate: number; // pkts/sec
  noiseFloor: number; // dBm
  waveformHistory: WaveformDataPoint[];
  cameraView: 'isometric' | 'top' | 'perspective';
  showSignalWaves: boolean;
  showZoneLabels: boolean;
  showThermoOverlay: boolean;
  soundEnabled: boolean;
  manualTargetActive: boolean;
}

export interface ConfusionMatrixCell {
  actual: ZoneId;
  predicted: ZoneId;
  count: number;
}

export interface AccuracyMetric {
  noiseLevel: string;
  accuracyPct: number;
  falsePositivePct: number;
  falseNegativePct: number;
  avgConfidencePct: number;
}
