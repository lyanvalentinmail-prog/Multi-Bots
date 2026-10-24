export function buildMenu(menu, commands = []) { return [`*${menu.title}*`, ...commands.map(c => `${c.prefix || '.'}${c.name} — ${c.description || ''}`), '', menu.footer].join('\n') }
