import type { IDecoratorSummerCacheOptions } from 'vona-module-a-summer';
import type {
  EntityBase,
  IModelGetOptions,
  IModelMethodOptions,
  IModelSelectParams,
  IModelUpdateOptions,
  TableIdentity,
  TypeModelWhere,
} from '../../types/index.ts';
import { cast, deepExtend } from 'vona';
import { getTargetColumnName } from '../../common/utils.ts';
import { BeanModel } from '../bean.model.ts';

const SymbolCacheName = Symbol('SymbolCacheName');
const SymbolCacheOptions = Symbol('SymbolCacheOptions');
const SymbolCacheEnabled = Symbol('SymbolCacheEnabled');

export class BeanModelCache<TRecord extends {}> extends BeanModel<TRecord> {
  private [SymbolCacheName]: string;
  private [SymbolCacheOptions]: IDecoratorSummerCacheOptions | false;

  private get __cacheName() {
    if (!this[SymbolCacheName]) {
      const clientNameReal = this.$scope.database.service.database.prepareClientNameReal(this.db.clientName);
      this[SymbolCacheName] = `${this.$beanFullName}:${clientNameReal}`;
    }
    return this[SymbolCacheName];
  }

  private get __cacheOptions() {
    if (this[SymbolCacheOptions] === undefined) {
      this[SymbolCacheOptions] = this.__cacheOptionsInner();
    }
    return this[SymbolCacheOptions];
  }

  private get __cacheEnabled() {
    if (this[SymbolCacheEnabled] === undefined) {
      this[SymbolCacheEnabled] = this.__cacheEnabledInner();
    }
    return this[SymbolCacheEnabled];
  }

  private get __cacheKeyAux() {
    return this.options.cacheKeyAux;
  }

  private get __cacheNotKey() {
    return this.options.cacheNotKey !== false;
  }

  async clearCache() {
    if (!this.__cacheEnabled) return;
    await this.__cacheInstance.clear();
  }

  async mget(
    ids: (TableIdentity | object)[],
    options?: IModelGetOptions<TRecord>,
  ): Promise<TRecord[]>;
  async mget(
    table: string,
    ids: (TableIdentity | object)[],
    options?: IModelGetOptions<TRecord>,
  ): Promise<TRecord[]>;
  async mget(table, ids, options?: IModelGetOptions<TRecord>): Promise<TRecord[]> {
    if (typeof table !== 'string') {
      options = ids;
      ids = table;
      table = undefined;
    }
    // not use cache if specified table
    if (table && table !== this.table) {
      return (await super.mget(table, ids, options)) as TRecord[];
    }
    // table
    table = table || this.table;
    if (!table) return this.scopeDatabase.error.ShouldSpecifyTable.throw();
    // check if cache
    if (!this.__cacheEnabled) {
      return (await super.mget(table, ids, options)) as TRecord[];
    }
    // cache
    const cache = this.__cacheInstance;
    let items = await cache.mget(ids, {
      mget: async ids => {
        return await super._mget(table, ids, { disableDeleted: true });
      },
      db: this.db,
    });
    // filter disableDeleted
    items = items.filter(item => {
      if (!item) return false;
      if (!this._checkDisableDeletedByOptions(options) && cast<EntityBase>(item).deleted) return false;
      return true;
    });
    return this.__filterMGetColumns(items, options);
  }

  async select(
    params?: IModelSelectParams<TRecord>,
    options?: IModelMethodOptions,
  ): Promise<TRecord[]>;
  async select(
    table: string,
    params?: IModelSelectParams<TRecord>,
    options?: IModelMethodOptions,
  ): Promise<TRecord[]>;
  async select(table?, params?, options?): Promise<TRecord[]> {
    if (typeof table !== 'string') {
      options = params;
      params = table;
      table = undefined;
    }
    // not use cache if specified table
    if (table && table !== this.table) {
      return await super.select(table, params, options);
    }
    // table
    table = table || this.table;
    if (!table) return this.scopeDatabase.error.ShouldSpecifyTable.throw();
    // check if cache
    if (!this.__cacheEnabled) {
      return await super.select(table, params, options);
    }
    // 1: select id
    const columnId = `${params?.alias ? params?.alias : table}.id`;
    const params2: IModelSelectParams<TRecord> = Object.assign({}, params, { columns: [columnId] });
    const items = await super.select(table, params2, options);
    if (items.length === 0) {
      // donothing
      return [] as TRecord[];
    }
    // 2: mget
    const ids = items.map(item => cast(item).id);
    const options2 = params?.columns ? Object.assign({}, options, { columns: params?.columns }) : options;
    return await this.mget(table, ids, options2);
  }

  async get(
    where?: TypeModelWhere<TRecord>,
    options?: IModelGetOptions<TRecord>,
  ): Promise<TRecord | undefined>;
  async get(
    table: string,
    where?: TypeModelWhere<TRecord>,
    options?: IModelGetOptions<TRecord>,
  ): Promise<TRecord | undefined>;
  async get(
    table?,
    where?: TypeModelWhere<TRecord>,
    options?: IModelGetOptions<TRecord>,
  ): Promise<TRecord | undefined> {
    if (typeof table !== 'string') {
      options = where;
      where = table;
      table = undefined;
    }
    // not use cache if specified table
    if (table && table !== this.table) {
      return await super.get(table, where, options);
    }
    // table
    table = table || this.table;
    if (!table) return this.scopeDatabase.error.ShouldSpecifyTable.throw();
    // check if cache
    if (!this.__cacheEnabled) {
      return await super.get(table, where, options);
    }
    if (cast(where).id && typeof cast(where).id === 'object') {
      // for example: id: { op: '<', val: flowNodeId },
      return await super.get(table, where, options);
    }
    if (!this.__checkCacheKeyValid(where)) {
      // not key
      if (this.__cacheNotKey) {
        return this.__filterGetColumns(await this.__get_notkey(table, where, options), options);
      }
      return await super.get(table, where, options);
    }
    // key
    return this.__filterGetColumns(await this.__get_key(table, where, options), options);
  }

  async update(data?: Partial<TRecord>, options?: IModelUpdateOptions<TRecord>): Promise<void>;
  async update(
    table: string,
    data?: Partial<TRecord>,
    options?: IModelUpdateOptions<TRecord>,
  ): Promise<void>;
  async update(table?, data?, options?): Promise<void> {
    if (typeof table !== 'string') {
      options = data;
      data = table;
      table = undefined;
    }
    // not use cache if specified table
    if (table && table !== this.table) {
      return await super.update(table, data, options);
    }
    // table
    table = table || this.table;
    if (!table) return this.scopeDatabase.error.ShouldSpecifyTable.throw();
    // check if cache
    if (!this.__cacheEnabled) {
      return await super.update(table, data, options);
    }
    // check where and get id
    let id;
    if (!options?.where) {
      if (data.id === undefined) {
        throw new Error('id should be specified for update method');
      }
      id = data.id;
    } else {
      const where = data.id !== undefined ? Object.assign({}, options?.where, { id: data.id }) : options?.where;
      options = Object.assign({}, options, { where: undefined });
      const items = await this.select(table, { where, columns: ['id'] }, options);
      if (items.length === 0) {
        // donothing
        return;
      }
      if (items.length === 1) {
        id = cast(items[0]).id;
      } else {
        id = items.map(item => cast(item).id);
      }
    }
    // update by id/ids
    options = Object.assign({}, options, { where: { id } });
    await super.update(table, data, options);
    // delete cache
    await this.__deleteCache_key(id);
  }

  async delete(where?: TypeModelWhere<TRecord>, options?: IModelMethodOptions): Promise<void>;
  async delete(
    table: string,
    where?: TypeModelWhere<TRecord>,
    options?: IModelMethodOptions,
  ): Promise<void>;
  async delete(table?, where?, options?): Promise<void> {
    if (typeof table !== 'string') {
      options = where;
      where = table;
      table = undefined;
    }
    // not use cache if specified table
    if (table && table !== this.table) {
      return await super.delete(table, where, options);
    }
    // table
    table = table || this.table;
    if (!table) return this.scopeDatabase.error.ShouldSpecifyTable.throw();
    // check if cache
    if (!this.__cacheEnabled) {
      return await super.delete(table, where, options);
    }
    // check where and get id
    const items = await this.select(table, { where, columns: ['id'] }, options);
    if (items.length === 0) {
      // donothing
      return;
    }
    let id;
    if (items.length === 1) {
      id = cast(items[0]).id;
    } else {
      id = items.map(item => cast(item).id);
    }
    // delete by id/ids
    await super.delete(table, { id } as any, options);
    // delete cache
    await this.__deleteCache_key(id);
  }

  private async __get_notkey(
    table: string,
    where?: TypeModelWhere<TRecord>,
    options?: IModelMethodOptions,
  ): Promise<TRecord | null | undefined> {
    // cache
    const cache = this.__cacheInstance;
    const cacheKey = { where, options };
    const data = await cache.get(cacheKey, {
      get: async () => {
        const options = Object.assign({}, cacheKey.options, { columns: ['id'] });
        return await super.get(table, cacheKey.where, options as any);
      },
      ignoreNull: true,
      db: this.db,
    });
    if (!data) return data;
    // check if exists and valid
    const data2 = await this.__get_key(table, { id: data.id } as any, options);
    if (data2 && this.__checkCacheNotKeyDataValid(where, data2)) {
      return data2 as TRecord;
    }
    // delete cache
    await this.__deleteCache_notkey(cacheKey);
    // get again
    return await this.__get_notkey(table, where, options);
  }

  private async __get_key(
    table: string,
    where?: TypeModelWhere<TRecord>,
    options?: IModelMethodOptions,
  ): Promise<TRecord | null | undefined> {
    // cache
    const cache = this.__cacheInstance;
    const item: TRecord | null | undefined = await cache.get(cast(where).id, {
      get: async () => {
        // where: maybe contain aux key
        // disableInstance: use the model options, not use options by outer
        return await super.get(table, where, { disableDeleted: true });
      },
      db: this.db,
    });
    if (!item) return item;
    if (!this._checkDisableDeletedByOptions(options) && cast<EntityBase>(item).deleted) return undefined;
    return item;
  }

  private __filterMGetColumns(items: any[], options?: IModelGetOptions<TRecord>) {
    if (items.length === 0 || !options?.columns) return items;
    return items.map(item => {
      return this.__filterGetColumns(item, options);
    });
  }

  private __filterGetColumns(data, options?: IModelGetOptions<TRecord>) {
    if (!data || !options?.columns) return data;
    let columns = options?.columns;
    if (!Array.isArray(columns)) columns = cast(columns).split(',');
    const data2 = {};
    for (let column of cast(columns)) {
      column = getTargetColumnName(column);
      if (column === '*') return data;
      if (data[column] !== undefined) {
        data2[column] = data[column];
      }
    }
    return data2;
  }

  private __checkCacheKeyValid(where) {
    let keys = Object.keys(where);
    if (this.__cacheKeyAux) {
      keys = keys.filter(item => item !== this.__cacheKeyAux);
    }
    return keys.length === 1 && keys[0] === 'id';
  }

  private __checkCacheNotKeyDataValid(where, data) {
    for (const key in where) {
      const a = where[key];
      const b = data[key];
      if (typeof a === 'string' || typeof b === 'string') {
        if (String(a).toLowerCase() !== String(b).toLowerCase()) return false;
      } else if (typeof a === 'boolean' || typeof b === 'boolean') {
        if (Boolean(a) !== Boolean(b)) return false;
      } else if (a === null || a === undefined || b === null || b === undefined) {
        if ((a || null) !== (b || null)) return false;
      } else {
        if (a !== b) return false;
      }
    }
    return true;
  }

  private async __deleteCache_key(id) {
    const cache = this.__cacheInstance;
    if (Array.isArray(id)) {
      await cache.mdel(id);
    } else {
      await cache.del(id);
    }
  }

  private async __deleteCache_notkey(cacheKey) {
    const cache = this.__cacheInstance;
    await cache.del(cacheKey);
  }

  private get __cacheInstance() {
    if (this.__cacheOptions === false) throw new Error('cache disabled');
    return this.app.bean.summer.cache<any, any>(this.__cacheName, this.__cacheOptions);
  }

  private __cacheOptionsInner() {
    if (this.options.cacheOptions === false) return false;
    // options
    let _cacheOptions = this.options.cacheOptions ?? {};
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

  private __cacheEnabledInner() {
    if (this.__cacheOptions === false) return false;
    // enable
    if (!this.bean.onion.checkOnionOptionsEnabled(this.__cacheOptions)) return false;
    // default
    return true;
  }
}
