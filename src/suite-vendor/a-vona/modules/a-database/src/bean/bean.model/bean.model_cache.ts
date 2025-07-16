import type { ServiceDb } from '../../service/db.ts';
import type {
  EntityBase,
  IDatabaseClientRecord,
  IModelClassRecord,
  IModelGetOptions,
  IModelMethodOptions,
  IModelMethodOptionsGeneral,
  IModelSelectParams,
  IModelUpdateOptions,
  ITableRecord,
  TableIdentity,
  TypeModelColumn,
  TypeModelColumns,
  TypeModelWhere,
} from '../../types/index.ts';
import { isNil } from '@cabloy/utils';
import { cast } from 'vona';
import { getTargetColumnName } from '../../common/utils.ts';
import { ServiceCacheEntity } from '../../service/cacheEntity.ts';
import { ServiceCacheQuery } from '../../service/cacheQuery.ts';
import { ServiceRelations } from '../../service/relations.ts';
import { BeanModelCrud } from './bean.model_crud.ts';

export class BeanModelCache<TRecord extends {} = {}> extends BeanModelCrud<TRecord> {
  public cacheQuery: ServiceCacheQuery;
  public cacheEntity: ServiceCacheEntity;
  protected relations: ServiceRelations;

  protected __init__(clientNameSelector?: keyof IDatabaseClientRecord | ServiceDb) {
    super.__init__(clientNameSelector);
    this.cacheQuery = this.bean._newBean(ServiceCacheQuery, this);
    this.cacheEntity = this.bean._newBean(ServiceCacheEntity, this);
    this.relations = this.bean._newBean(ServiceRelations, this);
  }

  async insert(data?: Partial<TRecord>, options?: IModelMethodOptionsGeneral): Promise<TRecord> {
    // table
    const table = this.getTable();
    if (!table) return this.scopeDatabase.error.ShouldSpecifyTable.throw();
    // insert
    const res = await this._batchInsert(table, data, options) as Promise<TRecord>;
    // clear cache
    await this.cacheQueryClear(table);
    return res;
  }

  async batchInsert(data: Partial<TRecord>[], options?: IModelMethodOptionsGeneral): Promise<TRecord[]> {
    // table
    const table = this.getTable();
    if (!table) return this.scopeDatabase.error.ShouldSpecifyTable.throw();
    // insert
    const res = await this._batchInsert(table, data, options) as Promise<TRecord[]>;
    // clear cache
    await this.cacheQueryClear(table);
    return res;
  }

  async mget<T extends IModelGetOptions<TRecord>>(ids: TableIdentity[], options?: T): Promise<TRecord[]> {
    const items = await this.__mget_raw(undefined, ids, options);
    return await this.relations.handleRelationsMany(items, options as any, options);
  }

  private async __mget_raw(table: keyof ITableRecord | undefined, ids: TableIdentity[], options?: IModelGetOptions<TRecord>): Promise<TRecord[]> {
    // table
    table = table || this.getTable();
    if (!table) return this.scopeDatabase.error.ShouldSpecifyTable.throw();
    // check if cache
    if (this._checkDisableCacheEntityByOptions(options)) {
      return (await super._mget(table, ids, options)) as TRecord[];
    }
    // cache
    const cache = this.cacheEntity.getInstance(table);
    let items = await cache.mget(ids, {
      mget: async ids => {
        return await super._mget_original(table, ids, { disableDeleted: true });
      },
      db: this.db,
    });
    // filter disableDeleted
    items = items.filter(item => {
      if (!item) return false;
      if (!this._checkDisableDeletedByOptions(options) && cast<EntityBase>(item).deleted) return false;
      return true;
    });
    return this.__filterMGetColumns(items, options?.columns);
  }

  async select<
    T extends IModelSelectParams<TRecord>,
    ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined,
  >(
    params?: T,
    options?: IModelMethodOptions,
    _modelJoins?: ModelJoins,
  ): Promise<TRecord[]> {
    const items = await this.__select_raw(undefined, params, options);
    return await this.relations.handleRelationsMany(items, params as any, options);
  }

  private async __select_raw(
    table: keyof ITableRecord | undefined,
    params?: IModelSelectParams<TRecord>,
    options?: IModelMethodOptions,
  ): Promise<TRecord[]> {
    // table
    table = table || this.getTable();
    if (!table) return this.scopeDatabase.error.ShouldSpecifyTable.throw();
    // check if cache
    if (this._checkDisableCacheEntityByOptions(options)) {
      return await this.__select_cache(table, params, options);
    }
    // 1: select id
    const columnId = `${table}.id`;
    const params2: IModelSelectParams<TRecord> = Object.assign({}, params, { columns: [columnId] });
    const items = await this.__select_cache(table, params2, options);
    if (items.length === 0) {
      // donothing
      return [] as TRecord[];
    }
    // 1: special check
    if (params?.columns) {
      const columnsTarget = Array.isArray(params?.columns) ? params?.columns : [params?.columns];
      if (this.__checkIfOnlyKey(columnsTarget, table)) {
        // just return
        return items;
      }
    }
    // 2: mget
    const ids = items.map(item => cast(item).id);
    const options2 = params?.columns ? Object.assign({}, options, { columns: params?.columns }) : options;
    return await this.__mget_raw(table, ids, options2);
  }

  private async __select_cache(table: keyof ITableRecord, params?: IModelSelectParams<TRecord>, options?: IModelMethodOptions): Promise<TRecord[]> {
    // check if cache
    if (this._checkDisableCacheQueryByOptions(options)) {
      return await super._select(table, params, options);
    }
    // builder
    const builder = this._select_buildParams(table, params, options);
    const sql = builder.toQuery();
    const key = { sql };
    // cache
    const cache = this.cacheQuery.getInstance(table);
    const items = await cache.get(key, {
      get: async () => {
        return await super._select(table, params, options);
      },
      db: this.db,
    });
    return items;
  }

  async get<T extends IModelGetOptions<TRecord>>(where: TypeModelWhere<TRecord>, options?: T): Promise<TRecord | undefined> {
    const item: TRecord | undefined = await this.__get_raw(undefined, where, options);
    return await this.relations.handleRelationsOne(item, options as any, options);
  }

  private async __get_raw(
    table: keyof ITableRecord | undefined,
    where: TypeModelWhere<TRecord>,
    options?: IModelGetOptions<TRecord>,
  ): Promise<TRecord | undefined> {
    // table
    table = table || this.getTable();
    if (!table) return this.scopeDatabase.error.ShouldSpecifyTable.throw();
    // check if cache
    if (this._checkDisableCacheEntityByOptions(options)) {
      return await super._get(table, where, options);
    }
    const id = this.__checkCacheKeyValid(where, table);
    if (isNil(id)) {
      // not key
      if (this._checkDisableCacheQueryByOptions(options)) {
        return await super._get(table, where, options);
      }
      // by cache query
      // params
      const params: IModelSelectParams<TRecord> = { where };
      if (options?.columns) {
        params.columns = options?.columns;
      }
      // select
      const options2 = options?.columns ? Object.assign({}, options, { columns: undefined }) : options;
      const items = await this.__select_raw(table, params, options2);
      return items[0];
    }
    // key
    return this.__filterGetColumns(await this.__get_key(id, table, where, options), options?.columns);
  }

  async update(data: Partial<TRecord>, options?: IModelUpdateOptions<TRecord>): Promise<void> {
    // table
    const table = this.getTable();
    if (!table) return this.scopeDatabase.error.ShouldSpecifyTable.throw();
    // check if cache
    if (this._checkDisableCacheEntityByOptions(options)) {
      return await super._update(table, data, options);
    }
    // check where and get id
    let id = this.__checkCacheKeyValid(data, table, true);
    if (!options?.where) {
      if (isNil(id)) {
        throw new Error('id should be specified for update method');
      }
      const id2 = this.__checkCacheKeyValid(data, table, false);
      if (!isNil(id2)) {
        // donothing
        return;
      }
    } else {
      const where = !isNil(id) ? Object.assign({}, options?.where, { id }) : options?.where;
      options = Object.assign({}, options, { where: undefined });
      const items = await this.__select_raw(table, { where, columns: ['id' as any] }, options);
      if (items.length === 0) {
        // donothing
        return;
      }
      if (items.length === 1) {
        id = cast(items[0]).id;
      } else {
        id = items.map(item => cast(item).id);
      }
      // update by id/ids
      options = Object.assign({}, options, { where: { id } });
    }
    await super._update(table, data, options);
    // delete cache
    await this.cacheEntityDel(id, table);
  }

  async delete(where?: TypeModelWhere<TRecord>, options?: IModelMethodOptions): Promise<void> {
    // table
    const table = this.getTable();
    if (!table) return this.scopeDatabase.error.ShouldSpecifyTable.throw();
    // check if cache
    if (this._checkDisableCacheEntityByOptions(options)) {
      return await super._delete(table, where, options);
    }
    // id
    let id = this.__checkCacheKeyValid(where, table);
    if (isNil(id)) {
      // check where and get id
      const items = await this.__select_raw(table, { where, columns: ['id' as any] }, options);
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
    // delete by id/ids
    await super._delete(table, { id } as any, options);
    // delete cache
    await this.cacheEntityDel(id, table);
  }

  private async __get_key(
    id: any,
    table: keyof ITableRecord,
    where: TypeModelWhere<TRecord>,
    options?: IModelMethodOptions,
  ): Promise<TRecord | null | undefined> {
    // cache
    const cache = this.cacheEntity.getInstance(table);
    const item: TRecord | null | undefined = await cache.get(id, {
      get: async () => {
        // where: maybe contain aux key
        // disableInstance: use the model options, not use options by outer
        return await super._get(table, where, { disableDeleted: true });
      },
      db: this.db,
    });
    if (!item) return item;
    if (!this._checkDisableDeletedByOptions(options) && cast<EntityBase>(item).deleted) return undefined;
    return item;
  }

  private __filterMGetColumns(items: any[], columns?: TypeModelColumns<TRecord>) {
    if (items.length === 0 || !columns) return items;
    return items.map(item => {
      return this.__filterGetColumns(item, columns);
    });
  }

  private __filterGetColumns(data, columns?: TypeModelColumns<TRecord>) {
    if (!data || !columns) return data;
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

  public async cacheEntityDel(id: TableIdentity | TableIdentity[], table?: keyof ITableRecord) {
    await this.cacheEntity.del(id, table);
    await this.cacheQueryClear(table);
  }

  public async cacheEntityClear(table?: keyof ITableRecord) {
    await this.cacheEntity.clear(table);
    await this.cacheQueryClear(table);
  }

  public async cacheQueryClear(table?: keyof ITableRecord) {
    await this.cacheQuery.clear(table);
    await this._cacheQueryClearModelsClear();
  }

  private async _cacheQueryClearModelsClear() {
    const modelsClear = this.options.cache?.modelsClear;
    if (!modelsClear) return;
    const modelsClear2 = Array.isArray(modelsClear) ? modelsClear : [modelsClear];
    for (const modelClear of modelsClear2) {
      const modelTarget = this.newInstanceTarget(modelClear) as typeof this;
      await modelTarget.cacheQueryClear();
    }
  }

  protected _checkDisableCacheQueryByOptions(options?: IModelMethodOptionsGeneral) {
    if (options?.disableCacheQuery === true || options?.disableCacheQuery === false) {
      return options?.disableCacheQuery;
    }
    return !this.cacheQuery.enabled;
  }

  protected _checkDisableCacheEntityByOptions(options?: IModelMethodOptionsGeneral) {
    if (options?.disableCacheEntity === true || options?.disableCacheEntity === false) {
      return options?.disableCacheEntity;
    }
    return !this.cacheEntity.enabled;
  }

  private __checkIfOnlyKey(keys: (string | TypeModelColumn<TRecord>)[], table: keyof ITableRecord, noCheckLength?: boolean): string | false {
    const columnId = `${table}.id`;
    if (!noCheckLength) {
      const keysAux = this.cacheEntity.keysAux;
      if (keysAux) {
        const keysAux2 = Array.isArray(keysAux) ? keysAux : [keysAux];
        keys = keys.filter(item => !keysAux2.includes(String(item)));
      }
      if (keys.length !== 1) return false;
      if (keys[0] === 'id') return 'id';
      if (keys[0] === columnId) return columnId;
      return false;
    } else {
      if (keys.includes('id')) return 'id';
      if (keys.includes(columnId)) return columnId;
      return false;
    }
  }

  private __checkCacheKeyValid(where: {} | undefined, table: keyof ITableRecord, noCheckLength?: boolean) {
    if (!where) return undefined;
    const columnId = this.__checkIfOnlyKey(Object.keys(where), table, noCheckLength);
    if (!columnId) return undefined;
    return ['number', 'string', 'bigint'].includes(typeof where[columnId])
      ? where[columnId]
      : undefined;
  }
}

// private async __deleteCache_notkey(cacheKey, table: keyof ITableRecord) {
//   const cache = this.cacheEntity.getInstance(table);
//   await cache.del(cacheKey);
// }

// private async __get_notkey(
//   table: keyof ITableRecord,
//   where: TypeModelWhere<TRecord>,
//   options?: IModelMethodOptions,
// ): Promise<TRecord | null | undefined> {
//   // cache
//   const cache = this.cacheEntity.getInstance(table);
//   const cacheKey = { where, options };
//   const data = await cache.get(cacheKey, {
//     get: async () => {
//       const options = Object.assign({}, cacheKey.options, { columns: ['id'] });
//       return await super._get(table, cacheKey.where, options as any);
//     },
//     ignoreNull: true,
//     db: this.db,
//   });
//   if (!data) return data;
//   // check if exists and valid
//   const data2 = await this.__get_key(table, { id: data.id } as any, options);
//   if (data2 && this.__checkCacheNotKeyDataValid(where, data2)) {
//     return data2 as TRecord;
//   }
//   // delete cache
//   await this.__deleteCache_notkey(cacheKey, table);
//   // get again
//   return await this.__get_notkey(table, where, options);
// }

// private __checkCacheNotKeyDataValid(where, data) {
//   for (const key in where) {
//     const a = where[key];
//     const b = data[key];
//     if (typeof a === 'string' || typeof b === 'string') {
//       if (String(a).toLowerCase() !== String(b).toLowerCase()) return false;
//     } else if (typeof a === 'boolean' || typeof b === 'boolean') {
//       if (Boolean(a) !== Boolean(b)) return false;
//     } else if (a === null || a === undefined || b === null || b === undefined) {
//       if ((a || null) !== (b || null)) return false;
//     } else {
//       if (a !== b) return false;
//     }
//   }
//   return true;
// }
