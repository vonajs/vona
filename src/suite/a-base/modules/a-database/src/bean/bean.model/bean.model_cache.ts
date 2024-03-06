import { Cast } from '@cabloy/core';
import { BeanModel } from '../virtual.model.js';
import { IModelMethodOptions, IModelUpdateOptions } from '../../types.js';

export class BeanModelCache<TRecord extends {}> extends BeanModel<TRecord> {
  private get __cacheName() {
    const cache = this.options.cache || { module: '', name: '' };
    const moduleName = cache.module || this.moduleBelong;
    const cacheName = cache.name || this.__beanOptions?.name;
    return { module: moduleName, name: `model:${cacheName}` };
  }

  private get __cacheKeyAux() {
    return this.options.cacheKeyAux;
  }

  private get __cacheNotKey() {
    return this.options.cacheNotKey !== false;
  }

  async clearCache() {
    if (!this.__cacheExists()) return;
    await this.ctx.bean.summer.clear(this.__cacheName);
  }

  async mget<TRecord2 extends {} = TRecord, TResult2 = TRecord2>(
    ids: number[],
    options?: IModelMethodOptions,
  ): Promise<TResult2[]> {
    if (!this.__cacheExists()) {
      return (await this.__mget_select(false, ids, options)) as TResult2[];
    }
    // cache
    const cache = this.__getCacheInstance();
    let list = await cache.mget(ids, {
      fn_mget: async ids => {
        return await this.__mget_select(true, ids, { disableDeleted: true });
      },
    });
    // filter disableDeleted
    list = list.filter(item => {
      if (!item) return false;
      if (!this._checkDisableDeletedByOptions(options) && Cast(item).deleted === 1) return false;
      return true;
    });
    return list;
  }

  async get<TRecord2 extends {} = TRecord, TResult2 = TRecord2>(
    where?: object,
    options?: IModelMethodOptions,
  ): Promise<TResult2 | undefined>;
  async get<TRecord2 extends {} = TRecord, TResult2 = TRecord2>(
    table: string,
    where?: object,
    options?: IModelMethodOptions,
  ): Promise<TResult2 | undefined>;
  async get<TRecord2 extends {} = TRecord, TResult2 = TRecord2>(
    table?,
    where?,
    options?,
  ): Promise<TResult2 | undefined> {
    if (typeof table !== 'string') {
      table = undefined;
      options = where;
      where = table;
    }
    // not use cache if specified table
    if (table) {
      return await super.get(table, where, options);
    }
    // table
    table = table || this.table;
    if (!table) throw new Error('should specify the table name');
    // check if cache
    if (!this.__cacheExists()) {
      return await super.get(table, where, options);
    }
    if (where.id && typeof where.id === 'object') {
      // for example: id: { op: '<', val: flowNodeId },
      return await super.get(table, where, options);
    }
    if (!this.__checkCacheKeyValid(where)) {
      // not key
      if (this.__cacheNotKey) {
        return await this.__get_notkey(table, where, options);
      }
      return await super.get(table, where, options);
    }
    // key
    return await this.__get_key(table, where, options);
  }

  async update<TRecord2 extends {} = TRecord>(data?: Partial<TRecord2>, options?: IModelUpdateOptions): Promise<void>;
  async update<TRecord2 extends {} = TRecord>(
    table: string,
    data?: Partial<TRecord2>,
    options?: IModelUpdateOptions,
  ): Promise<void>;
  async update<TRecord2 extends {} = TRecord>(table?, data?, options?): Promise<void> {
    if (typeof table !== 'string') {
      table = undefined;
      options = data;
      data = table;
    }
    // not use cache if specified table
    if (table) {
      return await super.update(table, data, options);
    }
    // table
    table = table || this.table;
    if (!table) throw new Error('should specify the table name');
    // check if cache
    if (!this.__cacheExists()) {
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
      const items = await this.select<TRecord2>(table, { where, columns: ['id'] }, options);
      if (items.length === 0) {
        // donothing
        return;
      }
      if (items.length === 1) {
        id = Cast(items[0]).id;
      } else {
        id = items.map(item => Cast(item).id);
      }
    }
    // update by id/ids
    options = Object.assign({}, options, { where: { id } });
    await super.update(table, data, options);
    // delete cache
    await this.__deleteCache_key(id);
  }

  async delete<TRecord2 extends {} = TRecord>(where?: Partial<TRecord2>, options?: IModelMethodOptions): Promise<void>;
  async delete<TRecord2 extends {} = TRecord>(
    table: string,
    where?: Partial<TRecord2>,
    options?: IModelMethodOptions,
  ): Promise<void>;
  async delete<TRecord2 extends {} = TRecord>(table?, where?, options?): Promise<void> {
    if (typeof table !== 'string') {
      table = undefined;
      options = where;
      where = table;
    }
    // not use cache if specified table
    if (table) {
      return await super.delete(table, where, options);
    }
    // table
    table = table || this.table;
    if (!table) throw new Error('should specify the table name');
    // check if cache
    if (!this.__cacheExists()) {
      return await super.delete(table, where, options);
    }
    // check where and get id
    const items = await this.select<TRecord2>(table, { where, columns: ['id'] }, options);
    if (items.length === 0) {
      // donothing
      return;
    }
    let id;
    if (items.length === 1) {
      id = Cast(items[0]).id;
    } else {
      id = items.map(item => Cast(item).id);
    }
    // delete by id/ids
    await super.delete(table, { id }, options);
    // delete cache
    await this.__deleteCache_key(id);
  }

  private async __mget_select<TRecord2 extends {} = TRecord, TResult2 = TRecord2>(
    sort: boolean,
    ids: number[],
    options?: IModelMethodOptions,
  ): Promise<(TResult2 | undefined)[]> {
    // select
    const items = await this.select<TRecord2, TResult2>(
      {
        where: {
          id: ids,
        },
      },
      options,
    );
    // sort
    if (!sort) return items;
    const result: (TResult2 | undefined)[] = [];
    for (const id of ids) {
      // item maybe undefined
      result.push(items.find(item => Cast(item).id === id));
    }
    return result;
  }

  private async __get_notkey<TRecord2 extends {} = TRecord, TResult2 = TRecord2>(
    table: string,
    where: object,
    options?: IModelMethodOptions,
  ): Promise<TResult2 | undefined> {
    // cache
    const cache = this.__getCacheInstance();
    const cacheKey = { where, options };
    const data = await cache.get(cacheKey, {
      fn_get: async () => {
        const options = Object.assign({}, cacheKey.options, { columns: ['id'] });
        return await super.get(table, cacheKey.where, options);
      },
      ignoreNull: true,
    });
    if (!data) return data;
    // check if exists and valid
    const data2 = await this.__get_key(table, { id: data.id }, options);
    if (data2 && this.__checkCacheNotKeyDataValid(where, data2)) {
      return data2 as TResult2;
    }
    // delete cache
    await this.__deleteCache_notkey(cacheKey);
    // get again
    return await this.__get_notkey(table, where, options);
  }

  private async __get_key<TRecord2 extends {} = TRecord, TResult2 = TRecord2>(
    table: string,
    where: { id: number },
    options?: IModelMethodOptions,
  ): Promise<TResult2 | undefined> {
    // cache
    const cache = this.__getCacheInstance();
    const item: TResult2 | undefined = await cache.get(where.id, {
      fn_get: async () => {
        // where: maybe contain aux key
        // disableInstance: use the model options, not use options by outer
        return await super.get(table, where, { disableDeleted: true });
      },
    });
    if (!item) return item;
    if (!this._checkDisableDeletedByOptions(options) && Cast(item).deleted === 1) return undefined;
    return item;
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
    const cache = this.__getCacheInstance();
    if (Array.isArray(id)) {
      await cache.mdel(id);
    } else {
      await cache.del(id);
    }
  }

  private async __deleteCache_notkey(cacheKey) {
    const cache = this.__getCacheInstance();
    await cache.del(cacheKey);
  }

  private __getCacheInstance() {
    return this.ctx.bean.summer.getCache(this.__cacheName);
  }

  private __cacheExists() {
    if (!this.__cacheName) return false;
    const cachaBase = this.ctx.bean.summer._findCacheBase({
      module: this.__cacheName.module,
      name: this.__cacheName.name,
    });
    return !!cachaBase && cachaBase.enable !== false;
  }
}
