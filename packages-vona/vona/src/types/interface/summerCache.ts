import { IMiddlewareBaseEnable } from './middleware.js';

export interface ISummerCacheRecord {}

export interface ISummerCacheGet<KEY, DATA> {
  getNative(key: KEY, options: TSummerCacheActionOptions<KEY, DATA>, keyHash: string): Promise<DATA | null | undefined>;
}

export interface ISummerCacheMGet<KEY, DATA> {
  mgetNative(
    keys: KEY,
    options: TSummerCacheActionOptions<KEY, DATA>,
    keysHash: string,
  ): Promise<Array<DATA | null | undefined>>;
}

export type TSummerCacheMode = 'all' | 'mem' | 'redis';

export interface IDecoratorSummerCacheOptions extends IMiddlewareBaseEnable {
  preset?: 'redis' | 'all' | 'redisWithIgnoreNull' | 'allWithIgnoreNull';
  mode?: TSummerCacheMode;
  mem?: {
    max?: number;
    ttl?: number;
  };
  redis?: {
    ttl: number;
  };
  ignoreNull?: boolean;
}

export type TSummerCacheActionOptions<KEY, DATA> = {
  enable?: boolean;
  mode?: TSummerCacheMode;
  ignoreNull?: boolean;
  get?: (key: KEY, options: TSummerCacheActionOptions<KEY, DATA>, keyHash: string) => Promise<DATA | null | undefined>;
  mget?: (
    keys: KEY,
    options: TSummerCacheActionOptions<KEY, DATA>,
    keysHash: string,
  ) => Promise<Array<DATA | null | undefined>>;
};
