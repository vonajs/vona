import type { IDecoratorSummerCacheOptions } from 'vona-module-a-summer';
import type { BeanModelCache } from '../bean/bean.model/bean.model_cache.ts';
import type { ITableRecord } from '../types/onion/table.ts';
import { BeanBase, deepExtend } from 'vona';
import { Service } from 'vona-module-a-bean';

const SymbolCacheOptions = Symbol('SymbolCacheOptions');
const SymbolCacheEnabled = Symbol('SymbolCacheEnabled');

@Service()
export class ServiceCacheEntity extends BeanBase {
  private [SymbolCacheOptions]: IDecoratorSummerCacheOptions | false;
  private _model: BeanModelCache;

  protected __init__(model: BeanModelCache) {
    this._model = model;
  }

  private get scopeDatabase() {
    return this.$scope.database;
  }

  public getCacheInstance(table: keyof ITableRecord) {
    if (this.cacheOptions === false) throw new Error('cache disabled');
    return this.app.bean.summer.cache<any, any>(this.getCacheName(table), this.cacheOptions);
  }

  public getCacheName(table: keyof ITableRecord) {
    const clientNameReal = this.$scope.database.service.database.prepareClientNameReal(this._model.db.clientName);
    return `${this.$beanFullName}:${clientNameReal}:${table}:entity`;
  }

  public get cacheOptions() {
    if (this[SymbolCacheOptions] === undefined) {
      this[SymbolCacheOptions] = this._getCacheOptionsInner();
    }
    return this[SymbolCacheOptions];
  }

  public get cacheEnabled() {
    if (this[SymbolCacheEnabled] === undefined) {
      this[SymbolCacheEnabled] = this._getCacheEnabledInner();
    }
    return this[SymbolCacheEnabled];
  }

  private _getCacheEnabledInner() {
    if (this.cacheOptions === false) return false;
    // enable
    if (!this.bean.onion.checkOnionOptionsEnabled(this.cacheOptions)) return false;
    // default
    return true;
  }

  private _getCacheOptionsInner() {
    if (this._model.options.cache?.entity === false) return false;
    // options
    let _cacheOptions = this._model.options.cache?.entity ?? {};
    // preset
    let configPreset;
    let preset = _cacheOptions.preset;
    if (!preset && !_cacheOptions.mode) preset = this.scopeDatabase.config.summer.presetDefault;
    if (preset) {
      configPreset = this.scopeDatabase.config.summer.preset[preset];
    }
    // extend
    _cacheOptions = deepExtend(
      {
        enable: this.scopeDatabase.config.summer.enable,
        meta: this.scopeDatabase.config.summer.meta,
        redis: { client: this.scopeDatabase.config.summer.redis.client },
      },
      configPreset,
      _cacheOptions,
      { preset: undefined },
    );
    // ok
    return _cacheOptions;
  }
}
