import { BeanBase, ISummerCacheGet, SummerCache } from 'vona';

@SummerCache()
export class SummerCacheTest extends BeanBase implements ISummerCacheGet {
  async get(_key) {}
}
