import { __ThisModule__ } from '../.metadata/this.js';
import { BeanBase, IDecoratorSummerCacheOptions, TSummerCacheActionOptions } from 'vona';
import { ServiceLocalMem } from '../service/localMem_.js';
import { ServiceLocalRedis } from '../service/localRedis_.js';
import { ServiceLocalFetch } from '../service/localFetch_.js';

export class CacheBase<TScopeModule = unknown, KEY = any, DATA = any> extends BeanBase<TScopeModule> {
  _cacheName: string;
  _cacheOpitons: IDecoratorSummerCacheOptions;

  _localMem: ServiceLocalMem<TScopeModule, KEY, DATA>;
  _localRedis: ServiceLocalRedis<TScopeModule, KEY, DATA>;
  _localFetch: ServiceLocalFetch<TScopeModule, KEY, DATA>;

  protected __init__(cacheName: string, cacheOptions: IDecoratorSummerCacheOptions) {
    this._cacheName = cacheName;
    this._cacheOpitons = cacheOptions;
  }

  get scopeSummer() {
    return this.getScope(__ThisModule__);
  }

  get configModule() {
    return this.scopeSummer.config;
  }

  get localMem() {
    if (!this._localMem) {
      this._localMem = this.app.bean._getBeanSelector(
        `${__ThisModule__}.service.localMem` as any,
        this._cacheName,
        this._cacheOpitons,
      );
    }
    return this._localMem;
  }

  get localRedis() {
    if (!this._localRedis) {
      this._localRedis = this.app.bean._getBeanSelector(
        `${__ThisModule__}.service.localRedis` as any,
        this._cacheName,
        this._cacheOpitons,
      );
    }
    return this._localRedis;
  }

  get localFetch() {
    if (!this._localFetch) {
      this._localFetch = this.app.bean._getBeanSelector(
        `${__ThisModule__}.service.localFetch` as any,
        this._cacheName,
        this._cacheOpitons,
        this,
      );
    }
    return this._localFetch;
  }

  __getOptionsEnabled(options?: TSummerCacheActionOptions<KEY, DATA>) {
    // general
    if (
      this.configModule.summer.enable === false ||
      !this.app.meta.util.checkMiddlewareOptionsMeta(this.configModule.summer.meta)
    ) {
      return false;
    }
    // action options
    if (options?.enable === false) return false;
    // cache options
    if (
      this._cacheOpitons.enable === false ||
      !this.app.meta.util.checkMiddlewareOptionsMeta(this._cacheOpitons.meta)
    ) {
      return false;
    }
    // default
    return true;
  }

  __getOptionsMode(options?: TSummerCacheActionOptions<KEY, DATA>) {
    return options?.mode ?? this._cacheOpitons.mode ?? 'all';
  }

  __checkValueEmpty(value: DATA | null | undefined, options?: TSummerCacheActionOptions<KEY, DATA>) {
    const ignoreNull = options?.ignoreNull ?? this._cacheOpitons.ignoreNull ?? false;
    if (ignoreNull) {
      return value === undefined || value === null;
    }
    return value === undefined;
  }
}
