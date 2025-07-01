import type { ISummerCacheGet, TSummerCacheActionOptions } from 'vona-module-a-summer';
import { BeanSummerCacheBase, SummerCache } from 'vona-module-a-summer';

export type TSummerCacheRapidocKey = any;
export type TSummerCacheRapidocData = any;

@SummerCache({ mode: 'mem' })
export class SummerCacheRapidoc
  extends BeanSummerCacheBase<TSummerCacheRapidocKey, TSummerCacheRapidocData>
  implements ISummerCacheGet<TSummerCacheRapidocKey, TSummerCacheRapidocData> {
  async getNative(
    _key?: TSummerCacheRapidocKey,
    _options?: TSummerCacheActionOptions<TSummerCacheRapidocKey, TSummerCacheRapidocData>,
  ): Promise<TSummerCacheRapidocData | null | undefined> {}
}
