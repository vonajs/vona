import { Virtual } from 'vona-module-a-bean';
import { cast, deepExtend } from 'vona';
import objectHash from 'object-hash';
import { CacheBase } from '../common/cacheBase.js';
import { IDecoratorSummerCacheOptions, TSummerCacheActionOptions } from '../types/summerCache.js';

@Virtual()
export class BeanSummerCacheBase<KEY = any, DATA = any> extends CacheBase<KEY, DATA> {
  protected __init__(cacheName?: string, cacheOptions?: IDecoratorSummerCacheOptions) {
    let _cacheName: string;
    let _cacheOptions: IDecoratorSummerCacheOptions;
    if (cacheName) {
      // dynamic
      _cacheName = cacheName;
      _cacheOptions = cacheOptions ?? {};
    } else {
      // summer cache
      _cacheName = this.beanFullName;
      _cacheOptions = cacheOptions ?? (this.beanOptions.options as IDecoratorSummerCacheOptions) ?? {};
    }
    // preset
    let preset = _cacheOptions.preset;
    if (!preset && !_cacheOptions.mode) preset = this.configModule.summer.presetDefault;
    if (preset) {
      const configPreset = this.configModule.summer.preset[preset];
      // extend
      _cacheOptions = deepExtend({}, configPreset, _cacheOptions, { preset: undefined });
    }
    // super
    super.__init__(_cacheName, _cacheOptions);
  }

  async get(key: KEY, options?: TSummerCacheActionOptions<KEY, DATA>): Promise<DATA | null | undefined> {
    const keyHash = this.__getKeyHash(key);
    const layered = this.__getLayered(options);
    return await layered.get(keyHash, key, options);
  }

  /** for internal usage */
  async _set(key: KEY, value: DATA, options?: TSummerCacheActionOptions<KEY, DATA>) {
    const keyHash = this.__getKeyHash(key);
    const layered = this.__getLayered(options);
    return await cast(layered)._set(keyHash, key, value, options);
  }

  /** for internal usage */
  async _getset(key: KEY, value: DATA, options?: TSummerCacheActionOptions<KEY, DATA>) {
    const keyHash = this.__getKeyHash(key);
    const layered = this.__getLayered(options);
    return await cast(layered)._getset(keyHash, key, value, options);
  }

  async mget(keys: KEY[], options?: TSummerCacheActionOptions<KEY, DATA>): Promise<Array<DATA | null | undefined>> {
    if (!keys || keys.length === 0) {
      return [];
    }
    const keysHash = this.__getKeysHash(keys);
    const layered = this.__getLayered(options);
    return await layered.mget(keysHash, keys, options);
  }

  async del(key: KEY, options?: TSummerCacheActionOptions<KEY, DATA>) {
    const keyHash = this.__getKeyHash(key);
    const layered = this.__getLayered(options);
    return await layered.del(keyHash, key, options);
  }

  async mdel(keys: KEY[], options?: TSummerCacheActionOptions<KEY, DATA>) {
    if (!keys || keys.length === 0) {
      return [];
    }
    const keysHash = this.__getKeysHash(keys);
    const layered = this.__getLayered(options);
    return await layered.mdel(keysHash, keys, options);
  }

  async clear(options?: TSummerCacheActionOptions<KEY, DATA>) {
    const layered = this.__getLayered(options);
    return await layered.clear(options);
  }

  async peek(key: KEY, options?: TSummerCacheActionOptions<KEY, DATA>): Promise<DATA | null | undefined> {
    const keyHash = this.__getKeyHash(key);
    const layered = this.__getLayered(options);
    return await layered.peek(keyHash, key, options);
  }

  private __getLayered(options?: TSummerCacheActionOptions<KEY, DATA>) {
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
      key = 'default' as KEY;
      // throw new Error('key is required');
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
