#!/usr/bin/env bash
set -euo pipefail
command -v node >/dev/null || { echo 'Se requiere Node.js 20+'; exit 1; }
npm install
cp -n .env.example .env 2>/dev/null || true
echo 'Instalación completa. Ejecuta: npm start'
