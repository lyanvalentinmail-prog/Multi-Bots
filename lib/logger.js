const write = (level, message, extra) => console[level === 'error' ? 'error' : 'log'](`[${new Date().toISOString()}] ${level.toUpperCase()} ${message}`, extra ?? '')
export default { info: (m,e) => write('info',m,e), warn: (m,e) => write('warn',m,e), error: (m,e) => write('error',m,e), debug: (m,e) => process.env.LOG_LEVEL === 'debug' && write('debug',m,e) }
