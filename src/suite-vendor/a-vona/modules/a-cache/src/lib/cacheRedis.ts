import type { IDecoratorCacheRedisOptions } from '../types/cacheRedis.ts';
import { createBeanDecorator } from 'vona';

export function CacheRedis(options?: IDecoratorCacheRedisOptions): ClassDecorator {
  return createBeanDecorator('cacheRedis', options);
}
