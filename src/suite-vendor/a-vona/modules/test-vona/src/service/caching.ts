import type { TypeCachingActionOptions } from 'vona-module-a-caching';
import type { TSummerCacheTestData } from '../bean/summerCache.test.ts';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-bean';
import { Caching } from 'vona-module-a-caching';

@Service()
export class ServiceCaching extends BeanBase {
  cacheKey(args: any[], prop: string, options: TypeCachingActionOptions, _receiver: BeanBase) {
    return `${this.$beanFullName}_${options.cacheProp ?? prop}_${args[0]}`;
  }

  @Caching.get({ cacheName: 'test-vona:test', cacheKeyFn: 'cacheKey' })
  async get(id: number): Promise<TSummerCacheTestData> {
    return {
      id,
      name: `name_${id}`,
    };
  }
}
