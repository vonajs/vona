import type { ServiceDbMeta } from 'vona-module-a-database';

export interface ICacheActionOptions {
  ttl?: number;
  dbMeta?: ServiceDbMeta;
}
