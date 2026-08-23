import type { APIRoute } from 'astro';
import { getSensorById, getJitteredValue, mockSensors } from '../../../lib/mock-sensors';

export function getStaticPaths() {
  return mockSensors.map((s) => ({ params: { id: s.id } }));
}

export const GET: APIRoute = ({ params }) => {
  const { id } = params;
  if (!id) {
    return new Response(JSON.stringify({ error: 'Sensor ID required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const sensor = getSensorById(id);
  if (!sensor) {
    return new Response(JSON.stringify({ error: 'Sensor not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({
    ...sensor,
    currentValue: getJitteredValue(sensor),
    lastUpdated: new Date().toISOString(),
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
