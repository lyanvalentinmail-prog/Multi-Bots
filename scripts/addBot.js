import { mkdir, writeFile, access } from 'node:fs/promises'
import path from 'node:path'
import { isBotId } from '../lib/validators.js'

const id = process.argv[2]
if (!isBotId(id)) throw new Error('Indica un id como bot2')
const target = path.resolve('bots', id)
await access(target).then(() => { throw new Error(`${id} ya existe`) }).catch(error => { if (error.code !== 'ENOENT') throw error })
for (const folder of ['session', 'config', 'database']) await mkdir(path.join(target, folder), { recursive: true })
await writeFile(path.join(target, 'config/bot.js'), `export default { id: '${id}', name: '${id}', enabled: false, adapter: null, autorestart: true, maxRestarts: 5, restartDelay: 3000 }\n`)
await writeFile(path.join(target, 'config/menu.js'), `export default { title: '${id}', footer: '${id}', categories: ['general'] }\n`)
await writeFile(path.join(target, 'handler.js'), `export async function handler() { return false }\n`)
await writeFile(path.join(target, 'index.js'), `import config from './config/bot.js'\nconsole.log(\`[\${config.id}] configura un adaptador antes de habilitar este bot.\`)\n`)
for (const folder of ['session', 'database']) await writeFile(path.join(target, folder, '.gitkeep'), '')
console.log(`${id} creado y deshabilitado; configura un adaptador antes de iniciarlo.`)
