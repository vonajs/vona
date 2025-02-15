import { createBeanDecorator } from 'vona';
import type { IDecoratorCacheRedisOptions } from '../types/cacheRedis.js';

export function CacheRedis(options?: IDecoratorCacheRedisOptions): ClassDecorator {
  return createBeanDecorator('cacheRedis', options);
}
