import type { TSummerCacheActionOptions } from '../types/summerCache.ts';

export interface ICacheLayeredBase<KEY, DATA> {
  get: (key?: KEY, options?: TSummerCacheActionOptions<KEY, DATA>) => Promise<DATA | null | undefined>;
  mget: (keys: KEY[], options?: TSummerCacheActionOptions<KEY, DATA>) => Promise<Array<DATA | null | undefined>>;
  del: (key?: KEY, options?: TSummerCacheActionOptions<KEY, DATA>) => Promise<void>;
  mdel: (keys: KEY[], options?: TSummerCacheActionOptions<KEY, DATA>) => Promise<void>;
  clear: (options?: TSummerCacheActionOptions<KEY, DATA>) => Promise<void>;
  peek: (key?: KEY, options?: TSummerCacheActionOptions<KEY, DATA>) => Promise<DATA | null | undefined>;
}
