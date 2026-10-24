import MultiBotManager from '../core/multiBotManager.js'; const manager = new MultiBotManager(); await manager.start(process.argv[2] || 'universal-bot', { force: true })
