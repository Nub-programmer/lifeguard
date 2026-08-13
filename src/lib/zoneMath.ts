import { ZoneId, ZoneInfo, TargetPosition, ZoneProbability } from '../types';

export const ZONES: Record<ZoneId, ZoneInfo> = {
  A1: {
    id: 'A1',
    row: 'A',
    col: 1,
    name: 'Entrance Lobby',
    description: 'Main entryway and security foyer',
    gridPos: [0, 0],
    worldPos3D: [-4.5, 0, -4.5]
  },
  A2: {
    id: 'A2',
    row: 'A',
    col: 2,
    name: 'North Corridor',
    description: 'Central transit hallway & access corridor',
    gridPos: [0, 1],
    worldPos3D: [0, 0, -4.5]
  },
  A3: {
    id: 'A3',
    row: 'A',
    col: 3,
    name: 'Reception & Waiting',
    description: 'Front desk and guest seating area',
    gridPos: [0, 2],
    worldPos3D: [4.5, 0, -4.5]
  },
  B1: {
    id: 'B1',
    row: 'B',
    col: 1,
    name: 'Conference Room',
    description: 'Enclosed meeting space with glass partitions',
    gridPos: [1, 0],
    worldPos3D: [-4.5, 0, 0]
  },
  B2: {
    id: 'B2',
    row: 'B',
    col: 2,
    name: 'Central Atrium',
    description: 'Open central plaza between ESP node baselines',
    gridPos: [1, 1],
    worldPos3D: [0, 0, 0]
  },
  B3: {
    id: 'B3',
    row: 'B',
    col: 3,
    name: 'Executive Office',
    description: 'Private office zone with desk and shelving',
    gridPos: [1, 2],
    worldPos3D: [4.5, 0, 0]
  },
  C1: {
    id: 'C1',
    row: 'C',
    col: 1,
    name: 'Server & Storage',
    description: 'Technical equipment rack and utility room',
    gridPos: [2, 0],
    worldPos3D: [-4.5, 0, 4.5]
  },
  C2: {
    id: 'C2',
    row: 'C',
    col: 2,
    name: 'Breakroom & Lounge',
    description: 'Staff coffee bar and dining area',
    gridPos: [2, 1],
    worldPos3D: [0, 0, 4.5]
  },
  C3: {
    id: 'C3',
    row: 'C',
    col: 3,
    name: 'East Wing Workspace',
    description: 'Open plan cubicles near Node B receiver',
    gridPos: [2, 2],
    worldPos3D: [4.5, 0, 4.5]
  }
};

export const ZONE_LIST: ZoneInfo[] = Object.values(ZONES);

// Node 3D positions
export const NODE_A_POS: [number, number, number] = [-6.2, 1.2, -6.2]; // TX Transmitter near A1
export const NODE_B_POS: [number, number, number] = [6.2, 1.2, 6.2];   // RX Receiver near C3

/**
 * Calculates zone probabilities based on target (x,z) position, presence type, and noise
 */
export function calculateZoneState(
  target: TargetPosition,
  noiseLevel: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW',
  time: number = 0
): {
  probabilities: Record<ZoneId, number>;
  disturbanceMap: Record<ZoneId, number>;
  likelyZone: ZoneId | 'NONE';
  confidence: number;
  rssi: number;
  snr: number;
  presenceStatus: 'PRESENCE DETECTED' | 'OBJECT DETECTED' | 'NO ACTIVE PRESENCE' | 'SIGNAL UNSTABLE';
} {
  const isNone = target.type === 'NONE';

  // Base parameters
  const noiseFactor = noiseLevel === 'HIGH' ? 0.25 : noiseLevel === 'MEDIUM' ? 0.12 : 0.04;
  
  if (isNone) {
    // Uniform baseline distribution with slight RF noise variance
    const probs: Record<ZoneId, number> = {} as Record<ZoneId, number>;
    const disturbances: Record<ZoneId, number> = {} as Record<ZoneId, number>;
    
    let sum = 0;
    ZONE_LIST.forEach(z => {
      const pseudoNoise = 11.1 + (Math.sin(time * 2 + z.gridPos[0] * 3 + z.gridPos[1]) * 1.5 * noiseFactor);
      const val = Math.max(1, pseudoNoise);
      probs[z.id] = val;
      disturbances[z.id] = Math.max(0.5, Math.sin(time + z.gridPos[0]) * 3);
      sum += val;
    });

    // Normalize
    ZONE_LIST.forEach(z => {
      probs[z.id] = parseFloat(((probs[z.id] / sum) * 100).toFixed(1));
    });

    return {
      probabilities: probs,
      disturbanceMap: disturbances,
      likelyZone: 'NONE',
      confidence: parseFloat((18 + Math.sin(time) * 4).toFixed(1)),
      rssi: parseFloat((-92.5 + Math.sin(time * 0.5) * 0.8).toFixed(1)),
      snr: parseFloat((4.2 + Math.cos(time * 0.5) * 0.5).toFixed(1)),
      presenceStatus: 'NO ACTIVE PRESENCE'
    };
  }

  // Calculate distance from target (x, z) to each zone center
  const rawScores: Record<ZoneId, number> = {} as Record<ZoneId, number>;
  const disturbances: Record<ZoneId, number> = {} as Record<ZoneId, number>;
  let totalScore = 0;

  // Gaussian decay spread parameter sigma (smaller = tighter localization)
  const sigma = target.type === 'OBJECT' ? 2.2 : 2.8;

  ZONE_LIST.forEach(z => {
    const [zx, , zz] = z.worldPos3D;
    const dx = target.x - zx;
    const dz = target.z - zz;
    const distSq = dx * dx + dz * dz;

    // Time jitter simulating RF multipath dynamics
    const timeJitter = Math.sin(time * 3 + zx * 0.5) * noiseFactor * 0.8;
    
    // Gaussian spatial probability kernel
    let score = Math.exp(-distSq / (2 * sigma * sigma)) + timeJitter;
    if (score < 0.01) score = 0.01;

    // Disturbance intensity (attenuation/scattering effect)
    const distVal = Math.min(100, Math.max(5, (score * 95) + (Math.random() * 5 * noiseFactor)));

    rawScores[z.id] = score;
    disturbances[z.id] = parseFloat(distVal.toFixed(1));
    totalScore += score;
  });

  // Normalize probabilities to 100%
  const probs: Record<ZoneId, number> = {} as Record<ZoneId, number>;
  let maxProb = -1;
  let topZone: ZoneId = 'B2';

  ZONE_LIST.forEach(z => {
    const p = parseFloat(((rawScores[z.id] / totalScore) * 100).toFixed(1));
    probs[z.id] = p;
    if (p > maxProb) {
      maxProb = p;
      topZone = z.id;
    }
  });

  // Calculate confidence based on top probability and noise level
  let confidence = Math.min(98.5, maxProb * 1.05);
  if (noiseLevel === 'MEDIUM') confidence *= 0.85;
  if (noiseLevel === 'HIGH') confidence *= 0.68;
  confidence = parseFloat(Math.max(35, confidence).toFixed(1));

  // RSSI calculation: Baseline -72dBm, drops up to -18dBm during body blockage
  const topDisturbance = disturbances[topZone] || 50;
  const rssiDrop = (topDisturbance / 100) * 16.5;
  const rssi = parseFloat((-72.0 - rssiDrop + (Math.sin(time * 4) * 0.6 * noiseFactor)).toFixed(1));
  const snr = parseFloat((24.5 - (rssiDrop * 0.7)).toFixed(1));

  let presenceStatus: 'PRESENCE DETECTED' | 'OBJECT DETECTED' | 'NO ACTIVE PRESENCE' | 'SIGNAL UNSTABLE' = 'PRESENCE DETECTED';
  if (target.type === 'OBJECT') presenceStatus = 'OBJECT DETECTED';
  if (noiseLevel === 'HIGH' && confidence < 65) presenceStatus = 'SIGNAL UNSTABLE';

  return {
    probabilities: probs,
    disturbanceMap: disturbances,
    likelyZone: topZone,
    confidence,
    rssi,
    snr,
    presenceStatus
  };
}
