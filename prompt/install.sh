#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
LINE="source \"$ROOT/prompt/bashrc\""
grep -Fqx "$LINE" "$HOME/.bashrc" 2>/dev/null || echo "$LINE" >> "$HOME/.bashrc"
echo 'Prompt Universal MultiBot instalado. Abre una terminal nueva.'
