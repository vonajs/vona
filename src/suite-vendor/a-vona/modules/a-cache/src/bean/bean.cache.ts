import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';
import { IDecoratorCacheMemOptions } from '../types/cacheMem.js';
import { BeanCacheMemBase } from './bean.cacheMemBase.js';

@Bean()
export class BeanCache extends BeanBase {
  mem<KEY, DATA>(cacheName: string, cacheOptions?: IDecoratorCacheMemOptions): BeanCacheMemBase<KEY, DATA> {
    if (cacheName.includes('.cacheMem.')) {
      return this.app.bean._getBeanSelector(cacheName as any, undefined, cacheOptions);
    }
    return this.app.bean._getBeanSelector(BeanCacheMemBase, cacheName, cacheOptions);
  }
}
