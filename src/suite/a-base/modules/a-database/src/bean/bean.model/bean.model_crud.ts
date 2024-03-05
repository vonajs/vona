import { Cast } from '@cabloy/core';
import { BeanModelKnex } from './bean.model_knex.js';
import { IModelCountParams, IModelMethodOptions, IModelSelectParams, IModelUpdateOptions } from '../../types.js';
import { Knex } from 'knex';

export class BeanModelCrud<TRecord extends {}, TResult> extends BeanModelKnex<TRecord, TResult> {
  async select<TRecord2 extends {} = TRecord, TResult2 = TRecord2>(
    params?: IModelSelectParams,
    options?: IModelMethodOptions,
  ): Promise<TResult2[]>;
  async select<TRecord2 extends {} = TRecord, TResult2 = TRecord2>(
    table: Knex.TableDescriptor | Knex.AliasDict,
    params?: IModelSelectParams,
    options?: IModelMethodOptions,
  ): Promise<TResult2[]>;
  async select<TRecord2 extends {} = TRecord, TResult2 = TRecord2>(table?, params?, options?): Promise<TResult2[]> {
    if (typeof table !== 'string') {
      table = undefined;
      options = params;
      params = table;
    }
    // table
    table = table || this.table;
    if (!table) throw new Error('should specify the table name');
    // params
    params = params || {};
    // builder
    const builder = this.builder<TRecord2, TResult2[]>(table);
    // columns
    builder.select(params.columns);
    // joins
    const joins = params.joins;
    if (joins) {
      for (const [joinType, joinTable, joinOn] of joins) {
        builder[joinType](joinTable, Cast(joinOn));
      }
    }
    // where
    const wheres = this.prepareWhere(builder, table, params.where, options);
    if (wheres === false) {
      return [] as TResult2[];
    }
    // orders
    const orders = params.orders;
    if (orders) {
      for (const [orderColumn, orderDirection, orderNulls] of orders) {
        builder.orderBy(orderColumn, orderDirection, orderNulls);
      }
    }
    // limit
    if (params.limit !== undefined) {
      builder.limit(params.limit);
    }
    // offset
    if (params.offset !== undefined) {
      builder.offset(params.offset);
    }
    // ready
    const debug = this.app.bean.debug.get('model');
    if (debug.enabled) debug('model.select: %s', builder.toQuery());
    return (await builder) as TResult2[];
  }

  async get<TRecord2 extends {} = TRecord, TResult2 = TRecord2>(
    where?: any,
    options?: IModelMethodOptions,
  ): Promise<TResult2>;
  async get<TRecord2 extends {} = TRecord, TResult2 = TRecord2>(
    table: Knex.TableDescriptor | Knex.AliasDict,
    where?: any,
    options?: IModelMethodOptions,
  ): Promise<TResult2>;
  async get<TRecord2 extends {} = TRecord, TResult2 = TRecord2>(table?, where?, options?): Promise<TResult2> {
    if (typeof table !== 'string') {
      table = undefined;
      options = where;
      where = table;
    }
    // table
    table = table || this.table;
    if (!table) throw new Error('should specify the table name');
    // select
    const list = await this.select(table, { where, limit: 1 }, options);
    return list[0] as unknown as TResult2;
  }

  async count(params?: IModelCountParams, options?: IModelMethodOptions): Promise<number>;
  async count(
    table: Knex.TableDescriptor | Knex.AliasDict,
    params?: IModelCountParams,
    options?: IModelMethodOptions,
  ): Promise<number>;
  async count<TRecord2 extends {} = TRecord>(table?, params?, options?): Promise<number> {
    if (typeof table !== 'string') {
      table = undefined;
      options = params;
      params = table;
    }
    // table
    table = table || this.table;
    if (!table) throw new Error('should specify the table name');
    // params
    params = params || {};
    // builder
    const builder = this.builder<TRecord2>(table);
    // count
    builder.count();
    // joins
    const joins = params.joins;
    if (joins) {
      for (const [joinType, joinTable, joinOn] of joins) {
        builder[joinType](joinTable, Cast(joinOn));
      }
    }
    // where
    const wheres = this.prepareWhere(builder, table, params.where, options);
    if (wheres === false) {
      return 0;
    }
    // ready
    const debug = this.app.bean.debug.get('model');
    if (debug.enabled) debug('model.count: %s', builder.toQuery());
    const res = (await builder)[0];
    return Number(res[Object.keys(res)[0]]);
  }

  async insert<TRecord2 extends {} = TRecord>(
    data?: Partial<TRecord2> | Partial<TRecord2>[],
    options?: IModelMethodOptions,
  ): Promise<number[]>;
  async insert<TRecord2 extends {} = TRecord>(
    table: Knex.TableDescriptor | Knex.AliasDict,
    data?: Partial<TRecord2> | Partial<TRecord2>[],
    options?: IModelMethodOptions,
  ): Promise<number[]>;
  async insert<TRecord2 extends {} = TRecord>(table?, data?, options?): Promise<number[]> {
    if (typeof table !== 'string') {
      table = undefined;
      options = data;
      data = table;
    }
    // table
    table = table || this.table;
    if (!table) throw new Error('should specify the table name');
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
    const client = Cast<Knex.Client>(Cast(this.ctx.db).client).config.client as string;
    const dialect = this.app.bean.database.getDialect(client);
    return await dialect.insert(builder);
  }

  async update<TRecord2 extends {} = TRecord>(data?: Partial<TRecord2>, options?: IModelUpdateOptions): Promise<void>;
  async update<TRecord2 extends {} = TRecord>(
    table: Knex.TableDescriptor | Knex.AliasDict,
    data?: Partial<TRecord2>,
    options?: IModelUpdateOptions,
  ): Promise<void>;
  async update<TRecord2 extends {} = TRecord>(table?, data?, options?): Promise<void> {
    if (typeof table !== 'string') {
      table = undefined;
      options = data;
      data = table;
    }
    // table
    table = table || this.table;
    if (!table) throw new Error('should specify the table name');
    // data
    data = data || {};
    // where
    const where = Object.assign({}, options?.where);
    // id
    if (data.id) {
      where.id = data.id;
      data = Object.assign({}, data);
      delete data.id;
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
    // ready
    await builder;
  }

  async delete<TRecord2 extends {} = TRecord>(where?: Partial<TRecord2>, options?: IModelMethodOptions): Promise<void>;
  async delete<TRecord2 extends {} = TRecord>(
    table: Knex.TableDescriptor | Knex.AliasDict,
    where?: Partial<TRecord2>,
    options?: IModelMethodOptions,
  ): Promise<void>;
  async delete<TRecord2 extends {} = TRecord>(table?, where?, options?): Promise<void> {
    if (typeof table !== 'string') {
      table = undefined;
      options = where;
      where = table;
    }
    // table
    table = table || this.table;
    if (!table) throw new Error('should specify the table name');
    // disableDeleted
    if (!this._checkDisableDeletedByOptions(options)) {
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
    // ready
    await builder;
  }
}
