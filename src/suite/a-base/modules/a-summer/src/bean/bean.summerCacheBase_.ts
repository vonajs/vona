import { deepExtend, IDecoratorSummerCacheOptions, TSummerCacheActionOptions, Virtual } from 'vona';
import objectHash from 'object-hash';
import { CacheBase } from '../common/cacheBase.js';

@Virtual()
export class BeanSummerCacheBase<TScopeModule = unknown, KEY = any, DATA = any> extends CacheBase<
  TScopeModule,
  KEY,
  DATA
> {
  protected __init__(cacheName?: string, cacheOptions?: IDecoratorSummerCacheOptions) {
    let _cacheName: string;
    let _cacheOpitons: IDecoratorSummerCacheOptions;
    if (cacheName) {
      // dynamic
      _cacheName = cacheName;
      _cacheOpitons = cacheOptions!;
    } else {
      // summer cache
      _cacheName = this.beanFullName;
      _cacheOpitons = cacheOptions ?? (this.beanOptions.options as IDecoratorSummerCacheOptions);
    }
    // preset
    let preset = _cacheOpitons.preset;
    if (!preset && !_cacheOpitons.mode) preset = this.configModule.summer.presetDefault;
    if (preset) {
      const configPreset = this.configModule.summer.preset[preset];
      // extend
      _cacheOpitons = deepExtend({}, configPreset, _cacheOpitons, { preset: undefined });
    }
    // super
    super.__init__(_cacheName, _cacheOpitons);
  }

  async get(key: KEY, options?: TSummerCacheActionOptions<KEY, DATA>): Promise<DATA | null | undefined> {
    const keyHash = this.__getKeyHash(key);
    const layered = this.__getLayered(options);
    return await layered.get(keyHash, key, options);
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
