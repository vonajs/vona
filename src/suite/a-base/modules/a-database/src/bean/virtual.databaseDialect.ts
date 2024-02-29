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
    this.ctx.throw(501);
  }

  async createDatabase(_databaseName: string): Promise<void> {
    this.ctx.throw(501);
  }

  async dropDatabase(_databaseName: string): Promise<void> {
    this.ctx.throw(501);
  }

  coerceColumn(_column: Knex.ColumnInfo): ITableColumn {
    this.ctx.throw(501);
  }
}
