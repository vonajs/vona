import type { OmitNever } from 'vona';
import type { TypeBroadcastOnSet } from 'vona-module-a-cache';
import type { IOnionOptionsEnable, ServiceOnion } from 'vona-module-a-onion';
import type { ServiceDb } from 'vona-module-a-orm';
import type { IRedisClientRecord } from 'vona-module-a-redis';

export interface ISummerCacheRecord {}

export interface ISummerCacheGet<KEY, DATA> {
  getNative(key?: KEY, options?: TSummerCacheActionOptions<KEY, DATA>): Promise<DATA | null | undefined>;
  getNative(key: KEY, options?: TSummerCacheActionOptions<KEY, DATA>): Promise<DATA | null | undefined>;
}

export interface ISummerCacheMGet<KEY, DATA> {
  mgetNative(keys: KEY[], options?: TSummerCacheActionOptions<KEY, DATA>): Promise<Array<DATA | null | undefined>>;
}

// export type TSummerCachePreset = 'mem' | 'redis' | 'all' | 'memWithIgnoreNull' | 'redisWithIgnoreNull' | 'allWithIgnoreNull';
export type TSummerCachePreset = 'mem' | 'redis' | 'all';
export type TSummerCacheMode = 'all' | 'mem' | 'redis';

export interface IDecoratorSummerCacheOptions extends IOnionOptionsEnable {
  preset?: TSummerCachePreset;
  mode?: TSummerCacheMode;
  mem?: {
    max?: number;
    ttl?: number;
    updateAgeOnGet?: boolean;
    updateAgeOnHas?: boolean;
    broadcastOnSet?: TypeBroadcastOnSet;
    disableInstance?: boolean;
  };
  redis?: {
    ttl?: number;
    updateAgeOnGet?: boolean;
    client?: keyof IRedisClientRecord;
    disableInstance?: boolean;
  };
  ignoreNull?: boolean;
  emptyArrayAsNull?: boolean;
}

export interface TSummerCacheActionOptions<KEY, DATA> {
  enable?: boolean;
  mode?: TSummerCacheMode;
  ignoreNull?: boolean;
  emptyArrayAsNull?: boolean;
  db?: ServiceDb;
  ttl?: number;
  updateAgeOnGet?: boolean;
  broadcastOnSet?: TypeBroadcastOnSet;
  get?: (key?: KEY, options?: TSummerCacheActionOptions<KEY, DATA>) => Promise<DATA | null | undefined>;
  mget?: (keys: KEY[], options?: TSummerCacheActionOptions<KEY, DATA>) => Promise<Array<DATA | null | undefined>>;
}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    summerCache: ServiceOnion<ISummerCacheRecord>;
  }
}

declare module 'vona' {
  export interface ConfigOnions {
    summerCache: OmitNever<ISummerCacheRecord>;
  }

  export interface IBeanSceneRecord {
    summerCache: never;
  }
}
