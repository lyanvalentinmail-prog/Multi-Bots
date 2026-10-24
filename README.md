# Universal MultiBot

Arquitectura modular para ejecutar varios bots de WhatsApp de forma aislada. **Pain Bot** está integrado como `bot1`; `bot2` y `bot3` son plantillas deshabilitadas.

> Pain Bot pertenece a sus autores originales (`nexusday/pain-bot`, Sunkovv) y se conserva bajo GPL-3.0-or-later. La copia adaptada está en `plugins/whatsapp/pain-bot`.

## Requisitos

- Node.js 20 o superior
- npm
- FFmpeg recomendado para audio, video y stickers

## Instalación

```bash
cp .env.example .env
# Edita BOT1_OWNER_NUMBER con código de país, sin + ni espacios
npm install
npm start
```

En la primera ejecución, Pain Bot solicitará el método de vinculación. La sesión queda aislada en `bots/bot1/session/` y la base de datos en `bots/bot1/database/database.json`; ambas rutas están ignoradas por Git.

### Comandos de desarrollo

```bash
npm start                 # inicia todos los bots habilitados
npm run bot -- bot1       # fuerza el inicio de un bot concreto
npm test                  # pruebas unitarias
npm run check             # sintaxis y pruebas
npm run add:bot -- bot4   # crea una plantilla nueva
```

## Arquitectura

- `bots/`: configuración, sesión, base e inicio aislados por instancia.
- `core/`: ciclo de vida, comandos, mensajes, menús y eventos.
- `commands/`: los 215 comandos están clasificados por categoría y son cargados recursivamente con recarga en caliente.
- `plugins/whatsapp/pain-bot/`: motor y librerías adaptadas de Pain Bot; los comandos ya no están duplicados aquí.
- `terminal/`: presentación y utilidades de consola.
- `lib/`: base de datos, permisos, validación, API y utilidades.
- `scripts/`: instalación y administración de instancias.

## Añadir comandos nuevos

Crea un módulo `.js` en una categoría de `commands/`:

```js
export const command = {
  name: 'ping',
  description: 'Comprueba el bot',
  async execute({ reply }) { await reply('pong') }
}
```

El cargador modular vive en `core/commandHandler.js`. Los comandos adaptados de Pain Bot viven únicamente en `commands/`; `commands/manifest.json` mantiene el inventario por categoría.

## Seguridad

No publiques `.env`, sesiones ni bases de datos. Nunca copies credenciales de WhatsApp al repositorio. Consulta `plugins/whatsapp/pain-bot/README.md` para documentación funcional del bot original.
