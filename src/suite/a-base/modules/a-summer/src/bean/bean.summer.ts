import { Bean, BeanModuleScopeBase, IDecoratorSummerCacheOptions } from 'vona';
import { ScopeModule } from '../.metadata/this.js';
import { BeanSummerCacheBase } from './bean.summerCacheBase_.js';

@Bean()
export class BeanSummer extends BeanModuleScopeBase<ScopeModule> {
  cache(cacheName: string, cacheOptions?: IDecoratorSummerCacheOptions): BeanSummerCacheBase {
    if (cacheName.includes('.summerCache.')) {
      return this.app.bean._getBeanSelector(cacheName as any, undefined, cacheOptions);
    }
    return this.app.bean._getBeanSelector(BeanSummerCacheBase, cacheName, cacheOptions);
  }
}
