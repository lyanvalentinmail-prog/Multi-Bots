export async function createConnection(options = {}) { const baileys = await import('@whiskeysockets/baileys'); return baileys.default(options) }
