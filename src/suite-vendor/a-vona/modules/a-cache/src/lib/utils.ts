import { hashkey } from '@cabloy/utils';

export function getKeyHash(key: any): string {
  if (key === undefined || key === null || key === false) {
    throw new Error('key is required');
  }
  return hashkey(key);
}

export function getKeysHash(keys: any[]): string[] {
  return keys.map(key => getKeyHash(key));
}
