import type { Knex } from 'knex';
import type { IModelMethodOptionsGeneral, IModelSelectParamsJoin, IModelSelectParamsPage, ITableColumns, ITableRecord, TypeModelColumns, TypeModelColumnsStrict, TypeModelSelectAggrParamsAggrs, TypeModelSelectGroupParamsColumns, TypeModelWhere } from '../../types/index.ts';
import { ensureArray } from '@cabloy/utils';
import { BigNumber } from 'bignumber.js';
import { cast } from 'vona';
import { buildWhere } from '../../common/buildWhere.ts';
import { getTableOrTableAlias, isRaw } from '../../common/utils.ts';
import { $tableDefaults } from '../../lib/columns.ts';
import { BeanModelMeta } from './bean.model_meta.ts';

export class BeanModelUtils<TRecord extends {}> extends BeanModelMeta<TRecord> {
  async prepareData(item?: Partial<TRecord>): Promise<[TRecord, TRecord]>;
  async prepareData(table: keyof ITableRecord, item?: Partial<TRecord>): Promise<[TRecord, TRecord]>;
  async prepareData(table?, item?): Promise<[TRecord, TRecord]> {
    if (typeof table !== 'string') {
      item = table;
      table = undefined;
    }
    // table
    table = table || this.getTable();
    if (!table) return this.scopeOrm.error.ShouldSpecifyTable.throw();
    // item
    if (!item) return [{}, {}] as [TRecord, TRecord];
    // columns
    const columns = await this.columns(table);
    // data
    const data = {};
    const dataOriginal = {};
    for (const columnName in columns) {
      const column = columns[columnName];
      if (Object.prototype.hasOwnProperty.call(item, columnName)) {
        let value = item[columnName];
        dataOriginal[columnName] = value;
        if (column.type === 'json' && value !== undefined) {
          value = JSON.stringify(value);
        }
        data[columnName] = value;
      }
    }
    return [data, dataOriginal] as [TRecord, TRecord];
  }

  async defaultData(table?: keyof ITableRecord): Promise<TRecord> {
    if (this.options.entity) {
      return $tableDefaults(this.options.entity) as any;
    }
    table = table || this.getTable();
    return await this.db.columns.defaultData(table) as TRecord;
  }

  async columns(table?: keyof ITableRecord): Promise<ITableColumns> {
    table = table || this.getTable();
    return await this.db.columns.columns(table);
  }

  isRaw(raw) {
    return isRaw(raw);
  }

  raw(value: Knex.Value): Knex.Raw<any>;
  raw<TRecord2 extends {} = TRecord, TResult2 = TRecord2>(sql: string, binding: Knex.RawBinding): Knex.Raw<TResult2>;
  raw<TRecord2 extends {} = TRecord, TResult2 = TRecord2>(
    sql: string,
    bindings: readonly Knex.RawBinding[] | Knex.ValueDict,
  ): Knex.Raw<TResult2>;
  raw(sql, bindings?) {
    return this.connection.raw(sql, bindings);
  }

  ref<TSrc extends string>(src: TSrc): Knex.Ref<TSrc, { [K in TSrc]: TSrc }> {
    return this.connection.ref<TSrc>(src);
  }

  toIdentifier(name: string | string[]): Knex.Raw<any> {
    const parts = Array.isArray(name) ? name : name.split(',');
    return this.raw(parts.map(_ => '??').join(','), parts);
  }

  // checkWhere(where: TypeModelWhere<TRecord>) {
  //   return checkWhere(where);
  // }

  buildWhere(builder: Knex.QueryBuilder, wheres?: TypeModelWhere<TRecord>) {
    if (!wheres) return;
    return buildWhere(this.connection, builder, wheres);
  }

  buildJoin(builder: Knex.QueryBuilder, join?: IModelSelectParamsJoin<TRecord, ''>) {
    if (!join) return;
    const [joinType, joinTable, joinOn] = join;
    builder[joinType](joinTable, cast(joinOn));
  }

  buildJoins(builder: Knex.QueryBuilder, joins?: IModelSelectParamsJoin<TRecord, ''>[]) {
    if (!joins) return;
    for (const [joinType, joinTable, joinOn] of joins) {
      if (Array.isArray(joinOn)) {
        cast(builder)[joinType](joinTable, ...joinOn);
      } else {
        builder[joinType](joinTable, joinOn);
      }
    }
  }

  buildDistinct(builder: Knex.QueryBuilder, distinct?: boolean | (keyof TRecord) | (keyof TRecord)[]) {
    if (distinct === undefined || distinct === false) return;
    if (distinct === true) {
      builder.distinct();
    } else if (Array.isArray(distinct)) {
      builder.distinct(...distinct);
    } else {
      builder.distinct(distinct);
    }
  }

  buildCount(builder: Knex.QueryBuilder, column?: keyof TRecord, distinct?: boolean | (keyof TRecord) | (keyof TRecord)[]) {
    if (column !== undefined) {
      builder.count(column);
    } else if (distinct !== undefined && distinct !== false) {
      builder.count(this.raw(`distinct ${this.toIdentifier(distinct as any)}`));
    } else {
      builder.count();
    }
  }

  buildOrders(builder: Knex.QueryBuilder, orders) {
    if (!orders) return;
    for (const [orderColumn, orderDirection, orderNulls] of orders) {
      builder.orderBy(orderColumn, orderDirection, orderNulls);
    }
  }

  buildLimit(builder: Knex.QueryBuilder, limit?: number) {
    if (limit !== 0 && limit !== undefined) {
      builder.limit(limit);
    }
  }

  buildOffset(builder: Knex.QueryBuilder, offset?: number) {
    if (offset !== undefined) {
      builder.offset(offset);
    }
  }

  buildColumns(builder: Knex.QueryBuilder, columns?: TypeModelColumns<TRecord>, groups?: (keyof TRecord)[] | undefined) {
    if (columns) {
      builder.select(columns as any);
    } else if (groups) {
      builder.select(groups);
    }
  }

  buildGroups(builder: Knex.QueryBuilder, groups?: TypeModelColumnsStrict<TRecord>) {
    if (!groups) return;
    groups = ensureArray(groups)!;
    builder.groupBy(groups);
    return groups;
  }

  buildAggrs(builder: Knex.QueryBuilder, aggrs?: TypeModelSelectAggrParamsAggrs<TRecord>) {
    if (!aggrs) return;
    for (const key in aggrs) {
      const columns = ensureArray(aggrs[key]);
      if (!columns) continue;
      for (const column of columns) {
        const column2 = `${key}_${column === '*' ? 'all' : column}`;
        builder[key](column, { as: column2 });
      }
    }
  }

  buildPage(builder: Knex.QueryBuilder, page?: IModelSelectParamsPage) {
    if (!page) return;
    this.buildLimit(builder, page.size);
    this.buildOffset(builder, page.index);
  }

  prepareHaving(builder: Knex.QueryBuilder, having?: TypeModelWhere<TRecord, TypeModelSelectGroupParamsColumns<TRecord>>) {
    if (!having) return;
    this.buildHaving(builder, having);
  }

  buildHaving(builder: Knex.QueryBuilder, having: TypeModelWhere<TRecord, TypeModelSelectGroupParamsColumns<TRecord>>) {
    return buildWhere(this.connection, builder, having, true);
  }

  prepareWhere(builder: Knex.QueryBuilder, table?: keyof ITableRecord, where?: TypeModelWhere<TRecord>, options?: IModelMethodOptionsGeneral) {
    // table
    table = table || this.getTable();
    if (!table) throw new Error('should specify the table name');
    // disableInstance/disableDeleted
    const disableWhere = {};
    this._prepareWhereByOptions(table, disableWhere, options);
    builder.where(disableWhere);
    // build
    this.buildWhere(builder, where);
  }

  extractCount(result: Array<object> | object, columnName?: string): BigNumber {
    return this.extractFirstNumber(result, 0, columnName)!;
  }

  extractFirstNumber<T = number | BigNumber | undefined>(
    result: Array<object> | object,
    defaultValue?: T,
    columnName?: string,
  ): T extends undefined ? BigNumber | undefined : BigNumber {
    const value = this.extractFirstValue(result, defaultValue, columnName);
    if (value === undefined || value === null) return undefined as any;
    return BigNumber(value);
  }

  extractFirstValue(result: Array<object> | object, defaultValue?: any, columnName?: string): any | undefined {
    const value = this._extractFirstValue(result, columnName);
    if (value === undefined || value === null) return defaultValue;
    return value;
  }

  private _extractFirstValue(result: Array<object> | object, columnName?: string): any | undefined {
    const res = Array.isArray(result) ? result[0] : result;
    if (!res) return undefined;
    if (columnName) return res[columnName];
    const keys = Object.keys(res);
    if (keys.length === 0) return undefined;
    return res[keys[0]];
  }

  protected _prepareWhereByOptions(table: keyof ITableRecord, where, options?: IModelMethodOptionsGeneral) {
    // disableInstance: should check if specified
    const columnNameInstance = `${getTableOrTableAlias(table)}.iid`;
    if (where[columnNameInstance] === undefined && where.iid === undefined) {
      if (!this._checkDisableInstanceByOptions(options)) {
        if (!this.ctx.instance) {
          throw new Error('ctx.instance not exists');
        }
        where[columnNameInstance] = this.ctx.instance.id;
      }
    }
    // disableDeleted: should check if specified
    const columnNameDeleted = `${getTableOrTableAlias(table)}.deleted`;
    if (where[columnNameDeleted] === undefined && where.deleted === undefined) {
      if (!this._checkDisableDeletedByOptions(options)) {
        where[columnNameDeleted] = false;
      }
    }
  }

  protected _prepareInsertDataByOptions(data, options?: IModelMethodOptionsGeneral) {
    const result = Object.assign({}, data);
    // disableInstance: should check if specified
    const columnNameInstance = 'iid';
    if (result[columnNameInstance] === undefined) {
      if (!this._checkDisableInstanceByOptions(options)) {
        result[columnNameInstance] = this.ctx.instance.id;
      }
    }
    // disableDeleted: should check if specified
    const columnNameDeleted = 'deleted';
    if (result[columnNameDeleted] === undefined) {
      if (!this._checkDisableDeletedByOptions(options)) {
        result[columnNameDeleted] = false;
      }
    }
    // createdAt/updatedAt
    for (const key of ['createdAt', 'updatedAt']) {
      if (result[key] === undefined) {
        result[key] = new Date();
      }
    }
    return result;
  }
}
