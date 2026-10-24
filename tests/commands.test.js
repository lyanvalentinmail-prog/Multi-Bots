import test from 'node:test'; import assert from 'node:assert/strict'; import { parseMessage } from '../core/messageHandler.js'
test('analiza comandos con prefijo', () => assert.deepEqual(parseMessage('.ping uno dos', ['.']), { prefix: '.', name: 'ping', args: ['uno','dos'] }))
