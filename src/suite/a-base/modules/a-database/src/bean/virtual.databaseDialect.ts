import { BeanBase, Virtual } from '@cabloy/core';
import { BeanDatabaseClient } from './bean.databaseClient.js';
import { Knex } from 'knex';

export interface IFetchDatabasesResultItem {
  name: string;
}

export type ISetDatabaseNameResult = { database?: string; filename?: string };

@Virtual()
export class VirtualDatabaseDialect<T = unknown> extends BeanBase {
  schemaBuilder: Knex.SchemaBuilder;

  get scope() {
    return this.getScope() as T;
  }

  protected __init__(schemaBuilder: Knex.SchemaBuilder) {
    this.schemaBuilder = schemaBuilder;
  }

  getDatabaseName(): string {
    const connection = this.client.clientConfig.connection as any;
    return connection.database || connection.filename;
  }

  setDatabaseName(databaseName: string): ISetDatabaseNameResult {
    const result: ISetDatabaseNameResult = {};
    const connection = this.client.clientConfig.connection as any;
    if (connection.database) {
      result.database = connection.database = databaseName;
    } else if (connection.filename) {
      result.filename = connection.filename = databaseName;
    }
    return result;
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
}
