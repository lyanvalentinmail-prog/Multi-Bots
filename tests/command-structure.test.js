import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile, readdir, access } from 'node:fs/promises'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')

test('los comandos seguros están clasificados y su manifiesto coincide', async () => {
  const manifest = JSON.parse(await readFile(path.join(root, 'commands/manifest.json'), 'utf8'))
  const listed = Object.entries(manifest.categories).flatMap(([category, files]) => files.map(file => `${category}/${file}`))
  const actual = []
  for (const category of await readdir(path.join(root, 'commands'), { withFileTypes: true })) {
    if (!category.isDirectory()) continue
    for (const file of await readdir(path.join(root, 'commands', category.name))) if (file.endsWith('.js')) actual.push(`${category.name}/${file}`)
  }
  assert.equal(manifest.total, 201)
  assert.equal(new Set(listed).size, 201)
  assert.deepEqual(actual.sort(), listed.sort())
})

test('no queda un directorio legacy de plugins de comandos', async () => {
  await assert.rejects(access(path.join(root, 'plugins/whatsapp/pain-bot/plugins')))
})
