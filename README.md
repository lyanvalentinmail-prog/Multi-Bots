# Universal MultiBot

Arquitectura modular para ejecutar **UNIVERSAL BOT**, una adaptación segura y organizada del motor de Pain Bot.

> Pain Bot pertenece a sus autores originales (`nexusday/pain-bot`, Sunkovv) y se conserva bajo GPL-3.0-or-later. La copia adaptada está en `plugins/whatsapp/pain-bot`.

## Requisitos

- Node.js 20 o superior
- npm
- FFmpeg recomendado para audio, video y stickers

## Instalación

```bash
cp .env.example .env
# Edita UNIVERSAL_BOT_OWNER_NUMBER con código de país, sin + ni espacios
npm install
npm start
```

En la primera ejecución, UNIVERSAL BOT crea automáticamente `bots/universal-bot/database/database.json` desde el esquema completo `defaults.json` y solicita el método de vinculación. La sesión queda aislada en `bots/universal-bot/session/`; los datos privados y credenciales están ignorados por Git.

### Comandos de desarrollo

```bash
npm start                 # inicia todos los bots habilitados
npm run bot -- universal-bot       # fuerza el inicio de un bot concreto
npm test                  # pruebas unitarias
npm run check             # sintaxis y pruebas
npm run add:bot -- bot4   # crea una plantilla nueva
```

## Terminal de Termux

```bash
bash termux.sh
# Atajos:
bash termux.sh --code 59899123456
bash termux.sh --qr
bash termux.sh --web
```

El menú instala dependencias, permite vincular UNIVERSAL BOT por Pairing Code o QR, abre el panel y ejecuta las pruebas.

## Panel web

```bash
npm run web
# abre http://localhost:3000
```

El panel responsive descubre `bots/*/bot.json`, muestra los 201 comandos declarados, permite crear una cuenta local y administra el runtime autorizado. Para Render se incluye `render.yaml`; la primera cuenta creada es propietaria del runtime. Las sesiones de WhatsApp no se guardan en la base del panel.

## Arquitectura

- `bots/universal-bot/`: única instancia instalada, con `bot.json`, `commands.json`, configuración, menús, sesión, esquema completo de base de datos y arranque aislados.
- `core/`: ciclo de vida, comandos, mensajes, menús y eventos.
- `commands/`: los 201 comandos seguros están clasificados por categoría y son cargados recursivamente con recarga en caliente.
- `plugins/whatsapp/pain-bot/`: motor y librerías adaptadas de Pain Bot; los comandos ya no están duplicados aquí.
- `terminal/`: presentación y utilidades de consola.
- `lib/`: base de datos, permisos, validación, API y utilidades.
- `scripts/`: instalación, administración de instancias y servidor/API del panel.
- `web/`: SPA/PWA responsive para catálogo, cuentas y runtime.
- `docs/guides/`: guías de Termux y despliegue web.

## Añadir comandos nuevos

Crea un módulo `.js` en una categoría de `commands/`:

```js
export const command = {
  name: 'ping',
  description: 'Comprueba el bot',
  async execute({ reply }) { await reply('pong') }
}
```

El cargador modular vive en `core/commandHandler.js`. El motor original está completo salvo los 14 comandos y módulos NSFW/+18 eliminados intencionalmente; quedan 201 comandos seguros. También se incluyen las 80 adivinanzas originales, el catálogo RPG de 92.919 personajes, OCR, fuentes y scripts de sincronización. Consulta `plugins/whatsapp/pain-bot/UPSTREAM.md` para el inventario de integración. Los comandos adaptados de Pain Bot viven únicamente en `commands/`; `commands/manifest.json` mantiene el inventario por categoría.

## Seguridad

No publiques `.env`, sesiones ni bases de datos. Nunca copies credenciales de WhatsApp al repositorio. Consulta `plugins/whatsapp/pain-bot/README.md` para documentación funcional del bot original.
