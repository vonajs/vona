import { IMiddlewareOptionsMeta, TSummerCachePreset, VonaApplication } from 'vona';
import { configAll, configAllWithIgnoreNull, configRedis, configRedisWithIgnoreNull } from 'vona-module-a-summer';

export const config = (_app: VonaApplication) => {
  return {
    summer: {
      enable: true,
      meta: {} as IMiddlewareOptionsMeta,
      presetDefault: 'redis' as TSummerCachePreset,
      preset: {
        redis: configRedis,
        redisWithIgnoreNull: configRedisWithIgnoreNull,
        all: configAll,
        allWithIgnoreNull: configAllWithIgnoreNull,
      },
    },
  };
};
