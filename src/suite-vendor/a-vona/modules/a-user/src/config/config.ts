import type { VonaApplication } from 'vona';
import type { IServiceRecord } from 'vona-module-a-web';

export const config = (_app: VonaApplication) => {
  return {
    passportAdapter: 'home-user:passportAdapter' as keyof IServiceRecord,
  };
};
