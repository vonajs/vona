import type { IApiPathRecord } from '../types/controller.js';

export function apiPath<K extends keyof IApiPathRecord>(path: IApiPathRecord[K]): IApiPathRecord[K] {
  return path;
}
