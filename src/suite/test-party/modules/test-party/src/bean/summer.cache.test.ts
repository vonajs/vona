import { BeanBase } from 'vona';
import { SummerCache } from 'vona-module-a-summer';

@SummerCache({
  mode: 'all', // mem/redis/all
  mem: {
    max: 2,
    ttl: 1 * 1000,
  },
  redis: {
    ttl: 3 * 1000,
  },
})
export class SummerCacheTest extends BeanBase {
  async get(key) {
    return {
      id: key.id,
      name: `name_${key.id}`,
    };
  }
}
