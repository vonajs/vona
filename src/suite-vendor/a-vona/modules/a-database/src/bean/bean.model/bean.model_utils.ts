import type { Knex } from 'knex';
import type { IModelMethodOptionsGeneral, IModelSelectParamsJoin, IModelSelectParamsPage, ITableColumns } from '../../types/index.ts';
import { BigNumber } from 'bignumber.js';
import { cast } from 'vona';
import { buildWhere } from '../../common/buildWhere.ts';
import { checkWhere } from '../../common/checkWhere.ts';
import { getTableOrTableAlias, isRaw } from '../../common/utils.ts';
import { BeanModelMeta } from './bean.model_meta.ts';

export class BeanModelUtils<TRecord extends {}> extends BeanModelMeta<TRecord> {
  async prepareData(item?: Partial<TRecord>): Promise<[TRecord, TRecord]>;
  async prepareData(table: string, item?: Partial<TRecord>): Promise<[TRecord, TRecord]>;
  async prepareData(table?, item?): Promise<[TRecord, TRecord]> {
    if (typeof table !== 'string') {
      item = table;
      table = undefined;
    }
    // table
    table = table || this.table;
    if (!table) return this.scopeDatabase.error.ShouldSpecifyTable.throw();
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

  async defaultData(table?: string): Promise<TRecord> {
    table = table || this.table;
    return await this.db.columns.defaultData(table) as TRecord;
  }

  async columns(table?: string): Promise<ITableColumns> {
    table = table || this.table;
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

  checkWhere(where) {
    return checkWhere(where);
  }

  buildWhere(builder: Knex.QueryBuilder, wheres) {
    return buildWhere(builder, wheres);
  }

  buildJoin(builder: Knex.QueryBuilder, join?: IModelSelectParamsJoin) {
    if (!join) return;
    const [joinType, joinTable, joinOn] = join;
    builder[joinType](joinTable, cast(joinOn));
  }

  buildJoins(builder: Knex.QueryBuilder, joins?: IModelSelectParamsJoin[]) {
    if (!joins) return;
    for (const [joinType, joinTable, joinOn] of joins) {
      builder[joinType](joinTable, cast(joinOn));
    }
  }

  buildDistinct(builder: Knex.QueryBuilder, distinct: any) {
    if (distinct === undefined || distinct === false) return;
    if (distinct === true) {
      builder.distinct();
    } else {
      builder.distinct(distinct);
    }
  }

  buildCount(builder: Knex.QueryBuilder, count: any, distinct: any) {
    if (count !== undefined) {
      builder.count(count);
    } else if (distinct !== undefined && distinct !== false) {
      builder.count(this.raw(`distinct ${this.toIdentifier(distinct)}`));
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

  buildPage(builder: Knex.QueryBuilder, page?: IModelSelectParamsPage) {
    if (!page) return;
    this.buildLimit(builder, page.size);
    this.buildOffset(builder, page.index);
  }

  prepareWhere(builder: Knex.QueryBuilder, table?: string, where?, options?: IModelMethodOptionsGeneral) {
    // table
    table = table || this.table;
    if (!table) throw new Error('should specify the table name');
    // disableInstance/disableDeleted
    const disableWhere = {};
    this._prepareWhereByOptions(table, disableWhere, options);
    builder.where(disableWhere);
    // check
    const wheres = this.checkWhere(where);
    if (wheres === false || wheres === true) {
      return wheres;
    }
    // build
    this.buildWhere(builder, wheres);
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

  protected _prepareWhereByOptions(table: string, where, options?: IModelMethodOptionsGeneral) {
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
    // disableInstance: should check if specified
    const columnNameInstance = 'iid';
    if (data[columnNameInstance] === undefined) {
      if (!this._checkDisableInstanceByOptions(options)) {
        data[columnNameInstance] = this.ctx.instance.id;
      }
    }
    // disableDeleted: should check if specified
    const columnNameDeleted = 'deleted';
    if (data[columnNameDeleted] === undefined) {
      if (!this._checkDisableDeletedByOptions(options)) {
        data[columnNameDeleted] = false;
      }
    }
    // createdAt/updatedAt
    for (const key of ['createdAt', 'updatedAt']) {
      if (data[key] === undefined) {
        data[key] = new Date();
      }
    }
  }
}
