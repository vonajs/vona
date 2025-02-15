import type { IUser } from '../types/user.js';
import { BeanCacheRedisBase, CacheRedis } from 'vona-module-a-cache';

export type TCacheRedisUsersDemoKey = any;
export type TCacheRedisUsersDemoData = IUser[];

@CacheRedis()
export class CacheRedisUsersDemo extends BeanCacheRedisBase<TCacheRedisUsersDemoKey, TCacheRedisUsersDemoData> {}
