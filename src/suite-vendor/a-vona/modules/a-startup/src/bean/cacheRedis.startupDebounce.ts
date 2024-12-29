import { BeanCacheRedisBase, CacheRedis } from 'vona-module-a-cache';

export type TCacheRedisStartupDebounceKey = `startupDebounce:${string}`;
export type TCacheRedisStartupDebounceData = boolean;

@CacheRedis()
export class CacheRedisStartupDebounce extends BeanCacheRedisBase<
  TCacheRedisStartupDebounceKey,
  TCacheRedisStartupDebounceData
> {}
