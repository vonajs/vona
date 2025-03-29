import type { FunctionAsync } from 'vona';
import type { ConfigDatabaseClient } from '../types/config.ts';
import type { IDatabaseClientDialectRecord, IDatabaseClientRecord, IDatabaseSwitchOptions } from '../types/database.ts';
import type { BeanDatabaseDialectBase } from './bean.databaseDialectBase.ts';
import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';
import { ServiceDatabaseClient } from '../service/databaseClient.ts';
import { ServiceDbMeta } from '../service/dbMeta.ts';

@Bean()
export class BeanDatabase extends BeanBase {
  getClient(clientName?: keyof IDatabaseClientRecord, clientConfig?: ConfigDatabaseClient) {
    return this.app.bean._getBeanSelector(ServiceDatabaseClient, this.prepareClientNameSelector(clientName), clientConfig);
  }

  prepareClientNameSelector(clientName?: keyof IDatabaseClientRecord | string) {
    // string
    if (clientName && clientName.includes(':')) return clientName;
    if (clientName === '') return clientName;
    // keyof IDatabaseClientRecord
    const clientName2 = this.isDefaultClientName(clientName as any) ? '' : clientName;
    return this.ctx.dbLevel === 0 ? clientName2 : `${clientName2}:${this.ctx.dbLevel}`;
  }

  isDefaultClientName(clientName?: keyof IDatabaseClientRecord) {
    return (!clientName || clientName === 'default' || clientName === this.app.config.database.defaultClient);
  }

  prepareClientName(clientName?: keyof IDatabaseClientRecord): keyof IDatabaseClientRecord {
    return this.isDefaultClientName(clientName) ? this.app.config.database.defaultClient : clientName!;
  }

  get(clientName?: keyof IDatabaseClientRecord) {
    const client = this.getClient(clientName);
    return client.db;
  }

  getClientDefault() {
    return this.getClient();
  }

  getDefault() {
    const client = this.getClientDefault();
    return client.db;
  }

  getDialect(client: keyof IDatabaseClientDialectRecord): BeanDatabaseDialectBase {
    if (!client) throw new Error('database dialect not specified');
    const beanFullName = this.scope.config.dialects[client];
    const dialect = this.app.bean._getBean(beanFullName) as BeanDatabaseDialectBase;
    if (!dialect) throw new Error(`database dialect not found: ${client}`);
    return dialect;
  }

  createDbMeta(clientName?: keyof IDatabaseClientRecord | ServiceDatabaseClient) {
    return this.app.bean._newBean(ServiceDbMeta, clientName);
  }

  async switchClient<RESULT>(fn: FunctionAsync<RESULT>, options?: IDatabaseSwitchOptions): Promise<RESULT> {
    const clientName = this.prepareClientName(options?.clientName);
    // check if the same
    if (this.ctx.dbMeta.currentClientName === clientName) {
      return await fn();
    }
    // dbMetaPrevious
    const dbMetaPrevious = this.ctx.dbMeta;
    this.ctx.dbMeta = this.createDbMeta(clientName);
    // fn
    try {
      return await fn();
    } finally {
      // restore
      this.ctx.dbMeta = dbMetaPrevious;
    }
  }

  columnsClear(clientName?: keyof IDatabaseClientRecord, tableName?: string) {
    this.__columnsClearRaw(clientName, tableName);
    this.scope.broadcast.columnsClear.emit({ clientName, tableName });
  }

  __columnsClearRaw(clientName?: keyof IDatabaseClientRecord, tableName?: string) {
    this.scope.event.columnsClear.emitSync({ clientName: this.prepareClientName(clientName), tableName });
  }

  async reloadClients(clientName?: keyof IDatabaseClientRecord, clientConfig?: ConfigDatabaseClient) {
    await this.__reloadAllClientsRaw(clientName, clientConfig);
    this.scope.broadcast.databaseClientReload.emit({ clientName, clientConfig });
  }

  private async __reloadAllClientsRaw(clientName?: keyof IDatabaseClientRecord, clientConfig?: ConfigDatabaseClient) {
    await this.scope.event.databaseClientReload.emit({ clientName: this.prepareClientName(clientName), clientConfig });
  }
}
