import type { IApiPathRecord } from '../types/controller.ts';
import { combineParamsAndQuery } from '@cabloy/utils';

export function $apiPath<K extends keyof IApiPathRecord>(path: K, options?: { params?: object; query?: object }): K {
  return combineParamsAndQuery(path, options) as unknown as K;
}
