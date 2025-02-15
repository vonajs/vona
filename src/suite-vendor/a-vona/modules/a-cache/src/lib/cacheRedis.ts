import type { IDecoratorCacheRedisOptions } from '../types/cacheRedis.js';
import { createBeanDecorator } from 'vona';

export function CacheRedis(options?: IDecoratorCacheRedisOptions): ClassDecorator {
  return createBeanDecorator('cacheRedis', options);
}
