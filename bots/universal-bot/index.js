import { access, copyFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import './config/bot.js'

const botDir = path.dirname(fileURLToPath(import.meta.url))
const sessionDir = process.env.BOT_SESSION_DIR || path.join(botDir, 'session')
const databaseFile = process.env.BOT_DATABASE_FILE || path.join(botDir, 'database', 'database.json')
const defaultsFile = path.join(botDir, 'database', 'defaults.json')
const catalogFile = process.env.BOT_CHARACTER_CATALOG_FILE || path.join(botDir, 'database', 'characters-catalog.json')
const catalogSeed = path.resolve(botDir, '../../database/characters-catalog.seed.json')
process.env.BOT_CHARACTER_CATALOG_FILE = catalogFile
await mkdir(sessionDir, { recursive: true })
await mkdir(path.dirname(databaseFile), { recursive: true })
try {
  await access(catalogFile)
} catch {
  await copyFile(catalogSeed, catalogFile)
}
try {
  await access(databaseFile)
} catch {
  await copyFile(defaultsFile, databaseFile)
}

await import('../../plugins/whatsapp/pain-bot/main.js')
