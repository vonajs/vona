import { BeanCacheRedisBase, CacheRedis } from 'vona-module-a-cache';

export type TCacheRedisElectionKey = 'leaders';
export type TCacheRedisElectionData = string[];

@CacheRedis({ disableInstance: true, disableTransactionCompensate: true })
export class CacheRedisElection extends BeanCacheRedisBase<TCacheRedisElectionKey, TCacheRedisElectionData> {}
