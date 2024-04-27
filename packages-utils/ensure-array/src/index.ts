export function ensureArray(arr: any, sep: string = ',') {
  if (arr === undefined || arr === null) return [];
  if (Array.isArray(arr)) return arr;
  if (typeof arr === 'string') return arr.split(sep);
  return [arr];
}
