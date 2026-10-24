import test from 'node:test'; import assert from 'node:assert/strict'; import { buildMenu } from '../core/menuHandler.js'
test('construye menú', () => assert.match(buildMenu({title:'Bot',footer:'Fin'}, [{name:'ping'}]), /\.ping/))
