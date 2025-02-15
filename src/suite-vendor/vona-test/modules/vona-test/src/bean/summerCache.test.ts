import {
  BeanSummerCacheBase,
  type ISummerCacheGet,
  SummerCache,
  type TSummerCacheActionOptions,
} from 'vona-module-a-summer';

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
  extends BeanSummerCacheBase<TSummerCacheTestKey, TSummerCacheTestData>
  implements ISummerCacheGet<TSummerCacheTestKey, TSummerCacheTestData> {
  async getNative(
    key: TSummerCacheTestKey,
    _options?: TSummerCacheActionOptions<TSummerCacheTestKey, TSummerCacheTestData>,
  ): Promise<TSummerCacheTestData | null | undefined> {
    return {
      id: key.id,
      name: `name_${key.id}`,
    };
  }
}
