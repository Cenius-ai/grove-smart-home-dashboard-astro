import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import type { Sensor, SensorReading } from '../lib/types';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

interface Props {
  sensorId: string;
  sensorName: string;
  unit: string;
  type: string;
}

const typeAccentHex: Record<string, string> = {
  temperature: '#e67e4a',
  humidity: '#4d77cc',
  pressure: '#7c5cbf',
  airquality: '#43a87c',
};

function formatHistoryForChart(history: SensorReading[]) {
  const labels = history.map((p) => {
    const d = new Date(p.timestamp);
    return d.toLocaleDateString([], { month: 'short', day: 'numeric' })
      + ' '
      + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  });
  const values = history.map((p) => p.value);
  return { labels, values };
}

export default function SensorChart({ sensorId, sensorName, unit, type }: Props) {
  const [sensor, setSensor] = useState<Sensor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/sensor/${sensorId}-history`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Sensor = await res.json();
        if (!cancelled) setSensor(data);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load history');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [sensorId]);

  if (loading) {
    return (
      <div className="surface-card p-8 flex items-center justify-center" style={{ minHeight: '320px' }}>
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-border)] border-t-[var(--color-accent)]" />
          <span className="text-sm text-[var(--color-muted)]">Loading history&hellip;</span>
        </div>
      </div>
    );
  }

  if (error || !sensor) {
    return (
      <div className="surface-card p-8 flex items-center justify-center" style={{ minHeight: '320px' }}>
        <div className="text-center">
          <p className="text-[var(--color-danger)] font-medium">Could not load sensor data</p>
          <p className="text-sm text-[var(--color-muted)] mt-1">{error ?? 'Unknown error'}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-btn px-4 py-2 text-sm font-medium bg-[var(--color-accent)] text-[var(--color-accent-fg)] hover:opacity-90 transition-opacity"
            style={{ minWidth: '24px', minHeight: '24px' }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const accentHex = typeAccentHex[type] ?? '#4d77cc';
  const { labels, values } = formatHistoryForChart(sensor.history);
  const isDark = typeof document !== 'undefined'
    && document.documentElement.getAttribute('data-theme') === 'dark';
  const gridColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
  const textColor = isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.50)';

  const chartData = {
    labels,
    datasets: [
      {
        label: sensorName,
        data: values,
        borderColor: accentHex,
        backgroundColor: accentHex + '18',
        fill: true,
        tension: 0.35,
        pointRadius: 0,
        pointHitRadius: 12,
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: isDark ? '#2a2a3c' : '#ffffff',
        titleColor: isDark ? '#e0e0e0' : '#1a1a2e',
        bodyColor: isDark ? '#c0c0c0' : '#404060',
        borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 10,
        displayColors: false,
        callbacks: {
          label: (ctx: { parsed: { y: number } }) => `${ctx.parsed.y.toFixed(1)} ${unit}`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: gridColor, drawBorder: false },
        ticks: {
          color: textColor,
          maxTicksLimit: 8,
          font: { size: 11 },
        },
      },
      y: {
        grid: { color: gridColor, drawBorder: false },
        ticks: {
          color: textColor,
          font: { size: 11 },
          callback: (v: number | string) => `${Number(v).toFixed(1)}`,
        },
      },
    },
  };

  return (
    <div className="surface-card p-5">
      <div style={{ height: '340px' }}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
