import type { IInstanceRecord, VonaApplication, VonaContext } from 'vona';

export interface IInstanceConfig {
  getInstanceName?: (ctx: VonaContext) => keyof IInstanceRecord | undefined | null;
}

export function config(_app: VonaApplication) {
  return {} as IInstanceConfig;
}
