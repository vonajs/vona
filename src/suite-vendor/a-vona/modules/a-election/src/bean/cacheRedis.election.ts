import { BeanCacheRedisBase, CacheRedis } from 'vona-module-a-cache';

export type TCacheRedisElectionKey = string;
export type TCacheRedisElectionData = boolean;

@CacheRedis({ disableInstance: true, disableTransactionCompensate: true })
export class CacheRedisElection extends BeanCacheRedisBase<TCacheRedisElectionKey, TCacheRedisElectionData> {}
