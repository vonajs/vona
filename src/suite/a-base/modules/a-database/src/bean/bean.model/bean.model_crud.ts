import { BeanModelKnex } from './bean.model_knex.js';

export class BeanModelCrud<TRecord extends {}, TResult> extends BeanModelKnex<TRecord, TResult> {
  async select<TRecord2 extends {} = TRecord, TResult2 = TRecord2>(
    params?: IModelSelectParams,
    options?: IModelMethodOptions,
  ): Promise<TResult2[]> {
    // params
    params = params || {};
    // table
    const table = params.table || this.table;
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
    const wheres = this._prepareWhere(builder, table, params.where, options);
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
}
