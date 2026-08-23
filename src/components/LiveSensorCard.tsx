import { useState, useEffect, useRef } from 'react';
import type { SensorSummary } from '../lib/types';

interface Props {
  sensor: SensorSummary;
}

const iconPaths: Record<string, string> = {
  thermometer: 'M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z',
  droplets: 'M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z',
  gauge: 'M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41M14 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0z',
  wind: 'M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2',
};

const typeColors: Record<string, string> = {
  temperature: '#e67e4a',
  humidity: '#4d77cc',
  pressure: '#7c5cbf',
  airquality: '#43a87c',
};

export default function LiveSensorCard({ sensor }: Props) {
  const [value, setValue] = useState(sensor.currentValue);
  const [lastUpdated, setLastUpdated] = useState(sensor.lastUpdated);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const fetchUpdated = async () => {
      try {
        const res = await fetch(`/api/sensor/${sensor.id}`);
        if (!res.ok) return;
        const data = await res.json();
        setValue(data.currentValue);
        setLastUpdated(data.lastUpdated);
      } catch {
        // Silently ignore — the poll will retry on next tick
      }
    };

    // Fetch immediately on mount
    fetchUpdated();

    // Poll every 5 seconds
    intervalRef.current = setInterval(fetchUpdated, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [sensor.id]);

  const iconPath = iconPaths[sensor.icon] ?? iconPaths.thermometer;
  const accentColor = typeColors[sensor.type] ?? '#4d77cc';

  const formattedTime = (() => {
    try {
      return new Date(lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return 'just now';
    }
  })();

  return (
    <a
      href={`/sensor/${sensor.id}`}
      className="surface-card group flex flex-col gap-3 p-5 transition-shadow duration-160 hover:shadow-md no-underline"
      style={{ minHeight: '140px' }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-btn"
            style={{ background: `${accentColor}15`, color: accentColor }}
            aria-hidden="true"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d={iconPath} />
            </svg>
          </span>
          <div>
            <h3 className="text-sm font-semibold leading-tight" style={{ color: 'var(--color-fg)' }}>
              {sensor.name}
            </h3>
            <p className="text-xs" style={{ color: 'var(--color-muted)' }}>{sensor.location}</p>
          </div>
        </div>
        <span
          className={`status-dot ${sensor.status}`}
          aria-label={sensor.status}
        />
      </div>

      {/* Value — live-updating */}
      <div className="mt-1" aria-live="polite" aria-atomic="true">
        <span
          className="metric-value text-3xl font-semibold tracking-tight transition-colors duration-300"
          style={{ color: 'var(--color-fg)' }}
        >
          {value.toFixed(1)}
        </span>
        <span className="ml-1 text-sm" style={{ color: 'var(--color-muted)' }}>{sensor.unit}</span>
      </div>

      {/* Footer */}
      <div className="mt-auto flex items-center gap-2 text-xs" style={{ color: 'var(--color-muted)' }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <span>Updated {formattedTime}</span>
      </div>
    </a>
  );
}
