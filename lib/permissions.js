export function isOwner(jid, owners = []) { const phone = String(jid || '').split('@')[0]; return owners.some(owner => (Array.isArray(owner) ? owner[0] : owner) === phone) }
