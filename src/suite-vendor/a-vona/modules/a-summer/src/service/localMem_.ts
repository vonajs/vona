import type { BeanCacheMemBase } from 'vona-module-a-cache';
import type { ICacheLayeredBase } from '../common/cacheLayeredBase.ts';
import type { TSummerCacheActionOptions } from '../types/summerCache.ts';
import { Service } from 'vona-module-a-web';
import { CacheBase } from '../common/cacheBase.ts';

@Service()
export class ServiceLocalMem<KEY = any, DATA = any>
  extends CacheBase<KEY, DATA>
  implements ICacheLayeredBase<KEY, DATA> {
  async get(key?: KEY, options?: TSummerCacheActionOptions<KEY, DATA>) {
    let value = this.cacheMem.get(key, { updateAgeOnGet: options?.updateAgeOnGet });
    if (this.__checkValueEmpty(value, options)) {
      const layered = this.__getLayered(options);
      value = await layered.get(key, options);
      this.cacheMem.set(value!, key, { db: options?.db, broadcastOnSet: false });
    }
    return value;
  }

  async mget(keys: KEY[], options?: TSummerCacheActionOptions<KEY, DATA>) {
    // mget
    const values = this.cacheMem.mget(keys, { updateAgeOnGet: options?.updateAgeOnGet });
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
      // this.$logger.silly('-------mem:', valuesMissing);
      // set/merge
      this.cacheMem.mset(valuesMissing as any, keysMissing, { db: options?.db, broadcastOnSet: false });
      for (let i = 0; i < keysMissing.length; i++) {
        const valueMissing = valuesMissing[i];
        values[indexesMissing[i]] = valueMissing;
      }
    }
    // ok
    return values;
  }

  async set(value?: DATA, key?: KEY, options?: TSummerCacheActionOptions<KEY, DATA>): Promise<void> {
    // set
    this.cacheMem.set(value, key, { db: options?.db, broadcastOnSet: options?.broadcastOnSet });
    // set layered
    const layered = this.__getLayered(options);
    await layered.set(value, key, options);
  }

  async mset(values: DATA[], keys: KEY[], options?: TSummerCacheActionOptions<KEY, DATA>): Promise<void> {
    // mset
    this.cacheMem.mset(values, keys, { db: options?.db, broadcastOnSet: options?.broadcastOnSet });
    // mset layered
    const layered = this.__getLayered(options);
    await layered.mset(values, keys, options);
  }

  async del(key?: KEY, options?: TSummerCacheActionOptions<KEY, DATA>) {
    // del on this worker+broadcast
    this.cacheMem.del(key);
    // del layered
    const layered = this.__getLayered(options);
    await layered.del(key, options);
  }

  async mdel(keys: KEY[], options?: TSummerCacheActionOptions<KEY, DATA>) {
    // del on this worker+broadcast
    this.cacheMem.mdel(keys);
    // del layered
    const layered = this.__getLayered(options);
    await layered.mdel(keys, options);
  }

  async clear(options?: TSummerCacheActionOptions<KEY, DATA>) {
    // clear on this worker+broadcast
    this.cacheMem.clear();
    // clear layered
    const layered = this.__getLayered(options);
    await layered.clear(options);
  }

  async peek(key?: KEY, options?: TSummerCacheActionOptions<KEY, DATA>) {
    let value = this.cacheMem.peek(key);
    if (this.__checkValueEmpty(value, options)) {
      const layered = this.__getLayered(options);
      value = await layered.peek(key, options);
    }
    return value;
  }

  __getLayered(options?: TSummerCacheActionOptions<KEY, DATA>): ICacheLayeredBase<KEY, DATA> {
    const mode = this.__getOptionsMode(options);
    if (mode === 'all') {
      return this.localRedis;
    }
    return this.localFetch;
  }

  get cacheMem(): BeanCacheMemBase<KEY, DATA> {
    return this.app.bean.cache.mem(this._cacheName, this._cacheOptions.mem);
  }
}
