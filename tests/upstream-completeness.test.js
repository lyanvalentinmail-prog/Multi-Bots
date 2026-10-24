import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')

const removedAdultCommands = new Set([
  'cmd18-toggle.js', 'hentai.js', 'modo-hot.js', 'modo-ilegal.js', 'onlyfans-info.js',
  'waifu-corean.js', 'waifu-girls.js', 'waifu-nsfw.js', 'waifu-tetas.js',
  'waifu-tik18.js', 'waifu.js', 'waifu2.js', 'xnxx.js', 'xvideos.js'
])

test('la integración contiene todo el inventario seguro de Pain Bot', async () => {
  const manifest = JSON.parse(await readFile(path.join(root, 'commands/manifest.json'), 'utf8'))
  const commands = Object.values(manifest.categories).flat()
  assert.equal(commands.length, 201)
  assert.equal(new Set(commands).size, 201)
  for (const command of removedAdultCommands) assert.equal(commands.includes(command), false)
})

test('incluye todos los datos originales seguros', async () => {
  const riddles = JSON.parse(await readFile(path.join(root, 'database/adivinanzas.json'), 'utf8'))
  assert.equal(riddles.length, 80)

  const catalog = JSON.parse(await readFile(path.join(root, 'database/characters-catalog.seed.json'), 'utf8'))
  assert.equal(Object.keys(catalog.characters || {}).length, 92919)
})
