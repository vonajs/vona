import { BeanBase, Virtual } from '@cabloy/core';
import { BeanDatabaseClient } from './bean.databaseClient.js';

export interface IFetchDatabasesResultItem {
  name: string;
}

@Virtual()
export class VirtualDatabaseDialect<T = unknown> extends BeanBase {
  client: BeanDatabaseClient;

  get scope() {
    return this.getScope() as T;
  }

  protected __init__(client: BeanDatabaseClient) {
    this.client = client;
  }

  getDatabaseName(): string {
    const connection = this.client.clientConfig.connection as any;
    return connection.database || connection.filename;
  }

  setDatabaseName(databaseName: string) {
    const connection = this.client.clientConfig.connection as any;
    if (connection.database) {
      connection.database = databaseName;
    } else if (connection.filename) {
      connection.filename = databaseName;
    }
  }

  async fetchDatabases(_databasePrefix: string): Promise<IFetchDatabasesResultItem[]> {
    this.ctx.throw(501);
  }

  async createDatabase(_databaseName: string): Promise<void> {
    this.ctx.throw(501);
  }
}
