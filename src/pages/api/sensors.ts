import type { APIRoute } from 'astro';
import { getSensorSummaries, mockSensors, getJitteredValue } from '../../lib/mock-sensors';

export const GET: APIRoute = () => {
  const summaries = getSensorSummaries().map((s) => {
    const full = mockSensors.find((f) => f.id === s.id);
    const jitteredValue = full ? getJitteredValue(full) : s.currentValue;
    return {
      ...s,
      currentValue: jitteredValue,
      lastUpdated: new Date().toISOString(),
    };
  });

  return new Response(JSON.stringify(summaries), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
