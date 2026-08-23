#!/usr/bin/env bash
set -eu

cd "$(dirname "$0")"

echo "==> Installing Grove dependencies..."
npm install --no-audit --no-fund

echo ""
echo "==> Setup complete."
echo "    Run the dev server:  npm run dev"
echo "    Or build for production: npm run build"
