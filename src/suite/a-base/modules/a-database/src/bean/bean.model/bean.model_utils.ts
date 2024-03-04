import { Cast } from '@cabloy/core';
import { ITableColumns } from '../virtual.databaseDialect.js';
import { BeanModelMeta } from './bean.model_meta.js';
import { Knex } from 'knex';
import { isRaw } from '../../common/utils.js';
import { checkWhere } from '../../common/checkWhere.js';

let __columns: Record<string, ITableColumns> = {};

export class BeanModelUtils<TRecord extends {}, TResult> extends BeanModelMeta<TRecord, TResult> {
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
      const map = await this.self.builder(tableName).columnInfo();
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
}
