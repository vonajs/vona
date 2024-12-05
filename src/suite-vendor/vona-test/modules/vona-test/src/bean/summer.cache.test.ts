import { BeanBase, ISummerCacheGet, SummerCache } from 'vona';

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
export class SummerCacheTest extends BeanBase implements ISummerCacheGet {
  async get(key) {
    return {
      id: key.id,
      name: `name_${key.id}`,
    };
  }
}
