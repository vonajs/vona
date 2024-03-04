import { BeanBase, Virtual } from '@cabloy/core';
import { Knex } from 'knex';

export interface IFetchDatabasesResultItem {
  name: string;
}

export interface ITableColumn {
  type: string;
  default: any;
}

export type ITableColumns = Record<string, ITableColumn>;

@Virtual()
export class VirtualDatabaseDialect<T = unknown> extends BeanBase {
  schemaBuilder: Knex.SchemaBuilder;

  get scope() {
    return this.getScope() as T;
  }

  protected __init__(schemaBuilder: Knex.SchemaBuilder) {
    this.schemaBuilder = schemaBuilder;
  }

  async fetchDatabases(_databasePrefix: string): Promise<IFetchDatabasesResultItem[]> {
    throw new Error('Not Implemented');
  }

  async createDatabase(_databaseName: string): Promise<void> {
    throw new Error('Not Implemented');
  }

  async dropDatabase(_databaseName: string): Promise<void> {
    throw new Error('Not Implemented');
  }

  async insert(_builder: Knex.QueryBuilder): Promise<number> {
    throw new Error('Not Implemented');
  }

  coerceColumn(column: Knex.ColumnInfo): ITableColumn {
    // result
    const result = { type: column.type } as ITableColumn;
    // coerce
    result.default = this._coerceColumnValue(column.type, column.defaultValue);
    // ok
    return result;
  }

  protected _coerceColumnValue(type: string, value) {
    // null
    if (value === null) return value;
    // type
    if (['bit', 'bool', 'boolean'].includes(type)) return Boolean(value);
    if (['int'].includes(type)) return this._safeNumber(value);
    if (this._columnTypePrefixes(type, ['timestamp']) && value === 'CURRENT_TIMESTAMP') return new Date();
    if (this._columnTypePrefixes(type, ['float', 'double'])) return this._safeNumber(value);
    if (this._columnTypePrefixes(type, ['tinyint', 'smallint', 'mediumint', 'bigint', 'numeric', 'integer'])) {
      return this._safeNumber(value);
    }
    // pg: NULL::character varying
    if (value.indexOf('NULL::') === 0) return null;
    // others
    return value;
  }

  // pg: nextval
  protected _safeNumber(value) {
    const num = Number(value);
    return isNaN(num) ? null : num;
  }

  protected _columnTypePrefixes(type: string, prefixes: string[]) {
    return prefixes.some(prefix => type.indexOf(prefix) > -1);
  }
}
