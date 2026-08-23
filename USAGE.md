# Grove — Usage Guide

## Dashboard (`/`)

The home screen displays a grid of sensor cards. Each card shows:

- **Sensor name** and **location**
- **Current value** with unit (e.g. `21.5 °C`)
- **Status dot** — green (online), amber (warning), grey (offline)
- **Last updated** timestamp

The values **update every 5 seconds** automatically — no page reload needed. Each card polls the API for a jittered reading, simulating real sensor drift.

Click any card to open its detail page.

### Keyboard navigation

- **Tab** through cards and navigation links
- **Enter** to follow a link / open a detail page
- **Focus ring** is visible on every interactive element

## Sensor Detail (`/sensor/[id]`)

Each sensor detail page includes:

1. **Header card** — sensor icon, name, location, type, and online status
2. **Stat grid** — current, average, min, and max values over 48 hours
3. **History chart** — a filled line chart (Chart.js) of all 96 readings
4. **Recent readings table** — the last 12 data points in tabular form

Use the **"Back to Dashboard"** link or the header nav to return.

## Settings (`/settings`)

The settings page provides:

- **Appearance** — theme toggle instructions (the toggle lives in the header, not here)
- **Live Updates** — explains the 5-second polling interval
- **Sensor Registry** — a table of all simulated sensors with links, types, locations, current values, and status
- **About** — project background and tech stack

## Theme Toggle

The **sun/moon icon** in the top-right header switches between light and dark mode.

- Preference is **saved to localStorage** and survives page reloads
- On first visit without a saved preference, the OS color scheme is used (`prefers-color-scheme`)
- The theme applies instantly with no flash (inline `<script>` in `<head>`)

## Responsive Design

The layout adapts at these breakpoints:

| Viewport | Behavior |
|---|---|
| < 640px | Single-column cards, stacked vertically |
| 640–1023px | 2-column card grid |
| ≥ 1024px | 3-column card grid, wider content area |

Test at 375px, 768px, and 1440px for the full range.

## How It Works

- **Mock data** lives in `src/lib/mock-sensors.ts` — 9 sensors with 96 data points each (48 hours at 30-min intervals)
- **API routes** (`/api/sensors`, `/api/sensors/:id`, `/api/sensors/:id/history`) are Astro static endpoints that read mock data and apply deterministic jitter
- **LiveSensorCard** React component polls `/api/sensors/:id` every 5 seconds
- **SensorChart** React component fetches `/api/sensors/:id/history` once and renders with Chart.js
- Everything is **static-compatible** — `getStaticPaths()` pre-renders all detail pages; API routes work in both dev and preview modes
