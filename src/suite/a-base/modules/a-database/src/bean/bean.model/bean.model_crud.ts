import { Cast } from '@cabloy/core';
import { BeanModelKnex } from './bean.model_knex.js';
import { IModelMethodOptions, IModelSelectParams } from '../../types.js';
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
    debug('model.select: %s', builder.toQuery());
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
    const list = await this.select(table, { where }, options);
    return list[0] as unknown as TResult2;
  }
}
