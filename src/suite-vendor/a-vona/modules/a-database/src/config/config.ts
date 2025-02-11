import { TypeBeanRecordGeneralSelectorKeys, VonaApplication } from 'vona';
import { IOnionOptionsMeta } from 'vona-module-a-onion';
import {
  configAll,
  configAllWithIgnoreNull,
  configRedis,
  configRedisWithIgnoreNull,
  TSummerCachePreset,
} from 'vona-module-a-summer';
import { IDatabaseDialectRecord } from '../types/database.js';

export type TypeDataBaseConfigDialects = Record<
  keyof IDatabaseDialectRecord,
  TypeBeanRecordGeneralSelectorKeys<'databaseDialect'>
>;

export const config = (_app: VonaApplication) => {
  return {
    dialects: {
      mysql: 'a-databasedialect.databaseDialect.mysql',
      mysql2: 'a-databasedialect.databaseDialect.mysql2',
      pg: 'a-databasedialect.databaseDialect.pg',
    } as unknown as TypeDataBaseConfigDialects,
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
