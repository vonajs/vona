import { Virtual } from 'vona';
import objectHash from 'object-hash';
import { IModuleConfigSummerCacheBase } from '../config/types.js';
import { CacheBase } from '../common/cacheBase.js';

@Virtual({ scene: 'bean' })
export class BeanSummerCacheBase<TScopeModule = unknown, KEY = any, DATA = any> extends CacheBase<TScopeModule> {
  constructor({ cacheBase }: { cacheBase: IModuleConfigSummerCacheBase }) {
    super({ cacheBase });
  }

  async get(key: KEY, options?): Promise<DATA | null | undefined> {
    const keyHash = this.__getKeyHash(key);
    const layered = this.__getLayered(options);
    return await layered.get(keyHash, key, options);
  }

  async mget(keys: KEY[], options?): Promise<DATA[]> {
    if (!keys || keys.length === 0) {
      return [];
    }
    const keysHash = this.__getKeysHash(keys);
    const layered = this.__getLayered(options);
    return await layered.mget(keysHash, keys, options);
  }

  async del(key: KEY, options?) {
    const keyHash = this.__getKeyHash(key);
    const layered = this.__getLayered(options);
    return await layered.del(keyHash, key, options);
  }

  async mdel(keys: KEY[], options?) {
    if (!keys || keys.length === 0) {
      return [];
    }
    const keysHash = this.__getKeysHash(keys);
    const layered = this.__getLayered(options);
    return await layered.mdel(keysHash, keys, options);
  }

  async clear(options?) {
    const layered = this.__getLayered(options);
    return await layered.clear(options);
  }

  async peek(key: KEY, options?): Promise<DATA | null | undefined> {
    const keyHash = this.__getKeyHash(key);
    const layered = this.__getLayered(options);
    return await layered.peek(keyHash, key, options);
  }

  private __getLayered(options?) {
    if (!this.__getOptionsEnabled(options)) {
      return this.localFetch;
    }
    const mode = this.__getOptionsMode(options);
    if (mode === 'all' || mode === 'mem') {
      return this.localMem;
    }
    return this.localRedis;
  }

  private __getKeyHash(key: KEY): string {
    if (key === undefined || key === null) {
      throw new Error('key is required');
    }
    if (Array.isArray(key) || typeof key === 'object') {
      return objectHash(key, { respectType: false });
    }
    if (typeof key !== 'string') {
      return String(key);
    }
    return key;
  }

  private __getKeysHash(keys: KEY[]): string[] {
    return keys.map(key => this.__getKeyHash(key));
  }
}
