import { BeanBase, Virtual } from '@cabloy/core';
import { LocalClient } from '../local/local.client.js';

export interface IFetchDatabasesResultItem {
  name: string;
}

@Virtual()
export class VirtualDatabaseDialect<T = unknown> extends BeanBase {
  client: LocalClient;

  get scope() {
    return this.getScope() as T;
  }

  protected __init__(client: LocalClient) {
    this.client = client;
  }

  getDatabaseName(): string {
    const connection = this.client.clientConfig.connection as any;
    return connection.database || connection.filename;
  }

  async fetchDatabases(_databasePrefix: string): Promise<IFetchDatabasesResultItem[]> {
    this.ctx.throw(501);
  }
}
