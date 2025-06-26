import type { BeanBase } from 'vona';
import type { ISummerCacheRecord, TSummerCacheActionOptions } from 'vona-module-a-summer';

export type TypeCachingActionOptions =
  Pick<TSummerCacheActionOptions<unknown, unknown>, 'mode' | 'ignoreNull' | 'ttl' | 'updateAgeOnGet' | 'broadcastOnSet'>
  & {
    cacheName: keyof ISummerCacheRecord;
    cacheKey: any;
    cacheKeyFn: ((options: TypeCachingActionOptions, args: [], receiver: BeanBase, prop: string) => any) | string;
  };
