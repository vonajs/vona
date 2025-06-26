import type { TSummerCacheTestData } from '../bean/summerCache.test.ts';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-bean';

@Service()
export class ServiceCaching extends BeanBase {
  async get(id: number): Promise<TSummerCacheTestData> {
    return {
      id,
      name: `name_${id}`,
    };
  }
}
