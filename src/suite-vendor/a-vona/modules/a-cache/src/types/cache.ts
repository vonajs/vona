import type { ServiceDb } from 'vona-module-a-database';
import type { TypeBroadcastOnSet } from './cacheMem.ts';

export interface ICacheRedisGetOptions {
  ttl?: number;
  updateAgeOnGet?: boolean;
}

export interface ICacheRedisSetOptions {
  ttl?: number;
  db?: ServiceDb;
}

export interface ICacheMemGetOptions {
  ttl?: number;
  updateAgeOnGet?: boolean;
}

export interface ICacheMemSetOptions {
  ttl?: number;
  db?: ServiceDb;
  broadcastOnSet?: TypeBroadcastOnSet;
}
