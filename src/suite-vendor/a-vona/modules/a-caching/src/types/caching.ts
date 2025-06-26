import type { BeanBase } from 'vona';
import type { ISummerCacheRecord, TSummerCacheActionOptions } from 'vona-module-a-summer';

export type TypeCachingActionOptions =
  Pick<TSummerCacheActionOptions<unknown, unknown>, 'mode' | 'ignoreNull' | 'ttl' | 'updateAgeOnGet' | 'broadcastOnSet'>
  & {
    cacheName: keyof ISummerCacheRecord;
    cacheKey?: any;
    cacheKeyFn?: ((args: [], prop: string, receiver: BeanBase, options: TypeCachingActionOptions) => any) | string;
    cacheProp?: string;
  };
