import type { Knex } from 'knex';
import type {
  IModelCountParams,
  IModelGetOptionsGeneral,
  IModelMethodOptionsGeneral,
  IModelSelectParams,
  IModelUpdateOptionsGeneral,
  TableIdentity,
  TypeModelWhere,
} from '../../types/index.ts';
import { BigNumber } from 'bignumber.js';
import { cast } from 'vona';
import { BeanModelView } from './bean.model_view.ts';

export class BeanModelCrud<TRecord extends {}> extends BeanModelView<TRecord> {
  /** not hold undefined item if not exists */
  async mget(
    ids: (TableIdentity | object)[],
    options?: IModelGetOptionsGeneral<TRecord>,
  ): Promise<(TRecord | undefined)[]>;
  async mget(
    table: string,
    ids: (TableIdentity | object)[],
    options?: IModelGetOptionsGeneral<TRecord>,
  ): Promise<(TRecord | undefined)[]>;
  async mget(
    table?,
    ids?,
    options?,
  ): Promise<(TRecord | undefined)[]> {
    // mget
    const items = await this._mget(table, ids, options);
    // filter
    return items.filter(item => !!item);
  }

  /** hold undefined item if not exists */
  protected async _mget(
    table?,
    ids?,
    options?,
  ): Promise<(TRecord | undefined)[]> {
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
      const result: (TRecord | undefined)[] = [];
      for (const id of ids) {
        // get from db directly
        // item maybe undefined
        const item = await this._get(id as object);
        result.push(item);
      }
      return result;
    }
    // params
    const params: IModelSelectParams<TRecord> = {
      where: {
        id: ids,
      } as any,
    };
    if (options?.columns) {
      params.columns = options?.columns;
    }
    // select
    const options2 = options?.columns ? Object.assign({}, options, { columns: undefined }) : options;
    const items = await this._select(table, params, options2);
    // sort
    const result: (TRecord | undefined)[] = [];
    for (const id of ids) {
      // item maybe undefined
      result.push(items.find(item => cast(item).id === id));
    }
    return result;
  }

  async select(
    params?: IModelSelectParams<TRecord>,
    options?: IModelMethodOptionsGeneral,
  ): Promise<TRecord[]>;
  async select(
    table: string,
    params?: IModelSelectParams<TRecord>,
    options?: IModelMethodOptionsGeneral,
  ): Promise<TRecord[]>;
  async select(table?, params?, options?): Promise<TRecord[]> {
    return await this._select(table, params, options);
  }

  protected async _select(
    table?,
    params?,
    options?,
  ): Promise<TRecord[]> {
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
    const builder = this.builder<TRecord, TRecord>(table);
    // columns
    builder.select(params.columns);
    // distinct
    this.buildDistinct(builder, params.distinct);
    // joins
    this.buildJoins(builder, params.joins);
    // where
    const wheres = this.prepareWhere(builder, table, params.where, options);
    if (wheres === false) {
      return [] as TRecord[];
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
    this.$loggerChild('model').debug('model.select: %s', builder.toQuery());
    return (await builder) as TRecord[];
  }

  async get(
    where?: TypeModelWhere<TRecord>,
    options?: IModelGetOptionsGeneral<TRecord>,
  ): Promise<TRecord | undefined>;
  async get(
    table: string,
    where?: TypeModelWhere<TRecord>,
    options?: IModelGetOptionsGeneral<TRecord>,
  ): Promise<TRecord | undefined>;
  async get(
    table?,
    where?: TypeModelWhere<TRecord>,
    options?: IModelGetOptionsGeneral<TRecord>,
  ): Promise<TRecord | undefined> {
    return await this._get(table, where, options);
  }

  protected async _get(
    table?,
    where?: TypeModelWhere<TRecord>,
    options?: IModelGetOptionsGeneral<TRecord>,
  ): Promise<TRecord | undefined> {
    if (typeof table !== 'string') {
      options = where;
      where = table;
      table = undefined;
    }
    // table
    table = table || this.table;
    if (!table) return this.scopeDatabase.error.ShouldSpecifyTable.throw();
    // params
    const params: IModelSelectParams<TRecord> = { where, limit: 1 };
    if (options?.columns) {
      params.columns = options?.columns;
    }
    // select
    const items = await this._select(table, params, options);
    const item = items[0];
    if (!item) return undefined;
    return item as unknown as TRecord;
  }

  async count(params?: IModelCountParams<TRecord>, options?: IModelMethodOptionsGeneral): Promise<BigNumber>;
  async count(table: string, params?: IModelCountParams<TRecord>, options?: IModelMethodOptionsGeneral): Promise<BigNumber>;
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
    this.$loggerChild('model').debug('model.count: %s', builder.toQuery());
    const res = await builder;
    return this.extractCount(res);
  }

  async insert(
    data?: Partial<TRecord>,
    options?: IModelMethodOptionsGeneral,
  ): Promise<TRecord>;
  async insert(
    table: string,
    data?: Partial<TRecord>,
    options?: IModelMethodOptionsGeneral,
  ): Promise<TRecord>;
  async insert(table?, data?, options?): Promise<TRecord[] | TRecord> {
    return await this.batchInsert(table, data, options);
  }

  async batchInsert(
    data: Partial<TRecord>[],
    options?: IModelMethodOptionsGeneral,
  ): Promise<TRecord[]>;
  async batchInsert(
    table: string,
    data: Partial<TRecord>[],
    options?: IModelMethodOptionsGeneral,
  ): Promise<TRecord[]>;
  async batchInsert(table?, data?, options?): Promise<TRecord[] | TRecord> {
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
    const datasTemp = Array.isArray(data) ? data : [data];
    // options
    const datas: any[] = [];
    const datasOriginal: any[] = [];
    for (const dataTemp of datasTemp) {
      // first
      this._prepareInsertDataByOptions(dataTemp, options);
      // then
      const [dataNew, dataNewOriginal] = await this.prepareData(table, dataTemp);
      datas.push(dataNew);
      datasOriginal.push(dataNewOriginal);
    }
    // builder
    const builder = this.builder<TRecord>(table);
    // insert
    builder.insert(datas as unknown as any);
    // debug
    this.$loggerChild('model').debug('model.insert: %s', builder.toQuery());
    // dialect insert
    const ids = await this.dialect.insert(builder);
    // combine
    const result: any[] = [];
    const dataDefault = await this.defaultData(table);
    for (let index = 0; index < ids.length; index++) {
      const dataWithId: any = {};
      if (ids[index] !== undefined) dataWithId.id = ids[index];
      // datasOriginal[index] maybe has id
      result.push(Object.assign({}, dataDefault, dataWithId, datasOriginal[index]));
    }
    // ok
    return Array.isArray(data) ? result : result[0];
  }

  async update(
    data?: Partial<TRecord>,
    options?: IModelUpdateOptionsGeneral<TRecord>,
  ): Promise<void>;
  async update(
    table: string,
    data?: Partial<TRecord>,
    options?: IModelUpdateOptionsGeneral<TRecord>,
  ): Promise<void>;
  async update(table?, data?, options?): Promise<void> {
    if (typeof table !== 'string') {
      options = data;
      data = table;
      table = undefined;
    }
    // table
    table = table || this.table;
    if (!table) return this.scopeDatabase.error.ShouldSpecifyTable.throw();
    // data
    [data] = await this.prepareData(table, data);
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
    const builder = this.builder<TRecord>(table);
    // update
    builder.update(data);
    // where
    const wheres = this.prepareWhere(builder, table, where, options);
    if (wheres === false) {
      // do nothing
      return;
    }
    // debug
    this.$loggerChild('model').debug('model.update: %s', builder.toQuery());
    // ready
    await builder;
  }

  async delete(
    where?: TypeModelWhere<TRecord>,
    options?: IModelMethodOptionsGeneral,
  ): Promise<void>;
  async delete(
    table: string,
    where?: TypeModelWhere<TRecord>,
    options?: IModelMethodOptionsGeneral,
  ): Promise<void>;
  async delete(table?, where?, options?): Promise<void> {
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
      await this.update(table, { deleted: true } as any, Object.assign({}, options, { where }));
      return;
    }
    // builder
    const builder = this.builder<TRecord>(table);
    // delete
    builder.delete();
    // where
    const wheres = this.prepareWhere(builder, table, where, options);
    if (wheres === false) {
      // do nothing
      return;
    }
    // debug
    this.$loggerChild('model').debug('model.delete: %s', builder.toQuery());
    // ready
    await builder;
  }

  async query(value: Knex.Value): Promise<TRecord[]>;
  async query(
    sql: string,
    binding: Knex.RawBinding,
  ): Promise<TRecord[]>;
  async query(
    sql: string,
    bindings: readonly Knex.RawBinding[] | Knex.ValueDict,
  ): Promise<TRecord[]>;
  async query(sql, bindings?): Promise<TRecord[]> {
    const raw = this.connection.raw(sql, bindings);
    const result = await raw;
    // dialect
    return this.dialect.query(result) as unknown as TRecord[];
  }

  async queryOne(value: Knex.Value): Promise<TRecord | undefined>;
  async queryOne(
    sql: string,
    binding: Knex.RawBinding,
  ): Promise<TRecord | undefined>;
  async queryOne(
    sql: string,
    bindings: readonly Knex.RawBinding[] | Knex.ValueDict,
  ): Promise<TRecord | undefined>;
  async queryOne(sql, bindings?): Promise<TRecord | undefined> {
    const res = await this.query(sql, bindings);
    return res[0] as unknown as TRecord | undefined;
  }
}
