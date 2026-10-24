import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, rm } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { createApplication, createDatabase } from '../scripts/server/serve-web.js'

test('el panel publica salud, catálogo y los 201 comandos de UNIVERSAL BOT', async (t) => {
  const dataDir = await mkdtemp(path.join(os.tmpdir(), 'universal-panel-'))
  const app = await createApplication({ database: createDatabase({ dataDir }) })
  const address = await app.listen(0, '127.0.0.1')
  const base = `http://127.0.0.1:${address.port}`
  t.after(async () => { await app.close(); await rm(dataDir, { recursive: true, force: true }) })

  const health = await (await fetch(`${base}/api/health`)).json()
  assert.equal(health.database, 'json')

  const catalog = await (await fetch(`${base}/api/bots`)).json()
  const bot = catalog.bots.find((item) => item.id === 'universal-bot')
  assert.equal(bot.name, 'UNIVERSAL BOT')
  assert.equal(bot.webRuntime, true)
  assert.equal(bot.adultContent, false)
  assert.equal(bot.pluginCount, 201)

  const plugins = await (await fetch(`${base}/api/plugins?botId=universal-bot`)).json()
  assert.equal(plugins.plugins.length, 201)
  assert.ok(plugins.plugins.some((plugin) => plugin.id === 'main-menu2'))

  const page = await fetch(`${base}/bots/universal-bot`)
  assert.equal(page.status, 200)
  assert.match(await page.text(), /MultiBot/)
})
