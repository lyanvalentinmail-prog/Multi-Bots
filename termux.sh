#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT"

CYAN='\033[36m'; GREEN='\033[32m'; YELLOW='\033[33m'; RESET='\033[0m'
banner() {
  printf "${CYAN}\n╔════════════════════════════════╗\n║         UNIVERSAL BOT          ║\n║       MultiBot Terminal        ║\n╚════════════════════════════════╝${RESET}\n"
}
install_deps() {
  command -v node >/dev/null || { echo 'Instala Node.js 20 o superior.'; exit 1; }
  npm install
}
start_qr() { printf 'qr\n' | npm run bot -- universal-bot; }
start_code() {
  local phone="${1:-}"
  if [[ -z "$phone" ]]; then read -r -p 'Número con código de país: ' phone; fi
  phone="${phone//[^0-9]/}"
  [[ ${#phone} -ge 8 ]] || { echo 'Número inválido.'; exit 1; }
  printf 'code\n%s\n' "$phone" | npm run bot -- universal-bot
}

case "${1:-}" in
  --qr) install_deps; start_qr; exit ;;
  --code) install_deps; start_code "${2:-}"; exit ;;
  --install) install_deps; exit ;;
  --test) npm test; exit ;;
  --web) npm run web; exit ;;
esac

banner
printf "${GREEN}1)${RESET} Iniciar con Pairing Code\n"
printf "${GREEN}2)${RESET} Iniciar con QR\n"
printf "${GREEN}3)${RESET} Abrir panel web\n"
printf "${GREEN}4)${RESET} Instalar/actualizar dependencias\n"
printf "${GREEN}5)${RESET} Ejecutar pruebas\n"
printf "${YELLOW}0)${RESET} Salir\n"
read -r -p '> ' option
case "$option" in
  1) install_deps; start_code ;;
  2) install_deps; start_qr ;;
  3) install_deps; npm run web ;;
  4) install_deps ;;
  5) npm test ;;
  0) exit 0 ;;
  *) echo 'Opción inválida'; exit 1 ;;
esac
