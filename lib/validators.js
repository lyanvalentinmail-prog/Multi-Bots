export const isBotId = value => /^bot[1-9]\d*$/.test(value); export const required = (value, name) => { if (value == null || value === '') throw new Error(`${name} es obligatorio`); return value }
