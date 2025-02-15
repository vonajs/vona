import type { OmitNever } from 'vona';
import type { IOnionOptionsEnable, ServiceOnion } from 'vona-module-a-onion';
import type { IRedisClientRecord } from 'vona-module-a-redis';

export interface ISummerCacheRecord {}

export interface ISummerCacheGet<KEY, DATA> {
  getNative: (key?: KEY, options?: TSummerCacheActionOptions<KEY, DATA>) => Promise<DATA | null | undefined>;
}

export interface ISummerCacheMGet<KEY, DATA> {
  mgetNative: (keys: KEY[], options?: TSummerCacheActionOptions<KEY, DATA>) => Promise<Array<DATA | null | undefined>>;
}

export type TSummerCachePreset = 'redis' | 'all' | 'redisWithIgnoreNull' | 'allWithIgnoreNull';
export type TSummerCacheMode = 'all' | 'mem' | 'redis';

export interface IDecoratorSummerCacheOptions extends IOnionOptionsEnable {
  preset?: TSummerCachePreset;
  mode?: TSummerCacheMode;
  mem?: {
    max?: number;
    ttl?: number;
  };
  redis?: {
    ttl: number;
    client?: keyof IRedisClientRecord;
  };
  ignoreNull?: boolean;
}

export interface TSummerCacheActionOptions<KEY, DATA> {
  enable?: boolean;
  mode?: TSummerCacheMode;
  ignoreNull?: boolean;
  get?: (key?: KEY, options?: TSummerCacheActionOptions<KEY, DATA>) => Promise<DATA | null | undefined>;
  mget?: (keys: KEY[], options?: TSummerCacheActionOptions<KEY, DATA>) => Promise<Array<DATA | null | undefined>>;
}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    summerCache: ServiceOnion<IDecoratorSummerCacheOptions, keyof ISummerCacheRecord>;
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
