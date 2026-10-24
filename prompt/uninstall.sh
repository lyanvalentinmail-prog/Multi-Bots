#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
sed -i.bak "|source \"$ROOT/prompt/bashrc\"|d" "$HOME/.bashrc"
echo 'Prompt eliminado.'
