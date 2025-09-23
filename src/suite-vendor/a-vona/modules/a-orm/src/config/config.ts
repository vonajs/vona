import type { TableIdentityType } from 'table-identity';
import type { TypeBeanRecordGeneralSelectorKeys, VonaApplication } from 'vona';
import type { IOnionOptionsMeta } from 'vona-module-a-onion';
import type { TSummerCachePreset } from 'vona-module-a-summer';
import type { IDatabaseClientDialectRecord } from '../types/database.ts';
import { configAll, configAllWithIgnoreNull, configRedis, configRedisWithIgnoreNull } from 'vona-module-a-summer';

export type TypeDataBaseConfigDialects = Record<
  keyof IDatabaseClientDialectRecord,
  TypeBeanRecordGeneralSelectorKeys<'databaseDialect'>
>;

export function config(_app: VonaApplication) {
  return {
    sharding: {
      cache: {
        doubleDelete: false,
      },
    },
    rest: {
      query: {
        pageSize: {
          default: 20,
          max: 100,
        },
        orders: {
          default: 'createdAt,desc',
        },
      },
    },
    table: {
      identityType: 'string' as TableIdentityType,
    },
    model: {
      disableDeleted: false,
      disableInstance: false,
      disableCreateTime: false,
      disableUpdateTime: false,
    },
    softDeletionPrune: {
      enable: true,
      expired: 14 * 24 * 3600 * 1000,
    },
    dialects: {
      mysql: 'a-ormdialect.databaseDialect.mysql',
      mysql2: 'a-ormdialect.databaseDialect.mysql3',
      pg: 'a-ormdialect.databaseDialect.pg',
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
}
