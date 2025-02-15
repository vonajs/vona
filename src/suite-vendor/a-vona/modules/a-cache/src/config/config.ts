import type { VonaApplication } from 'vona';
import type { IRedisClientRecord } from 'vona-module-a-redis';

export const config = (_app: VonaApplication) => {
  return {
    redis: {
      client: 'cache' as keyof IRedisClientRecord,
    },
  };
};
