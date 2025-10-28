import type { ServiceLocalFetch } from '../service/localFetch_.ts';
import type { ServiceLocalMem } from '../service/localMem_.ts';
import type { ServiceLocalRedis } from '../service/localRedis_.ts';
import type { IDecoratorSummerCacheOptions, TSummerCacheActionOptions } from '../types/summerCache.ts';
import { BeanBase } from 'vona';
import { __ThisModule__ } from '../.metadata/this.ts';

export class CacheBase<KEY = any, DATA = any> extends BeanBase {
  protected _cacheName: string;
  protected _cacheOptions: IDecoratorSummerCacheOptions;

  protected _localMem: ServiceLocalMem<KEY, DATA>;
  protected _localRedis: ServiceLocalRedis<KEY, DATA>;
  protected _localFetch: ServiceLocalFetch<KEY, DATA>;

  protected __init__(cacheName: string, cacheOptions: IDecoratorSummerCacheOptions) {
    this._cacheName = cacheName;
    this._cacheOptions = cacheOptions;
  }

  protected get scopeSummer() {
    return this.app.scope(__ThisModule__);
  }

  protected get configModule() {
    return this.scopeSummer.config;
  }

  protected get localMem() {
    if (!this._localMem) {
      this._localMem = this.app.bean._getBeanSelector(
        `${__ThisModule__}.service.localMem` as any,
        this._cacheName,
        this._cacheOptions,
      );
    }
    return this._localMem;
  }

  protected get localRedis() {
    if (!this._localRedis) {
      this._localRedis = this.app.bean._getBeanSelector(
        `${__ThisModule__}.service.localRedis` as any,
        this._cacheName,
        this._cacheOptions,
      );
    }
    return this._localRedis;
  }

  protected get localFetch() {
    if (!this._localFetch) {
      this._localFetch = this.app.bean._getBeanSelector(
        `${__ThisModule__}.service.localFetch` as any,
        this._cacheName,
        this._cacheOptions,
      );
    }
    return this._localFetch;
  }

  protected __getOptionsEnabled(options?: TSummerCacheActionOptions<KEY, DATA>) {
    // enable/meta
    const enable = options?.enable ?? this._cacheOptions.enable ?? this.scopeSummer.config.summer.enable;
    const meta = this._cacheOptions.meta ?? this.scopeSummer.config.summer.meta;
    if (!this.bean.onion.checkOnionOptionsEnabled({ enable, meta })) return false;
    // default
    return true;
  }

  protected __getOptionsMode(options?: TSummerCacheActionOptions<KEY, DATA>) {
    return options?.mode ?? this._cacheOptions.mode ?? 'all';
  }

  protected __checkValueEmpty(value: DATA | null | undefined, options?: TSummerCacheActionOptions<KEY, DATA>) {
    // undefined
    if (value === undefined) return true;
    // []
    const emptyArrayAsNull = options?.emptyArrayAsNull ?? this._cacheOptions.emptyArrayAsNull ?? false;
    if (emptyArrayAsNull && Array.isArray(value) && value.length === 0) {
      value = null;
    }
    // null
    const ignoreNull = options?.ignoreNull ?? this._cacheOptions.ignoreNull ?? false;
    if (ignoreNull && value === null) return true;
    // others
    return false;
  }
}
