import { BeanCacheRedisBase, CacheRedis } from 'vona-module-a-cache';

export type TCacheRedisWorkerAliveKey = string;
export type TCacheRedisWorkerAliveData = boolean;

@CacheRedis()
export class CacheRedisWorkerAlive extends BeanCacheRedisBase<TCacheRedisWorkerAliveKey, TCacheRedisWorkerAliveData> {}
