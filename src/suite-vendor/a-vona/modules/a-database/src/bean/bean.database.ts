import type { FunctionAsync } from 'vona';
import type { ConfigDatabaseClient } from '../types/config.ts';
import type { IDatabaseClientDialectRecord, IDatabaseClientRecord, IDatabaseSwitchOptions, IDbInfo } from '../types/database.ts';
import type { BeanDatabaseDialectBase } from './bean.databaseDialectBase.ts';
import { isNil } from '@cabloy/utils';
import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';
import { ServiceDatabaseClient } from '../service/databaseClient.ts';
import { ServiceDbMeta } from '../service/dbMeta.ts';

@Bean()
export class BeanDatabase extends BeanBase {
  getClient(dbInfo: IDbInfo | undefined, clientConfig?: ConfigDatabaseClient) {
    return this.app.bean._getBeanSelector(ServiceDatabaseClient, this.prepareClientNameSelector(dbInfo), clientConfig);
  }

  prepareClientNameSelector(dbInfo?: IDbInfo) {
    const level = dbInfo?.level;
    const clientName = dbInfo?.clientName as keyof IDatabaseClientRecord | string;
    // string
    if (clientName && clientName.includes(':')) return clientName;
    if (clientName === '') return clientName;
    // keyof IDatabaseClientRecord
    const clientName2 = this.isDefaultClientName(clientName as any) ? '' : clientName;
    if (level === undefined) throw new Error('should specify the db level');
    return level === 0 ? clientName2 : `${clientName2}:${level}`;
  }

  parseClientNameSelector(clientNameSelector: string): Required<IDbInfo> {
    if (isNil(clientNameSelector)) throw new Error('invalid clientNameSelector');
    const [clientName, level] = clientNameSelector.split(':');
    return {
      level: Number(level ?? 0),
      clientName: clientName as keyof IDatabaseClientRecord || this.app.config.database.defaultClient,
    };
  }

  isDefaultClientName(clientName?: keyof IDatabaseClientRecord) {
    return (!clientName || clientName === 'default' || clientName === this.app.config.database.defaultClient);
  }

  prepareClientName(clientName?: keyof IDatabaseClientRecord): keyof IDatabaseClientRecord {
    return this.isDefaultClientName(clientName) ? this.app.config.database.defaultClient : clientName!;
  }

  prepareClientNameReal(clientName?: keyof IDatabaseClientRecord): keyof IDatabaseClientRecord {
    return this.scope.event.clientNameReal.emitSync(this.prepareClientName(clientName), clientName => {
      return clientName;
    });
  }

  get(clientName?: keyof IDatabaseClientRecord) {
    const client = this.getClient(clientName);
    return client.connection;
  }

  getClientDefault() {
    return this.getClient();
  }

  getDefault() {
    const client = this.getClientDefault();
    return client.connection;
  }

  getDialect(client: keyof IDatabaseClientDialectRecord): BeanDatabaseDialectBase {
    if (!client) throw new Error('database dialect not specified');
    const beanFullName = this.scope.config.dialects[client];
    const dialect = this.app.bean._getBean(beanFullName) as BeanDatabaseDialectBase;
    if (!dialect) throw new Error(`database dialect not found: ${client}`);
    return dialect;
  }

  get current() {
    return this.scope.service.databaseAsyncLocalStorage.current;
  }

  async newDb<RESULT>(dbInfo: IDbInfo | undefined, fn: FunctionAsync<RESULT>): Promise<RESULT> {
    if (!dbInfo) return fn();
    const db = this.createDbMeta(dbInfo);
    return this.scope.service.databaseAsyncLocalStorage.run(db, fn);
  }

  createDbMeta(dbInfo: IDbInfo);
  createDbMeta(dbInfo: undefined, client: ServiceDatabaseClient);
  createDbMeta(dbInfo?: IDbInfo, client?: ServiceDatabaseClient) {
    return this.app.bean._newBean(ServiceDbMeta, dbInfo, client);
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
    this.scope.event.columnsClear.emitSync({ clientName: this.prepareClientNameReal(clientName), tableName });
  }

  async reloadClients(clientName?: keyof IDatabaseClientRecord, clientConfig?: ConfigDatabaseClient, extraData?: any) {
    await this.__reloadAllClientsRaw(clientName, clientConfig, extraData);
    this.scope.broadcast.databaseClientReload.emit({ clientName, clientConfig, extraData });
  }

  private async __reloadAllClientsRaw(clientName?: keyof IDatabaseClientRecord, clientConfig?: ConfigDatabaseClient, extraData?: any) {
    await this.scope.event.databaseClientReload.emit({ clientName: this.prepareClientName(clientName), clientConfig, extraData });
    this.__columnsClearRaw(clientName);
  }
}
