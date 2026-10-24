import test from 'node:test'; import assert from 'node:assert/strict'; import MultiBotManager from '../core/multiBotManager.js'
test('carga la configuración de bot1', async () => { const config = await new MultiBotManager().getConfig('bot1'); assert.equal(config.adapter, 'pain-bot') })
