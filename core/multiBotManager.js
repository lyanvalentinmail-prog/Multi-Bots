import { fork } from 'node:child_process'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import appConfig from '../config/config.js'
import logger from '../lib/logger.js'

export class MultiBotManager {
  constructor() { this.processes = new Map(); this.restarts = new Map(); this.stopping = false }
  async getConfig(id) {
    const file = path.join(appConfig.botsDir, id, 'config', 'bot.js')
    if (!existsSync(file)) throw new Error(`Bot desconocido: ${id}`)
    return (await import(`${pathToFileURL(file)}?t=${Date.now()}`)).default
  }
  async start(id, { force = false } = {}) {
    if (this.processes.has(id)) return this.processes.get(id)
    const config = await this.getConfig(id)
    if (!config.enabled && !force) { logger.warn(`${id} está deshabilitado`); return null }
    const entry = path.join(appConfig.botsDir, id, 'index.js')
    const child = fork(entry, [], { cwd: appConfig.rootDir, env: { ...process.env, BOT_ID: id, BOT_SESSION_DIR: path.join(appConfig.botsDir, id, 'session'), BOT_DATABASE_FILE: path.join(appConfig.botsDir, id, 'database', 'database.json') }, stdio: 'inherit' })
    this.processes.set(id, child); logger.info(`${id} iniciado (PID ${child.pid})`)
    child.once('exit', (code, signal) => { this.processes.delete(id); logger.warn(`${id} terminó (${signal || code})`); if (!this.stopping && config.autorestart && code !== 0) this.restartAfterFailure(id, config) })
    return child
  }
  restartAfterFailure(id, config) { const count = (this.restarts.get(id) || 0) + 1; this.restarts.set(id, count); if (count <= config.maxRestarts) setTimeout(() => this.start(id), config.restartDelay) }
  async startAll() { for (const id of ['bot1', 'bot2', 'bot3']) await this.start(id) }
  stop(id) { const child = this.processes.get(id); if (child) child.kill('SIGTERM') }
  stopAll() { this.stopping = true; for (const id of this.processes.keys()) this.stop(id) }
}
export default MultiBotManager
