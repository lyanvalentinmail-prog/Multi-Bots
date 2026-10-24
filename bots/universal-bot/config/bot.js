const env = (name, fallback = '') => process.env[`BOT_UNIVERSAL_BOT_${name}`] ?? process.env[`UNIVERSAL_BOT_${name}`] ?? fallback
const ownerNumber = env('OWNER_NUMBER')
export const botConfig = {
  id: 'universal-bot', name: 'UNIVERSAL BOT', enabled: env('ENABLED', 'true') !== 'false',
  adapter: 'pain-bot', prefix: env('PREFIX', '.'), ownerNumber,
  autorestart: true, maxRestarts: 5, restartDelay: 5000
}
// Compatibility globals consumed by UNIVERSAL BOT.
global.owner = ownerNumber ? [[ownerNumber, env('OWNER_NAME', 'Owner'), true]] : []
global.ownerLid = []
global.sessions = process.env.BOT_SESSION_DIR || 'bots/universal-bot/session'
global.bot = 'UniversalMultiBot'
global.AFBots = true
global.packname = 'UNIVERSAL BOT'
global.namebot = botConfig.name
global.author = env('AUTHOR', 'Sunkovv / Universal MultiBot')
global.moneda = env('CURRENCY', 'USD')
global.canal = env('CHANNEL')
global.ch = { ch1: '' }
global.logssubbots = ''
global.baileysInteractive = true
global.mods = []
global.prems = []
global.multiplier = 69
global.maxwarn = '2'
global.APIs = {
  vreden: 'https://api.vreden.web.id', delirius: 'https://api.delirius.online',
  zenzxz: 'https://api.zenzxz.my.id', siputzx: 'https://api.siputzx.my.id'
}
global.APIKeys = {}
export default botConfig
