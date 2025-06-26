import type { TSummerCacheTestData } from '../bean/summerCache.test.ts';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-bean';
import { Caching } from 'vona-module-a-caching';

@Service()
export class ServiceCaching extends BeanBase {
  @Caching.get({ cacheName: 'test-vona:test', cacheKeyFn: 'cacheKey' })
  async get(id: number): Promise<TSummerCacheTestData> {
    return {
      id,
      name: `name_${id}`,
    };
  }
}
