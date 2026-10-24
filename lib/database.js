import { readFile, writeFile, mkdir } from 'node:fs/promises'; import path from 'node:path'
export async function readJson(file, fallback = {}) { try { return JSON.parse(await readFile(file, 'utf8')) } catch (error) { if (error.code === 'ENOENT') return fallback; throw error } }
export async function writeJson(file, data) { await mkdir(path.dirname(file), { recursive: true }); await writeFile(file, JSON.stringify(data, null, 2) + '\n') }
