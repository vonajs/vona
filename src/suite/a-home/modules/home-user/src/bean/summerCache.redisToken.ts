import type { ISummerCacheGet, TSummerCacheActionOptions } from 'vona-module-a-summer';
import { BeanSummerCacheBase, SummerCache } from 'vona-module-a-summer';

export type TSummerCacheRedisTokenKey = any;
export type TSummerCacheRedisTokenData = any;

@SummerCache()
export class SummerCacheRedisToken
  extends BeanSummerCacheBase<TSummerCacheRedisTokenKey, TSummerCacheRedisTokenData>
  implements ISummerCacheGet<TSummerCacheRedisTokenKey, TSummerCacheRedisTokenData> {
  async getNative(
    _key?: TSummerCacheRedisTokenKey,
    _options?: TSummerCacheActionOptions<TSummerCacheRedisTokenKey, TSummerCacheRedisTokenData>,
  ): Promise<TSummerCacheRedisTokenData | null | undefined> {}
}
