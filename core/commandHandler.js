import { readdir } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

/** Load both Universal MultiBot commands and legacy Pain handlers recursively. */
export async function loadCommands(dir, { cacheBust = false } = {}) {
  const commands = new Map()
  async function walk(folder) {
    for (const item of await readdir(folder, { withFileTypes: true })) {
      if (item.name.startsWith('.')) continue
      const file = path.join(folder, item.name)
      if (item.isDirectory()) await walk(file)
      else if (item.name.endsWith('.js')) {
        const url = `${pathToFileURL(file).href}${cacheBust ? `?update=${Date.now()}` : ''}`
        const mod = await import(url)
        const value = mod.command || mod.default
        if (!value) continue
        const names = value.name ? [value.name] : Array.isArray(value.command) ? value.command : [value.command].filter(Boolean)
        for (const name of names) if (typeof name === 'string') commands.set(name.toLowerCase(), value)
      }
    }
  }
  await walk(dir)
  return commands
}

export async function runCommand(commands, name, context) {
  const command = commands.get(name.toLowerCase())
  if (!command) return false
  if (typeof command.execute === 'function') return command.execute(context)
  if (typeof command === 'function') return command.call(context.conn, context.message, context)
  return false
}
