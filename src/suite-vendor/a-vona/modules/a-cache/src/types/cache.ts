import type { ServiceDbMeta } from 'vona-module-a-database';

export interface ICacheRedisGetOptions {
  ttl?: number;
  updateAgeOnGet?: boolean;
}

export interface ICacheRedisSetOptions {
  ttl?: number;
  dbMeta?: ServiceDbMeta;
}

export interface ICacheMemGetOptions {
  updateAgeOnGet?: boolean;
}

export interface ICacheMemSetOptions {
  ttl?: number;
  dbMeta?: ServiceDbMeta;
}
