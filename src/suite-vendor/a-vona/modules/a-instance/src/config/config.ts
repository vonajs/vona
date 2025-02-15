import type { VonaApplication, VonaContext } from 'vona';

export interface IInstanceConfig {
  getInstanceName?: (ctx: VonaContext) => string | undefined | null;
}

export const config = (_app: VonaApplication) => {
  return {} as IInstanceConfig;
};
