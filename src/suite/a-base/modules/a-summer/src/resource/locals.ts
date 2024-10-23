export * from '../local/cacheBase.js';
export * from '../local/cache.js';
export * from '../local/fetch.js';
export * from '../local/mem.js';
export * from '../local/redis.js';

import { LocalCache } from '../local/cache.js';
import { LocalFetch } from '../local/fetch.js';
import { LocalMem } from '../local/mem.js';
import { LocalRedis } from '../local/redis.js';

export interface IModuleService {
  cache: LocalCache;
  fetch: LocalFetch;
  mem: LocalMem;
  redis: LocalRedis;
}
