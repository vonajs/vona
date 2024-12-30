import { CacheBase } from '../common/cacheBase.js';
import { Service } from 'vona-module-a-web';
import { ICacheLayeredBase } from '../common/cacheLayeredBase.js';
import { TSummerCacheActionOptions } from '../types/summerCache.js';
import { BeanCacheMemBase } from 'vona-module-a-cache';

@Service()
export class ServiceLocalMem<KEY = any, DATA = any>
  extends CacheBase<KEY, DATA>
  implements ICacheLayeredBase<KEY, DATA>
{
  async get(keyHash: string, key: KEY, options?: TSummerCacheActionOptions<KEY, DATA>) {
    let value = this.cacheMem.get(key);
    if (this.__checkValueEmpty(value, options)) {
      const layered = this.__getLayered(options);
      value = await layered.get(keyHash, key, options);
      this.cacheMem.set(value!, key);
    }
    return value;
  }

  async mget(keysHash: string[], keys: KEY[], options?: TSummerCacheActionOptions<KEY, DATA>) {
    // peek
    const values = this.cacheMem.mget(keys);
    const keysHashMissing: any[] = [];
    const keysMissing: any[] = [];
    const indexesMissing: any[] = [];
    for (let i = 0; i < values.length; i++) {
      if (this.__checkValueEmpty(values[i], options)) {
        keysHashMissing.push(keysHash[i]);
        keysMissing.push(keys[i]);
        indexesMissing.push(i);
      }
    }
    // mget
    if (keysHashMissing.length > 0) {
      const layered = this.__getLayered(options);
      const valuesMissing = await layered.mget(keysHashMissing, keysMissing, options);
      // console.log('-------mem:', valuesMissing);
      // set/merge
      for (let i = 0; i < keysHashMissing.length; i++) {
        const valueMissing = valuesMissing[i];
        this.cacheMem.set(valueMissing!, keysMissing[i]);
        values[indexesMissing[i]] = valueMissing;
      }
    }
    // ok
    return values;
  }

  async del(keyHash: string, key: KEY, options?: TSummerCacheActionOptions<KEY, DATA>) {
    // del on this worker+broadcast
    this.cacheMem.del(key);
    // del layered
    const layered = this.__getLayered(options);
    await layered.del(keyHash, key, options);
  }

  async mdel(keysHash: string[], keys: KEY[], options?: TSummerCacheActionOptions<KEY, DATA>) {
    // del on this worker+broadcast
    this.cacheMem.mdel(keys);
    // del layered
    const layered = this.__getLayered(options);
    await layered.mdel(keysHash, keys, options);
  }

  async clear(options?: TSummerCacheActionOptions<KEY, DATA>) {
    // clear on this worker+broadcast
    this.cacheMem.clear();
    // clear layered
    const layered = this.__getLayered(options);
    await layered.clear(options);
  }

  async peek(keyHash: string, key: KEY, options?: TSummerCacheActionOptions<KEY, DATA>) {
    let value = this.cacheMem.peek(key);
    if (this.__checkValueEmpty(value, options)) {
      const layered = this.__getLayered(options);
      value = await layered.peek(keyHash, key, options);
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
