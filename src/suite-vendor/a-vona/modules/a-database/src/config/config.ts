import { VonaApplication } from 'vona';
import { IOnionOptionsMeta } from 'vona-module-a-onion';
import {
  configAll,
  configAllWithIgnoreNull,
  configRedis,
  configRedisWithIgnoreNull,
  TSummerCachePreset,
} from 'vona-module-a-summer';
import { IBeanRecordGeneralDatabaseDialect } from '../types/index.js';

export type TypeDataBaseConfigDialects = Record<string, keyof IBeanRecordGeneralDatabaseDialect>;

export const config = (_app: VonaApplication) => {
  return {
    dialects: {
      mysql: 'a-databasedialect.databaseDialect.mysql',
      mysql2: 'a-databasedialect.databaseDialect.mysql2',
      pg: 'a-databasedialect.databaseDialect.pg',
    } as TypeDataBaseConfigDialects,
    summer: {
      enable: true,
      meta: {} as IOnionOptionsMeta,
      presetDefault: 'redis' as TSummerCachePreset,
      preset: {
        redis: configRedis,
        redisWithIgnoreNull: configRedisWithIgnoreNull,
        all: configAll,
        allWithIgnoreNull: configAllWithIgnoreNull,
      },
      redis: {
        client: 'model',
      },
    },
  };
};
