import type { BeanBase } from 'vona';
import type { ISummerCacheRecord, TSummerCacheActionOptions } from 'vona-module-a-summer';

export type TypeCachingActionOptions =
  Pick<TSummerCacheActionOptions<unknown, unknown>, 'mode' | 'ignoreNull' | 'ttl' | 'updateAgeOnGet' | 'broadcastOnSet'>
  & {
    cacheName: keyof ISummerCacheRecord;
    cacheKey?: any;
    cacheKeyFn?: ((args: [], prop: string, options: TypeCachingActionOptions, receiver: BeanBase) => any) | string;
    cacheProp?: string;
  };
