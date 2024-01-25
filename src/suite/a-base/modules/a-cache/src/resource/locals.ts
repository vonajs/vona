export * from '../local/db.js';
export * from '../local/mem.js';
export * from '../local/redis.js';

import { LocalDb } from '../local/db.js';
import { LocalMem } from '../local/mem.js';
import { LocalRedis } from '../local/redis.js';

export interface IModuleLocal {
  db: LocalDb;
  mem: LocalMem;
  redis: LocalRedis;
}
