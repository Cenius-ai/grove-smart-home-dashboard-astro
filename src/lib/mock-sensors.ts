import type { Sensor } from './types';

function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

function generateHistory(
  baseValue: number,
  variance: number,
  count: number,
  intervalMinutes: number,
  seed: number,
): { timestamp: string; value: number }[] {
  const points: { timestamp: string; value: number }[] = [];
  const now = new Date();
  for (let i = count - 1; i >= 0; i--) {
    const ts = new Date(now.getTime() - i * intervalMinutes * 60 * 1000);
    // Deterministic variation: sine wave + seeded noise
    const seasonal = Math.sin((i / count) * Math.PI * 2 + seed) * variance * 0.6;
    const noise = (pseudoRandom(seed * 1000 + i) - 0.5) * variance * 0.8;
    const value = baseValue + seasonal + noise;
    points.push({
      timestamp: ts.toISOString(),
      value: Math.round(value * 100) / 100,
    });
  }
  return points;
}

function computeStats(history: { value: number }[]): { min: number; max: number; avg: number } {
  const values = history.map((p) => p.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  return {
    min: Math.round(min * 100) / 100,
    max: Math.round(max * 100) / 100,
    avg: Math.round(avg * 100) / 100,
  };
}

const SENSOR_DEFS: Array<{
  id: string;
  name: string;
  type: Sensor['type'];
  unit: string;
  icon: string;
  location: string;
  baseValue: number;
  variance: number;
  seed: number;
}> = [
  {
    id: 'sensor-living-temp',
    name: 'Living Room',
    type: 'temperature',
    unit: '°C',
    icon: 'thermometer',
    location: 'Main Floor',
    baseValue: 21.5,
    variance: 2.5,
    seed: 42,
  },
  {
    id: 'sensor-kitchen-hum',
    name: 'Kitchen',
    type: 'humidity',
    unit: '%',
    icon: 'droplets',
    location: 'Main Floor',
    baseValue: 48,
    variance: 8,
    seed: 137,
  },
  {
    id: 'sensor-bedroom-temp',
    name: 'Master Bedroom',
    type: 'temperature',
    unit: '°C',
    icon: 'thermometer',
    location: 'Upper Floor',
    baseValue: 19.8,
    variance: 1.8,
    seed: 253,
  },
  {
    id: 'sensor-outdoor-press',
    name: 'Outdoor Pressure',
    type: 'pressure',
    unit: 'hPa',
    icon: 'gauge',
    location: 'Exterior',
    baseValue: 1013.2,
    variance: 6,
    seed: 401,
  },
  {
    id: 'sensor-garage-air',
    name: 'Garage Air Quality',
    type: 'airquality',
    unit: 'AQI',
    icon: 'wind',
    location: 'Garage',
    baseValue: 42,
    variance: 15,
    seed: 519,
  },
  {
    id: 'sensor-bathroom-hum',
    name: 'Bathroom',
    type: 'humidity',
    unit: '%',
    icon: 'droplets',
    location: 'Upper Floor',
    baseValue: 62,
    variance: 12,
    seed: 618,
  },
  {
    id: 'sensor-office-temp',
    name: 'Home Office',
    type: 'temperature',
    unit: '°C',
    icon: 'thermometer',
    location: 'Upper Floor',
    baseValue: 22.1,
    variance: 2.0,
    seed: 777,
  },
  {
    id: 'sensor-basement-hum',
    name: 'Basement',
    type: 'humidity',
    unit: '%',
    icon: 'droplets',
    location: 'Basement',
    baseValue: 55,
    variance: 6,
    seed: 890,
  },
  {
    id: 'sensor-attic-temp',
    name: 'Attic',
    type: 'temperature',
    unit: '°C',
    icon: 'thermometer',
    location: 'Attic',
    baseValue: 26.3,
    variance: 4.5,
    seed: 941,
  },
];

function buildSensor(def: (typeof SENSOR_DEFS)[number]): Sensor {
  const history = generateHistory(def.baseValue, def.variance, 96, 30, def.seed);
  const stats = computeStats(history);
  const currentValue = history[history.length - 1].value;

  return {
    id: def.id,
    name: def.name,
    type: def.type,
    unit: def.unit,
    icon: def.icon,
    currentValue,
    location: def.location,
    status: def.id === 'sensor-garage-air' ? 'warning' : 'online',
    lastUpdated: new Date().toISOString(),
    ...stats,
    history,
  };
}

const _sensors: Sensor[] = SENSOR_DEFS.map(buildSensor);

export const mockSensors: Sensor[] = _sensors;

export function getSensorById(id: string): Sensor | undefined {
  return mockSensors.find((s) => s.id === id);
}

export function getSensorSummaries() {
  return mockSensors.map(({ history, min, max, avg, ...summary }) => summary);
}

/**
 * Applies deterministic jitter to a sensor's current value for simulated live updates.
 * Returns a new value slightly offset from the original, cycling over time.
 */
export function getJitteredValue(sensor: Sensor): number {
  const now = Date.now();
  const cycleMs = 60_000; // full cycle every minute
  const phase = (now % cycleMs) / cycleMs;
  const jitterRange = (sensor.max - sensor.min) * 0.08;
  const jitter = Math.sin(phase * Math.PI * 2) * jitterRange;
  const raw = sensor.currentValue + jitter;
  return Math.round(raw * 100) / 100;
}
