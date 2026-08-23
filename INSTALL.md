# Grove — Installation Guide

## Prerequisites

- **Node.js** 20.x or later
- **npm** 9.x or later (bundled with Node)

## Step-by-step

### 1. Clone or unpack the project

```bash
cd grove
```

### 2. Install dependencies

```bash
sh install.sh
```

This runs `npm install --no-audit --no-fund`. No additional setup, database, or environment variables are needed — the app is fully self-contained with embedded mock data.

### 3. Start the dev server

```bash
npm run dev
```

The server binds **0.0.0.0:4321** by default. Set `PORT` to override:

```bash
PORT=3000 npm run dev
```

### 4. Open in browser

Navigate to **http://localhost:4321** (or your custom port).

## Production build

```bash
npm run build      # outputs to dist/
npm run preview    # preview the static build
```

The `dist/` directory is deployable to any static host (Netlify, Vercel, Cloudflare Pages, etc.).

## Troubleshooting

| Symptom | Fix |
|---|---|
| `sh: astro: not found` | Run `npm install` first — the binary lives in `node_modules/.bin` |
| Port already in use | Set a different port: `PORT=3000 npm run dev` |
| Blank page / no styles | Ensure Tailwind built: check `tailwind.config.js` content paths include `./src/**/*.{astro,tsx}` |
