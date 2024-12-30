import objectHash from 'object-hash';

export function getKeyHash(key: any): string {
  if (key === undefined || key === null) {
    throw new Error('key is required');
  }
  if (Array.isArray(key) || typeof key === 'object') {
    return objectHash(key, { respectType: false });
  }
  if (typeof key !== 'string') {
    return String(key);
  }
  return key;
}

export function getKeysHash(keys: any[]): string[] {
  return keys.map(key => getKeyHash(key));
}
