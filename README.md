# Grove — Smart-Home Dashboard — production-ready Astro monitoring dashboard starter

**Grove — Smart-Home Dashboard** is a free, open-source monitoring dashboard built with Astro. A read‑only smart‑home dashboard built with Astro + TypeScript that displays live‑like sensor readings for temperature, humidity, lights, energy usage, motion, and locks. Run it locally, deploy it as a self-hosted monitoring dashboard, or [remix it on cenius.ai](https://cenius.ai/marketplace/p/grove-smart-home-dashboard?ref=gh&utm_campaign=grove-smart-home-dashboard-astro) to make it your own — the whole application (code, design, seeded demo data) ships in this repository under the Apache-2.0 license.

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE) ![Stack](https://img.shields.io/badge/Stack-Astro-3b82f6) [![Built with cenius.ai](https://img.shields.io/badge/Built%20with-cenius.ai-8b5cf6)](https://cenius.ai)

[![Open in cenius.ai](https://img.shields.io/badge/▶%20Open%20%26%20edit%20in-cenius.ai-8b5cf6?style=for-the-badge)](https://cenius.ai/marketplace/p/grove-smart-home-dashboard?ref=gh&utm_campaign=grove-smart-home-dashboard-astro)

> **▶ [Open & edit in cenius.ai](https://cenius.ai/marketplace/p/grove-smart-home-dashboard?ref=gh&utm_campaign=grove-smart-home-dashboard-astro)** — one click to an editable workspace: describe changes in plain English, get an instant preview, one-click deploy and host. Modifications made on the platform come with full rebrand & relicense rights.

_Local clone? See [Quick start](#quick-start) below. cenius.ai is the zero-setup path._

## Demo

![Grove — Smart-Home Dashboard — monitoring dashboard](.github/media/poster.png)

![Grove — Smart-Home Dashboard demo — monitoring dashboard built with Astro](.github/media/hero_flagship.gif)

▶ **[Watch the full demo video](https://cenius.ai/marketplace/p/grove-smart-home-dashboard?ref=gh&utm_campaign=grove-smart-home-dashboard-astro)** — the complete walkthrough, playing on the project's cenius.ai page · [MP4 file](.github/media/demo.mp4)

## Screenshots

<img src=".github/media/shot-1.png" width="32%" alt="Grove — Smart-Home Dashboard monitoring dashboard screenshot 1"/> <img src=".github/media/shot-2.png" width="32%" alt="Grove — Smart-Home Dashboard monitoring dashboard screenshot 2"/> <img src=".github/media/shot-3.png" width="32%" alt="Grove — Smart-Home Dashboard monitoring dashboard screenshot 3"/>

## Features

- Dashboard overview with sensor cards
- Sensor detail page with historical chart
- Light/dark theme toggle
- Responsive design
- Simulated live updates
- Multi‑page navigation

## Quick start

```bash
./install.sh   # installs dependencies + seeds demo data
```

See [`INSTALL.md`](INSTALL.md) for full setup and usage instructions.

## Usage guide

### Dashboard (`/`)

The home screen displays a grid of sensor cards. Each card shows:

- **Sensor name** and **location**
- **Current value** with unit (e.g. `21.5 °C`)
- **Status dot** — green (online), amber (warning), grey (offline)
- **Last updated** timestamp

The values **update every 5 seconds** automatically — no page reload needed. Each card polls the API for a jittered reading, simulating real sensor drift.

Click any card to open its detail page.

#### Keyboard navigation

- **Tab** through cards and navigation links
- **Enter** to follow a link / open a detail page
- **Focus ring** is visible on every interactive element

### Sensor Detail (`/sensor/[id]`)

Each sensor detail page includes:

1. **Header card** — sensor icon, name, location, type, and online status
2. **Stat grid** — current, average, min, and max values over 48 hours
3. **History chart** — a filled line chart (Chart.js) of all 96 readings
4. **Recent readings table** — the last 12 data points in tabular form

Use the **"Back to Dashboard"** link or the header nav to return.

### Settings (`/settings`)

The settings page provides:

- **Appearance** — theme toggle instructions (the toggle lives in the header, not here)
- **Live Updates** — explains the 5-second polling interval
- **Sensor Registry** — a table of all simulated sensors with links, types, locations, current values, and status
- **About** — project background and tech stack

### Theme Toggle

The **sun/moon icon** in the top-right header switches between light and dark mode.

_Full guide: [`USAGE.md`](USAGE.md)_

## Architecture

Astro application, delivered as a complete, runnable project (47 files). Top-level layout: `public/`, `src/`. `install.sh` provisions dependencies and seeds demo data, so the app boots with something to show. Setup details live in [`INSTALL.md`](INSTALL.md).

## FAQ

### What does it take to self-host Grove — Smart-Home Dashboard?

Everything you need ships in this repo: clone it, run `./install.sh` to install dependencies and seed demo data, then follow [`INSTALL.md`](INSTALL.md) to start it. No external services required.

### Is there a no-code way to modify Grove — Smart-Home Dashboard?

Describe what you want changed on [cenius.ai](https://cenius.ai/marketplace/p/grove-smart-home-dashboard?ref=gh&utm_campaign=grove-smart-home-dashboard-astro) — no code editing needed; the platform produces a fresh build you can download and deploy.

### Which technology stack does Grove — Smart-Home Dashboard use?

Astro. The full source in this repository is exactly what the app runs. Highlights include sensor detail page with historical chart.

### Is Grove — Smart-Home Dashboard free for commercial use?

It is. Apache-2.0 licensing means you can build a product on it, sell it, or use it inside a company with no fees. Details: [LICENSE](LICENSE).

### Is white-labeling Grove — Smart-Home Dashboard allowed?

Yes — and the easiest way is [remixing it on cenius.ai](https://cenius.ai/marketplace/p/grove-smart-home-dashboard?ref=gh&utm_campaign=grove-smart-home-dashboard-astro): modifications made on the platform come with full rebrand and relicense rights over your derivative.

## License & rebranding

Released under the [Apache License 2.0](LICENSE) (© 2026 Cenius AI) — free for personal and commercial use. The Cenius name/logo are trademarks (see NOTICE).

**Need a customized version?** [Remix this app on cenius.ai](https://cenius.ai/marketplace/p/grove-smart-home-dashboard?ref=gh&utm_campaign=grove-smart-home-dashboard-astro) — modifications made on the platform come with **full rebrand & relicense rights** over your derivative.

## Built with cenius.ai

This entire application — code, design, seeded demo data — was generated on **[cenius.ai](https://cenius.ai)** from a plain-English description.

- 🚀 [Build your own app on cenius.ai](https://cenius.ai)
- 🎛️ [Remix Grove — Smart-Home Dashboard on the marketplace](https://cenius.ai/marketplace/p/grove-smart-home-dashboard?ref=gh&utm_campaign=grove-smart-home-dashboard-astro) — open it in a workspace, prompt for changes, and ship your own version.

More open-source apps: [the Cenius-ai catalog](https://github.com/Cenius-ai) · [showcase index](https://github.com/Cenius-ai/showcase)
