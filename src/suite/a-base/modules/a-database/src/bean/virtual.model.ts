import { BeanBase, Cast, IDecoratorModelOptions, IModelOptions, Virtual, appResource } from '@cabloy/core';
import { Knex } from 'knex';
import { ITableColumns } from './virtual.databaseDialect.js';
import { IModelMethodOptions, IModelSelectParams } from '../types.js';
import { checkWhere } from '../common/checkWhere.js';
import { buildWhere } from '../common/buildWhere.js';
import { getTableOrTableAlias, isRaw } from '../common/utils.js';

let __columns: Record<string, ITableColumns> = {};

@Virtual({ scene: 'bean' })
export class BeanModel<TRecord extends {} = any, TResult = any[], TScopeModule = unknown> extends BeanBase {
  get scope() {
    return this.getScope() as TScopeModule;
  }

  get schema(): Knex.SchemaBuilder {
    return this.ctx.db.schema;
  }

  builder<TRecord2 extends {} = TRecord, TResult2 = TResult>(
    tableName?: Knex.TableDescriptor | Knex.AliasDict,
  ): Knex.QueryBuilder<TRecord2, TResult2> {
    if (tableName) {
      return this.ctx.db(tableName);
    }
    return this.ctx.db.queryBuilder();
  }

  protected get __beanOptions() {
    return appResource.getBean((<any>this).__beanFullName__);
  }

  protected get __modelOptions() {
    const beanOptions = this.__beanOptions;
    return beanOptions?.options as IDecoratorModelOptions;
  }

  get table(): string {
    return this.__modelOptions?.table;
  }

  get options(): IModelOptions {
    return this.__modelOptions?.options;
  }

  get disableDeleted() {
    return this.options?.disableDeleted === undefined
      ? this.app.config.model.disableDeleted
      : this.options?.disableDeleted;
  }

  get disableInstance() {
    return this.options?.disableInstance === undefined
      ? this.app.config.model.disableInstance
      : this.options?.disableInstance;
  }

  async prepareData(item) {
    // columns
    const columns = await this.columns();
    // data
    const data = {};
    for (const columnName in columns) {
      if (item[columnName] !== undefined) {
        data[columnName] = item[columnName];
      }
    }
    return data;
  }

  async default<T = any>(data?: T): Promise<T> {
    data = data || ({} as T);
    // columns
    const columns = await this.columns();
    for (const columnName in columns) {
      data[columnName] = columns[columnName].default;
    }
    return data;
  }

  async columns(tableName?: string): Promise<ITableColumns> {
    tableName = tableName || this.table;
    let columns = __columns[tableName];
    if (!columns) {
      const client = Cast<Knex.Client>(Cast(this.ctx.db).client).config.client as string;
      const dialect = this.app.bean.database.getDialect(client);
      const map = await this.builder(tableName).columnInfo();
      columns = __columns[tableName] = {};
      for (const name in map) {
        columns[name] = dialect.coerceColumn(map[name]);
      }
    }
    return columns;
  }

  columnsClear(tableName) {
    tableName = tableName || this.table;
    const exists = __columns[tableName];
    delete __columns[tableName];
    return exists;
  }

  columnsClearAll() {
    const exists = Object.keys(__columns).length > 0;
    __columns = {};
    return exists;
  }

  isRaw(raw) {
    return isRaw(raw);
  }

  raw(value: Knex.Value): Knex.Raw<any>;
  raw<TResult2 = any>(sql: string, binding: Knex.RawBinding): Knex.Raw<TResult2>;
  raw<TResult2 = any>(sql: string, bindings: readonly Knex.RawBinding[] | Knex.ValueDict): Knex.Raw<TResult2>;
  raw(sql, bindings?) {
    return this.ctx.db.raw(sql, bindings);
  }

  checkWhere(where) {
    return checkWhere(where);
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
