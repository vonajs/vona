import type { TableIdentity } from 'table-identity';
import type { EntityPost } from '../entity/post.ts';
import { BeanCacheRedisBase, CacheRedis } from 'vona-module-a-cache';

export type TCacheRedisPostKey = TableIdentity;
export type TCacheRedisPostData = Partial<EntityPost>;

@CacheRedis()
export class CacheRedisPost
  extends BeanCacheRedisBase<TCacheRedisPostKey, TCacheRedisPostData> {}
