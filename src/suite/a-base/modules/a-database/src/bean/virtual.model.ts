import { Cast, IDecoratorModelOptions, IModelOptions, Virtual, appResource } from '@cabloy/core';
import { Knex } from 'knex';
import { ITableColumns } from './virtual.databaseDialect.js';
import { IModelMethodOptions, IModelSelectParams } from '../types.js';
import { checkWhere } from '../common/checkWhere.js';
import { buildWhere } from '../common/buildWhere.js';
import { getTableOrTableAlias, isRaw } from '../common/utils.js';
import { BeanModelCrud } from './bean.model/bean.model_crud.js';

@Virtual({ scene: 'bean' })
export class BeanModel<TRecord extends {} = any, TResult = any[], TScopeModule = unknown> extends BeanModelCrud<
  TRecord,
  TResult
> {
  get scope() {
    return this.getScope() as TScopeModule;
  }

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

  private _prepareWhere(
    builder: Knex.QueryBuilder,
    table: Knex.TableDescriptor | Knex.AliasDict,
    where,
    options?: IModelMethodOptions,
  ) {
    // disableInstance
    this._prepareWhereInstance(builder, table, options);
    // disableDeleted
    this._prepareWhereDeleted(builder, table, options);
    // check
    const wheres = checkWhere(where);
    if (wheres === false || wheres === true) {
      return wheres;
    }
    // build
    buildWhere(builder, wheres);
  }

  private _prepareWhereInstance(
    builder: Knex.QueryBuilder,
    table: Knex.TableDescriptor | Knex.AliasDict,
    options?: IModelMethodOptions,
  ) {
    // need not check where?.iid, for not exactly check
    // if (where?.iid !== undefined) return;
    let disableInstance;
    if (options?.disableInstance === true || options?.disableInstance === false) {
      disableInstance = options?.disableInstance;
    } else {
      disableInstance = this.disableInstance;
    }
    if (!disableInstance) {
      builder.where(`${getTableOrTableAlias(table)}.iid`, this.ctx.instance.id);
    }
  }

  private _prepareWhereDeleted(
    builder: Knex.QueryBuilder,
    table: Knex.TableDescriptor | Knex.AliasDict,
    options?: IModelMethodOptions,
  ) {
    // need not check where?.deleted, for not exactly check
    // if (where?.deleted !== undefined) return;
    let disableDeleted;
    if (options?.disableDeleted === true || options?.disableDeleted === false) {
      disableDeleted = options?.disableDeleted;
    } else {
      disableDeleted = this.disableDeleted;
    }
    if (!disableDeleted) {
      builder.where(`${getTableOrTableAlias(table)}.deleted`, 0);
    }
  }
}
