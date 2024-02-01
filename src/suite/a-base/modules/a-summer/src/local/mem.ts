import { __ThisModule__ } from '../resource/this.js';
import LRUCache from 'lru-cache';
import { CacheBase } from './cacheBase.js';
import { Local } from '@cabloy/core';
import { IModuleConfigSummerCacheBase } from '../config/types.js';

const SUMMERCACHEMEMORY = Symbol('APP#__SUMMERCACHEMEMORY');

@Local()
export class LocalMem extends CacheBase {
  _lruCache: any;

  constructor({ cacheBase }: { cacheBase: IModuleConfigSummerCacheBase }) {
    super({ cacheBase });
    this._lruCache = null;
  }

  async get(keyHash, key, options) {
    let value = this.lruCache.get(keyHash);
    if (this.__checkValueEmpty(value, options)) {
      const layered = this.__getLayered(options);
      value = await layered.get(keyHash, key, options);
      this.lruCache.set(keyHash, value);
    }
    return value;
  }

  async mget(keysHash, keys, options) {
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

  async del(keyHash, key, options) {
    // del on this worker
    this.lruCache.delete(keyHash);
    // del on other workers by broadcast
    this.ctx.meta.util.broadcastEmit({
      module: __ThisModule__,
      broadcastName: 'memDel',
      data: { fullKey: this._cacheBase.fullKey, keyHash, key, options },
    });
    // del layered
    const layered = this.__getLayered(options);
    await layered.del(keyHash, key, options);
  }

  async mdel(keysHash, keys, options) {
    // del on this worker
    keysHash.forEach(keyHash => this.lruCache.delete(keyHash));
    // del on other workers by broadcast
    this.ctx.meta.util.broadcastEmit({
      module: __ThisModule__,
      broadcastName: 'memMultiDel',
      data: { fullKey: this._cacheBase.fullKey, keysHash, keys, options },
    });
    // del layered
    const layered = this.__getLayered(options);
    await layered.mdel(keysHash, keys, options);
  }

  async clear(options) {
    // clear on this worker
    this.lruCache.clear();
    // clear on other workers by broadcast
    this.ctx.meta.util.broadcastEmit({
      module: __ThisModule__,
      broadcastName: 'memClear',
      data: { fullKey: this._cacheBase.fullKey, options },
    });
    // clear layered
    const layered = this.__getLayered(options);
    await layered.clear(options);
  }

  async peek(keyHash, key, options) {
    let value = this.lruCache.peek(keyHash);
    if (this.__checkValueEmpty(value, options)) {
      const layered = this.__getLayered(options);
      value = await layered.peek(keyHash, key, options);
    }
    return value;
  }

  __delRaw(keyHash, _key, _options) {
    _key;
    this.lruCache.delete(keyHash);
  }

  __mdelRaw(keysHash, _keys, _options) {
    _keys;
    keysHash.forEach(keyHash => this.lruCache.delete(keyHash));
  }

  __clearRaw(_options) {
    this.lruCache.clear();
  }

  __getLayered(options) {
    const mode = this.__getOptionsMode(options);
    if (mode === 'all') {
      return this.localRedis;
    }
    return this.localFetch;
  }

  get lruCache() {
    if (!this._lruCache) {
      this._lruCache = this.memoryInstance[this._cacheBase.fullKey];
      if (!this._lruCache) {
        this._lruCache = this.memoryInstance[this._cacheBase.fullKey] = new LRUCache(this._cacheBase.mem as any);
      }
    }
    return this._lruCache;
  }

  get memoryInstance() {
    if (!this.ctx.app[SUMMERCACHEMEMORY]) {
      this.ctx.app[SUMMERCACHEMEMORY] = {};
    }
    if (!this.ctx.app[SUMMERCACHEMEMORY][this.ctx.subdomain]) {
      this.ctx.app[SUMMERCACHEMEMORY][this.ctx.subdomain] = {};
    }
    return this.ctx.app[SUMMERCACHEMEMORY][this.ctx.subdomain];
  }
}
