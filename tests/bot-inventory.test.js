import test from 'node:test'
import assert from 'node:assert/strict'
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')

test('solo está instalada la instancia real universal-bot', async () => {
  const bots = (await readdir(path.join(root, 'bots'), { withFileTypes: true }))
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
  assert.deepEqual(bots, ['universal-bot'])
})

test('la identidad pública es UNIVERSAL BOT', async () => {
  const config = await import('../bots/universal-bot/config/bot.js')
  const menu = await import('../bots/universal-bot/config/menu.js')
  assert.equal(config.default.name, 'UNIVERSAL BOT')
  assert.equal(global.namebot, 'UNIVERSAL BOT')
  assert.equal(global.packname, 'UNIVERSAL BOT')
  assert.equal(menu.default.title, 'UNIVERSAL BOT')
  assert.equal(menu.default.footer, 'UNIVERSAL BOT')
})

test('incluye el esquema completo de base de datos', async () => {
  const defaults = JSON.parse(await readFile(path.join(root, 'bots/universal-bot/database/defaults.json'), 'utf8'))
  for (const key of ['users', 'chats', 'stats', 'settings', 'botGroups', 'bienvenidas', 'modoIA', 'modoCustom', 'stickerBan']) {
    assert.deepEqual(defaults[key], {}, `falta la colección ${key}`)
  }
})

test('el menú no promociona hosting ni canales de WhatsApp', async () => {
  const source = await readFile(path.join(root, 'plugins/whatsapp/pain-bot/lib/menu-categories.js'), 'utf8')
  assert.doesNotMatch(source, /nexcodea\.com/i)
  assert.doesNotMatch(source, /whatsapp\.com\/channel/i)
  assert.doesNotMatch(source, /hosting oficial/i)
})
