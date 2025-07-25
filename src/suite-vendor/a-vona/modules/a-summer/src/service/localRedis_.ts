import type { BeanCacheRedisBase } from 'vona-module-a-cache';
import type { ICacheLayeredBase } from '../common/cacheLayeredBase.ts';
import type { TSummerCacheActionOptions } from '../types/summerCache.ts';
import { Service } from 'vona-module-a-bean';
import { CacheBase } from '../common/cacheBase.ts';

@Service()
export class ServiceLocalRedis<KEY = any, DATA = any>
  extends CacheBase<KEY, DATA>
  implements ICacheLayeredBase<KEY, DATA> {
  async get(key?: KEY, options?: TSummerCacheActionOptions<KEY, DATA>) {
    let value = await this.cacheRedis.get(key, { ttl: options?.ttl, updateAgeOnGet: options?.updateAgeOnGet });
    if (this.__checkValueEmpty(value, options)) {
      const layered = this.__getLayered(options);
      value = await layered.get(key, options);
      await this.cacheRedis.set(value!, key, { ttl: options?.ttl, db: options?.db });
    }
    return value;
  }

  async mget(keys: KEY[], options?: TSummerCacheActionOptions<KEY, DATA>) {
    // mget
    const values = await this.cacheRedis.mget(keys, { ttl: options?.ttl, updateAgeOnGet: options?.updateAgeOnGet });
    const keysMissing: any[] = [];
    const indexesMissing: any[] = [];
    for (let i = 0; i < values.length; i++) {
      if (this.__checkValueEmpty(values[i], options)) {
        keysMissing.push(keys[i]);
        indexesMissing.push(i);
      }
    }
    // mget
    if (keysMissing.length > 0) {
      const layered = this.__getLayered(options);
      const valuesMissing = await layered.mget(keysMissing, options);
      // this.$logger.silly('-------redis:', valuesMissing);
      // set/merge
      await this.cacheRedis.mset(valuesMissing as any, keysMissing, { ttl: options?.ttl, db: options?.db });
      for (let i = 0; i < keysMissing.length; i++) {
        const valueMissing = valuesMissing[i];
        values[indexesMissing[i]] = valueMissing;
      }
    }
    // ok
    return values;
  }

  async set(value?: DATA, key?: KEY, options?: TSummerCacheActionOptions<KEY, DATA>): Promise<void> {
    await this.cacheRedis.set(value, key, { ttl: options?.ttl, db: options?.db });
  }

  async mset(values: DATA[], keys: KEY[], options?: TSummerCacheActionOptions<KEY, DATA>): Promise<void> {
    await this.cacheRedis.mset(values, keys, { ttl: options?.ttl, db: options?.db });
  }

  async del(key?: KEY, _options?: TSummerCacheActionOptions<KEY, DATA>) {
    await this.cacheRedis.del(key);
  }

  async mdel(keys: KEY[], _options?: TSummerCacheActionOptions<KEY, DATA>) {
    await this.cacheRedis.mdel(keys);
  }

  async clear(_options?: TSummerCacheActionOptions<KEY, DATA>) {
    await this.cacheRedis.clear();
  }

  async peek(key?: KEY, _options?: TSummerCacheActionOptions<KEY, DATA>) {
    const value = await this.cacheRedis.peek(key);
    // need not call layered.peek
    // if (this.__checkValueEmpty(value, options)) {
    //   const layered = this.__getLayered(options);
    //   value = await layered.peek(keyHash, key, options);
    // }
    return value;
  }

  __getLayered(_options?: TSummerCacheActionOptions<KEY, DATA>) {
    return this.localFetch;
  }

  get cacheRedis(): BeanCacheRedisBase<KEY, DATA> {
    return this.app.bean.cache.redis(this._cacheName, this._cacheOptions.redis);
  }
}
