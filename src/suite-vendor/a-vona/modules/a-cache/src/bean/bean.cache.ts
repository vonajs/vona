import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';
import { IDecoratorCacheMemOptions } from '../types/cacheMem.js';
import { BeanCacheMemBase } from './bean.cacheMemBase.js';
import { IDecoratorCacheRedisOptions } from '../types/cacheRedis.js';
import { BeanCacheRedisBase } from './bean.cacheMemRedis.js';

@Bean()
export class BeanCache extends BeanBase {
  mem<KEY, DATA>(cacheName: string, cacheOptions?: IDecoratorCacheMemOptions): BeanCacheMemBase<KEY, DATA> {
    if (cacheName.includes('.cacheMem.')) {
      return this.app.bean._getBeanSelector(cacheName as any, undefined, cacheOptions);
    }
    return this.app.bean._getBeanSelector(BeanCacheMemBase, cacheName, cacheOptions);
  }

  redis<KEY, DATA>(cacheName: string, cacheOptions?: IDecoratorCacheRedisOptions): BeanCacheRedisBase<KEY, DATA> {
    if (cacheName.includes('.cacheRedis.')) {
      return this.app.bean._getBeanSelector(cacheName as any, undefined, cacheOptions);
    }
    return this.app.bean._getBeanSelector(BeanCacheRedisBase, cacheName, cacheOptions);
  }
}
