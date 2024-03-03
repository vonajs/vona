export function isRaw(raw) {
  return typeof raw?.constructor === 'function' && raw?.constructor?.name === 'Raw';
}
