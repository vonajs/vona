import LRUCache from 'lru-cache';
import { CacheBase } from '../common/cacheBase.js';
import { Service } from 'vona-module-a-web';
import { ICacheLayeredBase } from '../common/cacheLayeredBase.js';
import { TSummerCacheActionOptions } from '../types/summerCache.js';

const SUMMERCACHEMEMORY = Symbol('APP#__SUMMERCACHEMEMORY');

@Service()
export class ServiceLocalMem<KEY = any, DATA = any>
  extends CacheBase<KEY, DATA>
  implements ICacheLayeredBase<KEY, DATA>
{
  async get(keyHash: string, key: KEY, options?: TSummerCacheActionOptions<KEY, DATA>) {
    let value = this.lruCache.get(keyHash);
    if (this.__checkValueEmpty(value, options)) {
      const layered = this.__getLayered(options);
      value = await layered.get(keyHash, key, options);
      this.lruCache.set(keyHash, value);
    }
    return value;
  }

  async mget(keysHash: string[], keys: KEY[], options?: TSummerCacheActionOptions<KEY, DATA>) {
    // peek
    const values = keysHash.map(keyHash => this.lruCache.peek(keyHash));
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
        this.lruCache.set(keysHashMissing[i], valueMissing);
        values[indexesMissing[i]] = valueMissing;
      }
    }
    // ok
    return values;
  }

  async del(keyHash: string, key: KEY, options?: TSummerCacheActionOptions<KEY, DATA>) {
    // del on this worker
    this.lruCache.delete(keyHash);
    // del on other workers by broadcast
    this.scope.broadcast.memDel.emit({
      cacheName: this._cacheName,
      cacheOptions: this._cacheOptions,
      keyHash,
      key,
      options,
    });
    // del layered
    const layered = this.__getLayered(options);
    await layered.del(keyHash, key, options);
  }

  async mdel(keysHash: string[], keys: KEY[], options?: TSummerCacheActionOptions<KEY, DATA>) {
    // del on this worker
    keysHash.forEach(keyHash => this.lruCache.delete(keyHash));
    // del on other workers by broadcast
    this.scope.broadcast.memMultiDel.emit({
      cacheName: this._cacheName,
      cacheOptions: this._cacheOptions,
      keysHash,
      keys,
      options,
    });
    // del layered
    const layered = this.__getLayered(options);
    await layered.mdel(keysHash, keys, options);
  }

  async clear(options?: TSummerCacheActionOptions<KEY, DATA>) {
    // clear on this worker
    this.lruCache.clear();
    // clear on other workers by broadcast
    this.scope.broadcast.memClear.emit({ cacheName: this._cacheName, cacheOptions: this._cacheOptions, options });
    // clear layered
    const layered = this.__getLayered(options);
    await layered.clear(options);
  }

  async peek(keyHash: string, key: KEY, options?: TSummerCacheActionOptions<KEY, DATA>) {
    let value = this.lruCache.peek(keyHash);
    if (this.__checkValueEmpty(value, options)) {
      const layered = this.__getLayered(options);
      value = await layered.peek(keyHash, key, options);
    }
    return value;
  }

  __delRaw(keyHash: string, _key: KEY, _options?: TSummerCacheActionOptions<KEY, DATA>) {
    this.lruCache.delete(keyHash);
  }

  __mdelRaw(keysHash: string[], _keys: KEY[], _options?: TSummerCacheActionOptions<KEY, DATA>) {
    keysHash.forEach(keyHash => this.lruCache.delete(keyHash));
  }

  __clearRaw(_options?: TSummerCacheActionOptions<KEY, DATA>) {
    this.lruCache.clear();
  }

  __getLayered(options?: TSummerCacheActionOptions<KEY, DATA>): ICacheLayeredBase<KEY, DATA> {
    const mode = this.__getOptionsMode(options);
    if (mode === 'all') {
      return this.localRedis;
    }
    return this.localFetch;
  }

  get lruCache(): LRUCache<string, any> {
    if (!this.memoryInstance[this._cacheName]) {
      this.memoryInstance[this._cacheName] = new LRUCache<string, any>(this._cacheOptions.mem as any);
    }
    return this.memoryInstance[this._cacheName];
  }

  get memoryInstance() {
    if (!this.app[SUMMERCACHEMEMORY]) {
      this.app[SUMMERCACHEMEMORY] = {};
    }
    if (!this.app[SUMMERCACHEMEMORY][this.ctx.subdomain]) {
      this.app[SUMMERCACHEMEMORY][this.ctx.subdomain] = {};
    }
    return this.app[SUMMERCACHEMEMORY][this.ctx.subdomain];
  }
}
