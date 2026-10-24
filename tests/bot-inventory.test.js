import test from 'node:test'
import assert from 'node:assert/strict'
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')

test('solo está instalada la instancia real bot1', async () => {
  const bots = (await readdir(path.join(root, 'bots'), { withFileTypes: true }))
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
  assert.deepEqual(bots, ['bot1'])
})

test('la identidad pública es UNIVERSAL BOT', async () => {
  const config = await import('../bots/bot1/config/bot.js')
  const menu = await import('../bots/bot1/config/menu.js')
  assert.equal(config.default.name, 'UNIVERSAL BOT')
  assert.equal(global.namebot, 'UNIVERSAL BOT')
  assert.equal(global.packname, 'UNIVERSAL BOT')
  assert.equal(menu.default.title, 'UNIVERSAL BOT')
  assert.equal(menu.default.footer, 'UNIVERSAL BOT')
})
