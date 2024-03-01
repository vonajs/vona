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

  coerceColumn(_column: Knex.ColumnInfo): ITableColumn {
    throw new Error('Not Implemented');
  }
}
