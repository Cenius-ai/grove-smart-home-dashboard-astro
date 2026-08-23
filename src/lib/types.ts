export type SensorType = 'temperature' | 'humidity' | 'pressure' | 'airquality';

export interface SensorReading {
  timestamp: string; // ISO 8601
  value: number;
}

export interface Sensor {
  id: string;
  name: string;
  type: SensorType;
  unit: string;
  icon: string; // lucide icon name
  currentValue: number;
  min: number;
  max: number;
  avg: number;
  history: SensorReading[];
  location: string;
  status: 'online' | 'offline' | 'warning';
  lastUpdated: string;
}

export type ThemePreference = 'light' | 'dark';

export interface SensorSummary {
  id: string;
  name: string;
  type: SensorType;
  unit: string;
  icon: string;
  currentValue: number;
  location: string;
  status: 'online' | 'offline' | 'warning';
  lastUpdated: string;
}
