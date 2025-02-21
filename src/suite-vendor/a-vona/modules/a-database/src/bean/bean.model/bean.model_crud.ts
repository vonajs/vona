import type { Knex } from 'knex';
import type {
  IModelCountParams,
  IModelGetOptionsGeneral,
  IModelMethodOptionsGeneral,
  IModelSelectParams,
  IModelUpdateOptionsGeneral,
  TableIdentity,
} from '../../types/index.ts';
import { BigNumber } from 'bignumber.ts';
import { cast } from 'vona';
import { BeanModelView } from './bean.model_view.ts';

export class BeanModelCrud<TRecord extends {}> extends BeanModelView<TRecord> {
  /** not hold undefined item if not exists */
  async mget<TRecord2 extends {} = TRecord, TResult2 = TRecord2>(
    ids: (TableIdentity | object)[],
    options?: IModelGetOptionsGeneral,
  ): Promise<(TResult2 | undefined)[]>;
  async mget<TRecord2 extends {} = TRecord, TResult2 = TRecord2>(
    table: string,
    ids: (TableIdentity | object)[],
    options?: IModelGetOptionsGeneral,
  ): Promise<(TResult2 | undefined)[]>;
  async mget<TRecord2 extends {} = TRecord, TResult2 = TRecord2>(
    table?,
    ids?,
    options?,
  ): Promise<(TResult2 | undefined)[]> {
    // mget
    const items = await this._mget<TRecord2, TResult2>(table, ids, options);
    // filter
    return items.filter(item => !!item);
  }

  /** hold undefined item if not exists */
  protected async _mget<TRecord2 extends {} = TRecord, TResult2 = TRecord2>(
    table?,
    ids?,
    options?,
  ): Promise<(TResult2 | undefined)[]> {
    if (typeof table !== 'string') {
      options = ids;
      ids = table;
      table = undefined;
    }
    // table
    table = table || this.table;
    if (!table) return this.scopeDatabase.error.ShouldSpecifyTable.throw();
    // ids maybe empty
    if (ids.length === 0) return [];
    // ids maybe object[]
    if (typeof ids[0] === 'object') {
      const result: (TResult2 | undefined)[] = [];
      for (const id of ids) {
        // get from db directly
        // item maybe undefined
        const item = await this._get<TRecord2, TResult2>(id as object);
        result.push(item);
      }
      return result;
    }
    // params
    const params: IModelSelectParams = {
      where: {
        id: ids,
      },
    };
    if (options?.columns) {
      params.columns = options?.columns;
    }
    // select
    const options2 = options?.columns ? Object.assign({}, options, { columns: undefined }) : options;
    const items = await this._select<TRecord2, TResult2>(table, params, options2);
    // sort
    const result: (TResult2 | undefined)[] = [];
    for (const id of ids) {
      // item maybe undefined
      result.push(items.find(item => cast(item).id === id));
    }
    return result;
  }

  async select<TRecord2 extends {} = TRecord, TResult2 = TRecord2>(
    params?: IModelSelectParams,
    options?: IModelMethodOptionsGeneral,
  ): Promise<TResult2[]>;
  async select<TRecord2 extends {} = TRecord, TResult2 = TRecord2>(
    table: string,
    params?: IModelSelectParams,
    options?: IModelMethodOptionsGeneral,
  ): Promise<TResult2[]>;
  async select<TRecord2 extends {} = TRecord, TResult2 = TRecord2>(table?, params?, options?): Promise<TResult2[]> {
    return await this._select<TRecord2, TResult2>(table, params, options);
  }

  protected async _select<TRecord2 extends {} = TRecord, TResult2 = TRecord2>(
    table?,
    params?,
    options?,
  ): Promise<TResult2[]> {
    if (typeof table !== 'string') {
      options = params;
      params = table;
      table = undefined;
    }
    // table
    table = table || this.table;
    if (!table) return this.scopeDatabase.error.ShouldSpecifyTable.throw();
    // params
    params = params || {};
    // table alias
    table = params.alias ? `${table} as ${params.alias}` : table;
    // builder
    const builder = this.builder<TRecord2, TResult2>(table);
    // columns
    builder.select(params.columns);
    // distinct
    this.buildDistinct(builder, params.distinct);
    // joins
    this.buildJoins(builder, params.joins);
    // where
    const wheres = this.prepareWhere(builder, table, params.where, options);
    if (wheres === false) {
      return [] as TResult2[];
    }
    // orders
    this.buildOrders(builder, params.orders);
    // limit
    this.buildLimit(builder, params.limit);
    // offset
    this.buildOffset(builder, params.offset);
    // page
    this.buildPage(builder, params.page);
    // ready
    const debug = this.app.bean.debug.get('model');
    if (debug.enabled) debug('model.select: %s', builder.toQuery());
    return (await builder) as TResult2[];
  }

  async get<TRecord2 extends {} = TRecord, TResult2 = TRecord2>(
    where?: object,
    options?: IModelGetOptionsGeneral,
  ): Promise<TResult2 | undefined>;
  async get<TRecord2 extends {} = TRecord, TResult2 = TRecord2>(
    table: string,
    where?: object,
    options?: IModelGetOptionsGeneral,
  ): Promise<TResult2 | undefined>;
  async get<TRecord2 extends {} = TRecord, TResult2 = TRecord2>(
    table?,
    where?,
    options?,
  ): Promise<TResult2 | undefined> {
    return await this._get<TRecord2, TResult2>(table, where, options);
  }

  protected async _get<TRecord2 extends {} = TRecord, TResult2 = TRecord2>(
    table?,
    where?,
    options?,
  ): Promise<TResult2 | undefined> {
    if (typeof table !== 'string') {
      options = where;
      where = table;
      table = undefined;
    }
    // table
    table = table || this.table;
    if (!table) return this.scopeDatabase.error.ShouldSpecifyTable.throw();
    // params
    const params: IModelSelectParams = { where, limit: 1 };
    if (options?.columns) {
      params.columns = options?.columns;
    }
    // select
    const items = await this._select(table, params, options);
    const item = items[0];
    if (!item) return undefined;
    return item as unknown as TResult2;
  }

  async count(params?: IModelCountParams, options?: IModelMethodOptionsGeneral): Promise<BigNumber>;
  async count(table: string, params?: IModelCountParams, options?: IModelMethodOptionsGeneral): Promise<BigNumber>;
  async count<TRecord2 extends {} = TRecord>(table?, params?, options?): Promise<BigNumber> {
    if (typeof table !== 'string') {
      options = params;
      params = table;
      table = undefined;
    }
    // table
    table = table || this.table;
    if (!table) return this.scopeDatabase.error.ShouldSpecifyTable.throw();
    // params
    params = params || {};
    // table alias
    table = params.alias ? `${table} as ${params.alias}` : table;
    // builder
    const builder = this.builder<TRecord2>(table);
    // count
    this.buildCount(builder, params.count, params.distinct);
    // joins
    this.buildJoins(builder, params.joins);
    // where
    const wheres = this.prepareWhere(builder, table, params.where, options);
    if (wheres === false) {
      return BigNumber(0);
    }
    // ready
    const debug = this.app.bean.debug.get('model');
    if (debug.enabled) debug('model.count: %s', builder.toQuery());
    const res = await builder;
    return this.extractCount(res);
  }

  async insert<TRecord2 extends {} = TRecord>(
    data?: Partial<TRecord2> | Partial<TRecord2>[],
    options?: IModelMethodOptionsGeneral,
  ): Promise<TableIdentity[]>;
  async insert<TRecord2 extends {} = TRecord>(
    table: string,
    data?: Partial<TRecord2> | Partial<TRecord2>[],
    options?: IModelMethodOptionsGeneral,
  ): Promise<TableIdentity[]>;
  async insert<TRecord2 extends {} = TRecord>(table?, data?, options?): Promise<TableIdentity[]> {
    if (typeof table !== 'string') {
      options = data;
      data = table;
      table = undefined;
    }
    // table
    table = table || this.table;
    if (!table) return this.scopeDatabase.error.ShouldSpecifyTable.throw();
    // data
    data = data || {};
    const datas = Array.isArray(data) ? data : [data];
    // options
    for (const data of datas) {
      this._prepareInsertDataByOptions(data, options);
    }
    // builder
    const builder = this.builder<TRecord2>(table);
    // insert
    builder.insert(datas as unknown as any);
    // debug
    const debug = this.app.bean.debug.get('model');
    if (debug.enabled) debug('model.insert: %s', builder.toQuery());
    // dialect
    return await this.dialect.insert(builder);
  }

  async update<TRecord2 extends {} = TRecord>(
    data?: Partial<TRecord2>,
    options?: IModelUpdateOptionsGeneral,
  ): Promise<void>;
  async update<TRecord2 extends {} = TRecord>(
    table: string,
    data?: Partial<TRecord2>,
    options?: IModelUpdateOptionsGeneral,
  ): Promise<void>;
  async update<TRecord2 extends {} = TRecord>(table?, data?, options?): Promise<void> {
    if (typeof table !== 'string') {
      options = data;
      data = table;
      table = undefined;
    }
    // table
    table = table || this.table;
    if (!table) return this.scopeDatabase.error.ShouldSpecifyTable.throw();
    // data
    data = Object.assign({}, data);
    // where
    const where = Object.assign({}, options?.where);
    // id
    if (data.id) {
      where.id = data.id;
      delete data.id;
    }
    // disableUpdateTime
    if (!this._checkDisableUpdateTimeByOptions(options)) {
      data.updatedAt = new Date();
    }
    // builder
    const builder = this.builder<TRecord2>(table);
    // update
    builder.update(data);
    // where
    const wheres = this.prepareWhere(builder, table, where, options);
    if (wheres === false) {
      // do nothing
      return;
    }
    // debug
    const debug = this.app.bean.debug.get('model');
    if (debug.enabled) debug('model.update: %s', builder.toQuery());
    // ready
    await builder;
  }

  async delete<TRecord2 extends {} = TRecord>(
    where?: Partial<TRecord2>,
    options?: IModelMethodOptionsGeneral,
  ): Promise<void>;
  async delete<TRecord2 extends {} = TRecord>(
    table: string,
    where?: Partial<TRecord2>,
    options?: IModelMethodOptionsGeneral,
  ): Promise<void>;
  async delete<TRecord2 extends {} = TRecord>(table?, where?, options?): Promise<void> {
    if (typeof table !== 'string') {
      options = where;
      where = table;
      table = undefined;
    }
    // table
    table = table || this.table;
    if (!table) return this.scopeDatabase.error.ShouldSpecifyTable.throw();
    // disableDeleted
    if (!this._checkDisableDeletedByOptions(options)) {
      // todo: deleted to true
      await this.update(table, { deleted: 1 }, Object.assign({}, options, { where }));
      return;
    }
    // builder
    const builder = this.builder<TRecord2>(table);
    // delete
    builder.delete();
    // where
    const wheres = this.prepareWhere(builder, table, where, options);
    if (wheres === false) {
      // do nothing
      return;
    }
    // debug
    const debug = this.app.bean.debug.get('model');
    if (debug.enabled) debug('model.delete: %s', builder.toQuery());
    // ready
    await builder;
  }

  async query<TRecord2 extends {} = TRecord, TResult2 = TRecord2>(value: Knex.Value): Promise<TResult2[]>;
  async query<TRecord2 extends {} = TRecord, TResult2 = TRecord2>(
    sql: string,
    binding: Knex.RawBinding,
  ): Promise<TResult2[]>;
  async query<TRecord2 extends {} = TRecord, TResult2 = TRecord2>(
    sql: string,
    bindings: readonly Knex.RawBinding[] | Knex.ValueDict,
  ): Promise<TResult2[]>;
  async query<TRecord2 extends {} = TRecord, TResult2 = TRecord2>(sql, bindings?): Promise<TResult2[]> {
    const raw = this.ctx.db.raw(sql, bindings);
    const result = await raw;
    // dialect
    return this.dialect.query(result) as unknown as TResult2[];
  }

  async queryOne<TRecord2 extends {} = TRecord, TResult2 = TRecord2>(value: Knex.Value): Promise<TResult2 | undefined>;
  async queryOne<TRecord2 extends {} = TRecord, TResult2 = TRecord2>(
    sql: string,
    binding: Knex.RawBinding,
  ): Promise<TResult2 | undefined>;
  async queryOne<TRecord2 extends {} = TRecord, TResult2 = TRecord2>(
    sql: string,
    bindings: readonly Knex.RawBinding[] | Knex.ValueDict,
  ): Promise<TResult2 | undefined>;
  async queryOne<TRecord2 extends {} = TRecord, TResult2 = TRecord2>(sql, bindings?): Promise<TResult2 | undefined> {
    const res = await this.query(sql, bindings);
    return res[0] as unknown as TResult2 | undefined;
  }
}
