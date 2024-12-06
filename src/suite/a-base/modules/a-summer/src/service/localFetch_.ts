import { CacheBase } from '../common/cacheBase.js';
import {
  cast,
  IDecoratorSummerCacheOptions,
  ISummerCacheGet,
  ISummerCacheMGet,
  Service,
  TSummerCacheActionOptions,
} from 'vona';
import { ICacheLayeredBase } from '../common/cacheLayeredBase.js';

@Service()
export class ServiceLocalFetch<TScopeModule = unknown, KEY = any, DATA = any>
  extends CacheBase<TScopeModule, KEY, DATA>
  implements ICacheLayeredBase<KEY, DATA>
{
  cacheBean?: CacheBase;

  protected __init__(cacheName: string, cacheOptions: IDecoratorSummerCacheOptions, cacheBean?: CacheBase) {
    super.__init__(cacheName, cacheOptions);
    this.cacheBean = cacheBean;
  }

  async get(keyHash: string, key: KEY, options?: TSummerCacheActionOptions<KEY, DATA>) {
    const fn_get = options?.get;
    if (fn_get) {
      return await fn_get(key, options, keyHash);
    }
    return await cast<ISummerCacheGet<KEY, DATA>>(this.cacheBean).getNative(key, options, keyHash);
  }

  async mget(keysHash: string[], keys: KEY[], options?: TSummerCacheActionOptions<KEY, DATA>) {
    // mget
    const fn_mget = options?.mget;
    if (fn_mget) {
      return await fn_mget(keys, options, keysHash);
    }
    const cacheBean = cast<ISummerCacheMGet<KEY, DATA> | undefined>(this.cacheBean);
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
}
