import { BeanCacheRedisBase, CacheRedis } from 'vona-module-a-cache';

export type TCacheRedisElectionKey = 'leaders';
export type TCacheRedisElectionData = string[];

@CacheRedis()
export class CacheRedisElection extends BeanCacheRedisBase<TCacheRedisElectionKey, TCacheRedisElectionData> {}
