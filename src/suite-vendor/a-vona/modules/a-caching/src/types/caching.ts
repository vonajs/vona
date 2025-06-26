import type { ISummerCacheRecord, TSummerCacheActionOptions } from 'vona-module-a-summer';

export type TypeCachingActionOptions = { cacheName: keyof ISummerCacheRecord } & Pick<TSummerCacheActionOptions<unknown, unknown>, 'mode' | 'ignoreNull' | 'ttl' | 'updateAgeOnGet' | 'broadcastOnSet'>;
