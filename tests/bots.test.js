import test from 'node:test'; import assert from 'node:assert/strict'; import MultiBotManager from '../core/multiBotManager.js'
test('carga la configuración de universal-bot', async () => { const config = await new MultiBotManager().getConfig('universal-bot'); assert.equal(config.adapter, 'pain-bot') })
