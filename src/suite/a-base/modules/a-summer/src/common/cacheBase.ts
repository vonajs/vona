import { __ThisModule__ } from '../.metadata/this.js';
import { BeanBase } from 'vona';
import { ServiceLocalMem } from '../service/localMem_.js';
import { ServiceLocalRedis } from '../service/localRedis_.js';
import { ServiceLocalFetch } from '../service/localFetch_.js';
import { IDecoratorSummerCacheOptions, TSummerCacheActionOptions } from '../types/summerCache.js';

export class CacheBase<KEY = any, DATA = any> extends BeanBase {
  protected _cacheName: string;
  protected _cacheOpitons: IDecoratorSummerCacheOptions;

  protected _localMem: ServiceLocalMem<KEY, DATA>;
  protected _localRedis: ServiceLocalRedis<KEY, DATA>;
  protected _localFetch: ServiceLocalFetch<KEY, DATA>;

  protected __init__(cacheName: string, cacheOptions: IDecoratorSummerCacheOptions) {
    this._cacheName = cacheName;
    this._cacheOpitons = cacheOptions;
  }

  protected get scopeSummer() {
    return this.getScope(__ThisModule__);
  }

  protected get configModule() {
    return this.scopeSummer.config;
  }

  protected get localMem() {
    if (!this._localMem) {
      this._localMem = this.app.bean._getBeanSelector(
        `${__ThisModule__}.service.localMem` as any,
        this._cacheName,
        this._cacheOpitons,
      );
    }
    return this._localMem;
  }

  protected get localRedis() {
    if (!this._localRedis) {
      this._localRedis = this.app.bean._getBeanSelector(
        `${__ThisModule__}.service.localRedis` as any,
        this._cacheName,
        this._cacheOpitons,
      );
    }
    return this._localRedis;
  }

  protected get localFetch() {
    if (!this._localFetch) {
      this._localFetch = this.app.bean._getBeanSelector(
        `${__ThisModule__}.service.localFetch` as any,
        this._cacheName,
        this._cacheOpitons,
      );
    }
    return this._localFetch;
  }

  protected __getOptionsEnabled(options?: TSummerCacheActionOptions<KEY, DATA>) {
    // enable
    const enable = options?.enable ?? this._cacheOpitons.enable ?? this.scopeSummer.config.summer.enable;
    if (enable === false) return false;
    // meta
    const meta = this._cacheOpitons.meta ?? this.scopeSummer.config.summer.meta;
    if (!this.app.bean.onion.checkOnionSlicOptionsMeta(meta)) {
      return false;
    }
    // default
    return true;
  }

  protected __getOptionsMode(options?: TSummerCacheActionOptions<KEY, DATA>) {
    return options?.mode ?? this._cacheOpitons.mode ?? 'all';
  }

  protected __checkValueEmpty(value: DATA | null | undefined, options?: TSummerCacheActionOptions<KEY, DATA>) {
    const ignoreNull = options?.ignoreNull ?? this._cacheOpitons.ignoreNull ?? false;
    if (ignoreNull) {
      return value === undefined || value === null;
    }
    return value === undefined;
  }
}
