import type { TypeBeanRecordGeneralSelectorKeys, VonaApplication } from 'vona';
import type { IOnionOptionsMeta } from 'vona-module-a-onion';
import type {
  TSummerCachePreset,
} from 'vona-module-a-summer';
import type { IDatabaseClientDialectRecord } from '../types/database.ts';
import type { TableIdentityType } from '../types/tableIdentity.ts';
import {
  configAll,
  configAllWithIgnoreNull,
  configRedis,
  configRedisWithIgnoreNull,
} from 'vona-module-a-summer';

export type TypeDataBaseConfigDialects = Record<
  keyof IDatabaseClientDialectRecord,
  TypeBeanRecordGeneralSelectorKeys<'databaseDialect'>
>;

export function config(_app: VonaApplication) {
  return {
    entity: {
      idType: 'string' as TableIdentityType,
    },
    model: {
      disableDeleted: false,
      disableInstance: false,
      disableUpdateTime: false,
    },
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
}
