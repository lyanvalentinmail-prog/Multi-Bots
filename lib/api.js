export async function requestJson(url, options) { const response = await fetch(url, options); if (!response.ok) throw new Error(`HTTP ${response.status}: ${url}`); return response.json() }
