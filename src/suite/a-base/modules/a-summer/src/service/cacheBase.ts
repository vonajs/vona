import { __ThisModule__ } from '../.metadata/this.js';
import { BeanBase } from 'vona';
import { LocalMem } from './mem.js';
import { LocalRedis } from './redis.js';
import { LocalFetch } from './fetch.js';
import { IModuleConfigSummerCacheBase } from '../config/types.js';

export class CacheBase extends BeanBase {
  _cacheBase: IModuleConfigSummerCacheBase;

  _localMem: LocalMem;
  _localRedis: LocalRedis;
  _localFetch: LocalFetch;

  constructor({ cacheBase }: { cacheBase: IModuleConfigSummerCacheBase }) {
    super();
    this._cacheBase = cacheBase;
  }

  get scopeASummer() {
    return this.getScope(__ThisModule__);
  }

  get configModule() {
    return this.scopeASummer.config;
  }

  get localMem() {
    if (!this._localMem) {
      this._localMem = this.ctx.bean._newBean(`${__ThisModule__}.service.mem` as any, {
        cacheBase: this._cacheBase,
      });
    }
    return this._localMem;
  }

  get localRedis() {
    if (!this._localRedis) {
      this._localRedis = this.ctx.bean._newBean(`${__ThisModule__}.service.redis` as any, {
        cacheBase: this._cacheBase,
      });
    }
    return this._localRedis;
  }

  get localFetch() {
    if (!this._localFetch) {
      this._localFetch = this.ctx.bean._newBean(`${__ThisModule__}.service.fetch` as any, {
        cacheBase: this._cacheBase,
      });
    }
    return this._localFetch;
  }

  __getOptionsEnabled(options?) {
    if (!this.configModule.summer.enable) return false;
    if (options?.enable === false) return false;
    if (this._cacheBase.enable === false) return false;
    return true;
  }

  __getOptionsMode(options) {
    const mode = options && options.mode;
    return mode || this._cacheBase.mode || 'all';
  }

  __checkValueEmpty(value, options) {
    let ignoreNull;
    if (options?.ignoreNull !== undefined) {
      ignoreNull = options?.ignoreNull;
    } else {
      ignoreNull = this._cacheBase.ignoreNull;
    }
    if (ignoreNull) {
      return value === undefined || value === null;
    }
    return value === undefined;
  }
}
