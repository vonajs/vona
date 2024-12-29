import { BeanCacheRedisBase, CacheRedis } from 'vona-module-a-cache';

export type TCacheRedisStartupDebounceKey = any;
export type TCacheRedisStartupDebounceData = any;

@CacheRedis()
export class CacheRedisStartupDebounce extends BeanCacheRedisBase<
  TCacheRedisStartupDebounceKey,
  TCacheRedisStartupDebounceData
> {}
