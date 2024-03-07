import { Cast } from '@cabloy/core';
import { ITableColumns } from '../virtual.databaseDialect.js';
import { BeanModelMeta } from './bean.model_meta.js';
import { Knex } from 'knex';
import { getTableOrTableAlias, isRaw } from '../../common/utils.js';
import { checkWhere } from '../../common/checkWhere.js';
import { buildWhere } from '../../common/buildWhere.js';
import { IModelMethodOptionsGeneral } from '../../types.js';

let __columns: Record<string, ITableColumns> = {};

export class BeanModelUtils<TRecord extends {}> extends BeanModelMeta {
  async prepareData<TRecord2 extends {} = TRecord, TResult2 = TRecord2>(item?: object): Promise<TResult2>;
  async prepareData<TRecord2 extends {} = TRecord, TResult2 = TRecord2>(table?: string, item?): Promise<TResult2>;
  async prepareData<TRecord2 extends {} = TRecord, TResult2 = TRecord2>(table?, item?): Promise<TResult2> {
    if (typeof table !== 'string') {
      table = undefined;
      item = table;
    }
    // table
    table = table || this.table;
    if (!table) throw new Error('should specify the table name');
    // item
    if (!item) return {} as TResult2;
    // columns
    const columns = await this.columns(table);
    // data
    const data = {};
    for (const columnName in columns) {
      if (item[columnName] !== undefined) {
        data[columnName] = item[columnName];
      }
    }
    return data as TResult2;
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

  async columns(table?: string): Promise<ITableColumns> {
    table = table || this.table;
    let columns = __columns[table];
    if (!columns) {
      const client = Cast<Knex.Client>(Cast(this.ctx.db).client).config.client as string;
      const dialect = this.app.bean.database.getDialect(client);
      const map = await this.self.builder(table).columnInfo();
      columns = __columns[table] = {};
      for (const name in map) {
        columns[name] = dialect.coerceColumn(map[name]);
      }
    }
    return columns;
  }

  columnsClear(table) {
    table = table || this.table;
    const exists = __columns[table];
    delete __columns[table];
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
  raw<TRecord2 extends {} = TRecord, TResult2 = TRecord2>(sql: string, binding: Knex.RawBinding): Knex.Raw<TResult2>;
  raw<TRecord2 extends {} = TRecord, TResult2 = TRecord2>(
    sql: string,
    bindings: readonly Knex.RawBinding[] | Knex.ValueDict,
  ): Knex.Raw<TResult2>;
  raw(sql, bindings?) {
    return this.ctx.db.raw(sql, bindings);
  }

  checkWhere(where) {
    return checkWhere(where);
  }

  prepareWhere(builder: Knex.QueryBuilder, table: string, where?, options?: IModelMethodOptionsGeneral) {
    // table
    table = table || this.table;
    // disableInstance/disableDeleted
    const disableWhere = {};
    this._prepareWhereByOptions(table, disableWhere, options);
    builder.where(disableWhere);
    // check
    const wheres = checkWhere(where);
    if (wheres === false || wheres === true) {
      return wheres;
    }
    // build
    buildWhere(builder, wheres);
  }

  protected _prepareWhereByOptions(table: string, where, options?: IModelMethodOptionsGeneral) {
    // disableInstance: should check if specified
    const columnNameInstance = `${getTableOrTableAlias(table)}.iid`;
    if (where[columnNameInstance] === undefined && where.iid === undefined) {
      if (!this._checkDisableInstanceByOptions(options)) {
        where[columnNameInstance] = this.ctx.instance.id;
      }
    }
    // disableDeleted: should check if specified
    const columnNameDeleted = `${getTableOrTableAlias(table)}.deleted`;
    if (where[columnNameDeleted] === undefined && where.deleted === undefined) {
      if (!this._checkDisableDeletedByOptions(options)) {
        where[columnNameDeleted] = 0;
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
        data[columnNameDeleted] = 0;
      }
    }
  }
}
