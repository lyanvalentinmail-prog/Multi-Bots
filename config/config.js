import path from 'node:path'
import { fileURLToPath } from 'node:url'
const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
export default {
  rootDir,
  botsDir: path.join(rootDir, 'bots'),
  commandsDir: path.join(rootDir, 'commands'),
  databaseDir: path.join(rootDir, 'database'),
  logLevel: process.env.LOG_LEVEL || 'info'
}
