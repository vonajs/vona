import type { Knex } from 'knex';
import type { TableIdentity } from '../types/tableIdentity.ts';
import { BeanBase } from 'vona';
import { Virtual } from 'vona-module-a-bean';

export interface IFetchDatabasesResultItem {
  name: string;
}

export interface IFetchIndexesResultItem {
  indexName: string;
}

export interface ITableColumn {
  type: string;
  default: any;
}

export type ITableColumns = Record<string, ITableColumn>;

@Virtual()
export class BeanDatabaseDialectBase extends BeanBase {
  getConfigBase(): Knex.Config | undefined {
    return undefined;
  }

  async fetchDatabases(
    _schemaBuilder: Knex.SchemaBuilder,
    _databasePrefix: string,
  ): Promise<IFetchDatabasesResultItem[]> {
    throw new Error('Not Implemented');
  }

  async createDatabase(_schemaBuilder: Knex.SchemaBuilder, _databaseName: string): Promise<void> {
    throw new Error('Not Implemented');
  }

  async dropDatabase(_schemaBuilder: Knex.SchemaBuilder, _databaseName: string): Promise<void> {
    throw new Error('Not Implemented');
  }

  async fetchIndexes(_schemaBuilder: Knex.SchemaBuilder, _tableName: string): Promise<IFetchIndexesResultItem[]> {
    throw new Error('Not Implemented');
  }

  async insert(_builder: Knex.QueryBuilder): Promise<TableIdentity[]> {
    throw new Error('Not Implemented');
  }

  query(_result) {
    throw new Error('Not Implemented');
  }

  async viewDependents(_builder: Knex.QueryBuilder, _viewName: string): Promise<string[]> {
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
    return Number.isNaN(num) ? null : num;
  }

  protected _columnTypePrefixes(type: string, prefixes: string[]) {
    return prefixes.some(prefix => type.includes(prefix));
  }
}
