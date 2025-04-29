import type { IApiPathRecord } from '../types/controller.ts';
import { combineParamsAndQuery } from '@cabloy/utils';

export function $apiPath<K extends keyof IApiPathRecord>(path: K): K {
  return path;
}

export function $apiPathAndCombineParamsAndQuery<K extends keyof IApiPathRecord>(path: K, options?: { params?: object; query?: object }): string {
  return combineParamsAndQuery(path, options);
}
