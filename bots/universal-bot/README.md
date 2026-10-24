# UNIVERSAL BOT

Instancia única de WhatsApp basada en el motor Pain Bot, reorganizada para MultiBot y sin NSFW/+18.

## Termux / servidor

```bash
cp .env.example .env
npm install
npm run bot -- universal-bot
```

## Contenido

- 201 comandos seguros declarados en `commands.json`.
- Configuración en `config/bot.js` y `config/menu.js`.
- Sesión privada en `session/`.
- Base mutable en `database/`; se inicializa desde `defaults.json`.
- Catálogo RPG semilla en `../../database/characters-catalog.seed.json`.

Las sesiones, credenciales y bases mutables nunca deben subirse a Git.
