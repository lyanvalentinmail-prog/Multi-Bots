# Comandos compartidos

`commands/` es la única ubicación de implementaciones. Los 201 comandos seguros están separados por categoría y `bots/universal-bot/commands.json` declara cuáles carga UNIVERSAL BOT.

Los comandos heredados conservan el contrato Pain Bot (`handler`, `command`, `help`, `tags`) y el cargador los normaliza. Para un comando nuevo también se admite el contrato Universal:

```js
export const command = {
  name: 'ping',
  description: 'Comprueba el bot',
  async execute({ reply }) { await reply('pong') }
}
```

Al añadir o quitar un archivo, actualiza `commands/manifest.json`, `commands/categories.json` y el manifiesto del bot.
