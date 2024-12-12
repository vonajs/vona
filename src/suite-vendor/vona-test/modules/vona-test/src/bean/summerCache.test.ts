import { ISummerCacheGet, SummerCache, TSummerCacheActionOptions } from 'vona';
import { BeanSummerCacheBase } from 'vona-module-a-summer';

export type TSummerCacheTestKey = { id: number };
export type TSummerCacheTestData = { id: number; name: string };

@SummerCache({
  mode: 'all',
  mem: {
    max: 2,
    ttl: 1 * 1000,
  },
  redis: {
    ttl: 3 * 1000,
  },
})
export class SummerCacheTest
  extends BeanSummerCacheBase<ScopeModule, TSummerCacheTestKey, TSummerCacheTestData>
  implements ISummerCacheGet<TSummerCacheTestKey, TSummerCacheTestData>
{
  async getNative(
    key: TSummerCacheTestKey,
    _options?: TSummerCacheActionOptions<TSummerCacheTestKey, TSummerCacheTestData>,
    _keyHash?: string,
  ): Promise<TSummerCacheTestData | null | undefined> {
    return {
      id: key.id,
      name: `name_${key.id}`,
    };
  }
}
