export function renderDashboard(manager) { console.table([...manager.processes].map(([id, child]) => ({ bot: id, pid: child.pid, estado: child.killed ? 'detenido' : 'activo' }))) }
