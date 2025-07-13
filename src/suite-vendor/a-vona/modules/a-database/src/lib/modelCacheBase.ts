import type { IDecoratorSummerCacheOptions } from 'vona-module-a-summer';
import type { BeanModelCache } from '../bean/bean.model/bean.model_cache.ts';
import type { TypeModelCacheType } from '../types/model.ts';
import type { ITableRecord } from '../types/onion/table.ts';
import { BeanBase, deepExtend } from 'vona';

const SymbolCacheOptions = Symbol('SymbolCacheOptions');
const SymbolCacheEnabled = Symbol('SymbolCacheEnabled');

export class ModelCacheBase extends BeanBase {
  private [SymbolCacheOptions]: IDecoratorSummerCacheOptions | false;
  protected _model: BeanModelCache;
  private _cacheType: TypeModelCacheType;

  protected __init__(model: BeanModelCache, cacheType: TypeModelCacheType) {
    this._model = model;
    this._cacheType = cacheType;
  }

  private get scopeDatabase() {
    return this.$scope.database;
  }

  public getInstance(table: keyof ITableRecord) {
    if (this.options === false) throw new Error('cache disabled');
    return this.app.bean.summer.cache<any, any>(this.getName(table), this.options);
  }

  public getName(table: keyof ITableRecord) {
    const clientNameReal = this.$scope.database.service.database.prepareClientNameReal(this._model.db.clientName);
    return `${this.$beanFullName}:${clientNameReal}:${table}:${this._cacheType}`;
  }

  public get options() {
    if (this[SymbolCacheOptions] === undefined) {
      this[SymbolCacheOptions] = this._getCacheOptionsInner();
    }
    return this[SymbolCacheOptions];
  }

  public get enabled() {
    if (this[SymbolCacheEnabled] === undefined) {
      this[SymbolCacheEnabled] = this._getCacheEnabledInner();
    }
    return this[SymbolCacheEnabled];
  }

  private _getCacheEnabledInner() {
    if (this.options === false) return false;
    // enable
    if (!this.bean.onion.checkOnionOptionsEnabled(this.options)) return false;
    // default
    return true;
  }

  private _getCacheOptionsInner() {
    if (this._model.options.cache?.[this._cacheType] === false) return false;
    // options
    let _cacheOptions = (this._model.options.cache?.[this._cacheType] ?? {}) as IDecoratorSummerCacheOptions;
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
