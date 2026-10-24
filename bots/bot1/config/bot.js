const ownerNumber = process.env.BOT1_OWNER_NUMBER || ''
export const botConfig = {
  id: 'bot1', name: process.env.BOT1_NAME || 'Pain Bot', enabled: process.env.BOT1_ENABLED !== 'false',
  adapter: 'pain-bot', prefix: process.env.BOT1_PREFIX || '.', ownerNumber,
  autorestart: true, maxRestarts: 5, restartDelay: 5000
}
// Compatibility globals consumed by Pain Bot.
global.owner = ownerNumber ? [[ownerNumber, process.env.BOT1_OWNER_NAME || 'Owner', true]] : []
global.ownerLid = []
global.sessions = process.env.BOT_SESSION_DIR || 'bots/bot1/session'
global.bot = 'UniversalMultiBot'
global.AFBots = true
global.packname = process.env.BOT1_PACKNAME || 'PAIN BOT MD'
global.namebot = botConfig.name
global.author = process.env.BOT1_AUTHOR || 'Sunkovv / Universal MultiBot'
global.moneda = process.env.BOT1_CURRENCY || 'USD'
global.canal = process.env.BOT1_CHANNEL || ''
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
