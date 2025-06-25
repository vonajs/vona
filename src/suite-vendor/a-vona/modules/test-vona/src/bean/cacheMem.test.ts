import { BeanCacheMemBase, CacheMem } from 'vona-module-a-cache';

export type TCacheMemTestKey = never;
export type TCacheMemTestData = string;

@CacheMem({ ttl: 1 * 1000 })
export class CacheMemTest extends BeanCacheMemBase<TCacheMemTestKey, TCacheMemTestData> {}
