import type { ServiceDb } from '../../service/db.ts';
import type {
  EntityBase,
  IDatabaseClientRecord,
  IModelClassRecord,
  IModelGetOptions,
  IModelMethodOptions,
  IModelSelectParams,
  IModelUpdateOptions,
  ITableRecord,
  TableIdentity,
  TypeModelColumns,
  TypeModelWhere,
} from '../../types/index.ts';
import { cast } from 'vona';
import { getTargetColumnName } from '../../common/utils.ts';
import { ServiceCacheEntity } from '../../service/cacheEntity.ts';
import { BeanModelCrud } from './bean.model_crud.ts';

export class BeanModelCache<TRecord extends {} = {}> extends BeanModelCrud<TRecord> {
  public cacheEntity: ServiceCacheEntity;

  protected __init__(clientNameSelector?: keyof IDatabaseClientRecord | ServiceDb) {
    super.__init__(clientNameSelector);
    this.cacheEntity = this.bean._newBean(ServiceCacheEntity, this);
  }

  private get __cacheKeyAux() {
    return this.options.cacheKeyAux;
  }

  private get __cacheNotKey() {
    return this.options.cacheNotKey !== false;
  }

  async mget<T extends IModelGetOptions<TRecord>>(ids: TableIdentity[], options?: T): Promise<TRecord[]> {
    const items = await this.__mget_raw(ids, options);
    return await this.$scope.database.service.relations.handleRelationsMany(items, this, options as any, options);
  }

  private async __mget_raw(ids: TableIdentity[], options?: IModelGetOptions<TRecord>): Promise<TRecord[]> {
    // table
    const table = this.getTable('mget', [ids], options);
    if (!table) return this.scopeDatabase.error.ShouldSpecifyTable.throw();
    // check if cache
    if (!this.cacheEntity.enabled) {
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
    const items = await this.__select_raw(params, options);
    return await this.$scope.database.service.relations.handleRelationsMany(items, this, params as any, options);
  }

  private async __select_raw(params?: IModelSelectParams<TRecord>, options?: IModelMethodOptions): Promise<TRecord[]> {
    // table
    const table = this.getTable('select', [params], options);
    if (!table) return this.scopeDatabase.error.ShouldSpecifyTable.throw();
    // check if cache
    if (!this.cacheEntity.enabled) {
      return await super._select(table, params, options);
    }
    // 1: select id
    const columnId = `${table}.id`;
    const params2: IModelSelectParams<TRecord> = Object.assign({}, params, { columns: [columnId] });
    const items = await super._select(table, params2, options);
    if (items.length === 0) {
      // donothing
      return [] as TRecord[];
    }
    // 2: mget
    const ids = items.map(item => cast(item).id);
    const options2 = params?.columns ? Object.assign({}, options, { columns: params?.columns }) : options;
    return await this.__mget_raw(ids, options2);
  }

  async get<T extends IModelGetOptions<TRecord>>(where: TypeModelWhere<TRecord>, options?: T): Promise<TRecord | undefined> {
    const item: TRecord | undefined = await this.__get_raw(where, options);
    return await this.$scope.database.service.relations.handleRelationsOne(item, this, options as any, options);
  }

  private async __get_raw(where: TypeModelWhere<TRecord>, options?: IModelGetOptions<TRecord>): Promise<TRecord | undefined> {
    // table
    const table = this.getTable('get', [where], options);
    if (!table) return this.scopeDatabase.error.ShouldSpecifyTable.throw();
    // check if cache
    if (!this.cacheEntity.enabled) {
      return await super._get(table, where, options);
    }
    if (cast(where).id && typeof cast(where).id === 'object') {
      // for example: id: { op: '<', val: flowNodeId },
      return await super._get(table, where, options);
    }
    if (!this.__checkCacheKeyValid(where)) {
      // not key
      if (this.__cacheNotKey) {
        return this.__filterGetColumns(await this.__get_notkey(table, where, options), options?.columns);
      }
      return await super._get(table, where, options);
    }
    // key
    return this.__filterGetColumns(await this.__get_key(table, where, options), options?.columns);
  }

  async update(data?: Partial<TRecord>, options?: IModelUpdateOptions<TRecord>): Promise<void> {
    // table
    const table = this.getTable('update', [data], options);
    if (!table) return this.scopeDatabase.error.ShouldSpecifyTable.throw();
    // check if cache
    if (!this.cacheEntity.enabled) {
      return await super._update(table, data, options);
    }
    // check where and get id
    let id;
    if (!options?.where) {
      if (cast(data).id === undefined) {
        throw new Error('id should be specified for update method');
      }
      id = cast(data).id;
    } else {
      const where = cast(data).id !== undefined ? Object.assign({}, options?.where, { id: cast(data).id }) : options?.where;
      options = Object.assign({}, options, { where: undefined });
      const items = await this.__select_raw({ where, columns: ['id' as any] }, options);
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
    await super._update(table, data, options);
    // delete cache
    await this.__deleteCache_key(id, table);
  }

  async delete(where?: TypeModelWhere<TRecord>, options?: IModelMethodOptions): Promise<void> {
    // table
    const table = this.getTable('delete', [where], options);
    if (!table) return this.scopeDatabase.error.ShouldSpecifyTable.throw();
    // check if cache
    if (!this.cacheEntity.enabled) {
      return await super._delete(table, where, options);
    }
    // check where and get id
    const items = await this.__select_raw({ where, columns: ['id' as any] }, options);
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
    await super._delete(table, { id } as any, options);
    // delete cache
    await this.__deleteCache_key(id, table);
  }

  private async __get_notkey(
    table: keyof ITableRecord,
    where: TypeModelWhere<TRecord>,
    options?: IModelMethodOptions,
  ): Promise<TRecord | null | undefined> {
    // cache
    const cache = this.cacheEntity.getInstance(table);
    const cacheKey = { where, options };
    const data = await cache.get(cacheKey, {
      get: async () => {
        const options = Object.assign({}, cacheKey.options, { columns: ['id'] });
        return await super._get(table, cacheKey.where, options as any);
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
    await this.__deleteCache_notkey(cacheKey, table);
    // get again
    return await this.__get_notkey(table, where, options);
  }

  private async __get_key(
    table: keyof ITableRecord,
    where: TypeModelWhere<TRecord>,
    options?: IModelMethodOptions,
  ): Promise<TRecord | null | undefined> {
    // cache
    const cache = this.cacheEntity.getInstance(table);
    const item: TRecord | null | undefined = await cache.get(cast(where).id, {
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

  private async __deleteCache_key(id: TableIdentity | TableIdentity[], table?: keyof ITableRecord) {
    await this.cacheEntity.del(id,table);
  }

  private async __deleteCache_notkey(cacheKey, table: keyof ITableRecord) {
    const cache = this.cacheEntity.getInstance(table);
    await cache.del(cacheKey);
  }
}
