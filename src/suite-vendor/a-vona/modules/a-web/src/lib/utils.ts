import type { IApiPathRecord } from '../types/controller.ts';

export function $apiPath<K extends keyof IApiPathRecord>(path: IApiPathRecord[K]): IApiPathRecord[K] {
  return path.replace(/:(\{[^/]+\})/g, '$1') as unknown as IApiPathRecord[K];
}
