import type { IResourceRecord } from '../types/resource.ts';

export function $resourceName<K extends keyof IResourceRecord>(name: K): K {
  return name;
}
