import type { BeanBase } from 'vona';
import type { ISummerCacheRecord, TSummerCacheActionOptions } from 'vona-module-a-summer';

export type TypeCacheKeyFn = (args: [], prop: string, options: TypeCachingActionOptions, receiver: BeanBase) => any;
export type TypeCacheValueFn = (value: any, args: [], prop: string, options: TypeCachingActionOptions, receiver: BeanBase) => any;

export type TypeCachingActionOptions =
  Pick<TSummerCacheActionOptions<unknown, unknown>, 'mode' | 'ignoreNull' | 'ttl' | 'updateAgeOnGet' | 'broadcastOnSet'>
  & {
    cacheName: keyof ISummerCacheRecord;
    cacheKey?: any;
    cacheKeyFn?: TypeCacheKeyFn | string;
    cacheProp?: string;
  };

export type TypeCachingActionClearOptions = Omit<TypeCachingActionOptions, 'cacheKey' | 'cacheKeyFn' | 'cacheProp'>;
