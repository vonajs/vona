import { CacheBase } from '../common/cacheBase.js';
import { cast } from 'vona';
import { ICacheLayeredBase } from '../common/cacheLayeredBase.js';
import {
  IDecoratorSummerCacheOptions,
  ISummerCacheGet,
  ISummerCacheMGet,
  TSummerCacheActionOptions,
} from '../types/summerCache.js';
import { Service } from 'vona-module-a-web';

@Service()
export class ServiceLocalFetch<KEY = any, DATA = any>
  extends CacheBase<KEY, DATA>
  implements ICacheLayeredBase<KEY, DATA>
{
  protected __init__(cacheName: string, cacheOptions: IDecoratorSummerCacheOptions) {
    super.__init__(cacheName, cacheOptions);
  }

  async get(keyHash: string, key: KEY, options?: TSummerCacheActionOptions<KEY, DATA>) {
    const fn_get = options?.get;
    if (fn_get) {
      return await fn_get(key, options, keyHash);
    }
    return await cast<ISummerCacheGet<KEY, DATA>>(this.cacheBeanNative).getNative(key, options, keyHash);
  }

  async mget(keysHash: string[], keys: KEY[], options?: TSummerCacheActionOptions<KEY, DATA>) {
    // mget
    const fn_mget = options?.mget;
    if (fn_mget) {
      return await fn_mget(keys, options, keysHash);
    }
    const cacheBean = cast<ISummerCacheMGet<KEY, DATA> | undefined>(this.cacheBeanNative);
    if (cacheBean?.mgetNative) {
      return await cacheBean.mgetNative(keys, options, keysHash);
    }
    // fallback
    const values: Array<DATA | null | undefined> = [];
    for (let i = 0; i < keys.length; i++) {
      values.push(await this.get(keysHash[i], keys[i], options));
    }
    return values;
  }

  async peek(_keyHash: string, _key: KEY, _options?: TSummerCacheActionOptions<KEY, DATA>) {
    // just return undefined
    return undefined;
  }

  async del(_keyHash: string, _key: KEY, _options?: TSummerCacheActionOptions<KEY, DATA>) {
    // do nothing
  }

  async mdel(_keysHash: string[], _keys: KEY[], _options?: TSummerCacheActionOptions<KEY, DATA>) {
    // do nothing
  }

  async clear(_options) {
    // do nothing
  }

  private get cacheBeanNative(): CacheBase {
    return this.app.bean._getBean(this._cacheName as any);
  }
}
