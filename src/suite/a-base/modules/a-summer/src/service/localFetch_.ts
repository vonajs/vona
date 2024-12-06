import { IModuleConfigSummerCacheBase } from '../config/types.js';
import { CacheBase } from '../common/cacheBase.js';
import { Service } from 'vona';

@Service()
export class ServiceLocalFetch extends CacheBase {
  _cacheBean: any;

  constructor({ cacheBase }: { cacheBase: IModuleConfigSummerCacheBase }) {
    super({ cacheBase });
    this._cacheBean = null;
  }

  async get(keyHash, key, options) {
    const fn_get = options?.fn_get;
    if (fn_get) {
      return await fn_get(key, options, keyHash);
    }
    return await this.cacheBean.get(key, options, keyHash);
  }

  async mget(keysHash, keys, options) {
    // mget
    const fn_mget = options?.fn_mget;
    if (fn_mget) {
      return await fn_mget(keys, options, keysHash);
    }
    if (this.cacheBean && this.cacheBean.mget) {
      return await this.cacheBean.mget(keys, options, keysHash);
    }
    // fallback
    const values: any[] = [];
    for (let i = 0; i < keys.length; i++) {
      values.push(await this.get(keysHash[i], keys[i], options));
    }
    return values;
  }

  async peek(_keyHash, _key, _options) {
    _keyHash;
    _key;
    // just return undefined
    return undefined;
  }

  async del(_keyHash, _key, _options) {
    _keyHash;
    _key;
    // do nothing
  }

  async mdel(_keysHash, _keys, _options) {
    _keysHash;
    _keys;
    // do nothing
  }

  async clear(_options) {
    // do nothing
  }

  get cacheBean() {
    if (!this._cacheBase.beanFullName) return null;
    if (!this._cacheBean) {
      this._cacheBean = this.app.bean._newBean(this._cacheBase.beanFullName as any, this._cacheBase);
    }
    return this._cacheBean;
  }
}
