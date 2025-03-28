import type { Knex } from 'knex';
import type { ConfigDatabaseClient } from '../types/config.ts';
import type { IDatabaseClientRecord } from '../types/database.ts';
import knex from 'knex';
import { BeanBase, deepExtend } from 'vona';
import { Service } from 'vona-module-a-web';

export interface ISetDatabaseNameResult { database?: string; filename?: string }

@Service()
export class ServiceDatabaseClient extends BeanBase {
  clientNameSelector?: string;
  clientName: keyof IDatabaseClientRecord;
  clientConfig: ConfigDatabaseClient;
  private _knex: Knex;

  get configDatabase() {
    return this.app.config.database;
  }

  get db(): Knex {
    return this._knex;
  }

  protected __init__(clientNameSelector?: string) {
    // name
    this.clientNameSelector = clientNameSelector;
    this.clientName = this._extractClientName(clientNameSelector);
    // config
    this.clientConfig = this.getClientConfig(this.clientName);
    this.$loggerChild('database').debug('clientName: %s, clientConfig: %j', this.clientName, this.clientConfig);
    // knex
    this._knex = knex(this.clientConfig);
  }

  protected async __dispose__() {
    await this._knex?.destroy();
  }

  async reload() {
    await this._knex?.destroy();
    this.__init__(this.clientNameSelector);
  }

  private _extractClientName(clientNameSelector?: string): keyof IDatabaseClientRecord {
    // default
    if (!clientNameSelector) return this.configDatabase.defaultClient;
    // split
    const clientName = clientNameSelector.split(':')[0];
    if (!clientName) return this.configDatabase.defaultClient;
    return clientName as keyof IDatabaseClientRecord;
  }

  getClientConfig(clientName: keyof IDatabaseClientRecord, original: boolean = false): ConfigDatabaseClient {
    // clientConfig
    let clientConfig = this.configDatabase.clients[clientName];
    if (original) return clientConfig;
    // check
    if (!clientConfig) {
      throw new Error(`database config not found: ${clientName}`);
    }
    // configBaseClient
    const dialect = this.app.bean.database.getDialect(clientConfig.client);
    const configBaseClient = dialect.getConfigBase();
    // combine
    const configBase = this.configDatabase.base;
    clientConfig = deepExtend({}, configBase, configBaseClient, clientConfig);
    // ready
    return clientConfig;
  }

  setClientConfig(clientName: keyof IDatabaseClientRecord, clientConfig: ConfigDatabaseClient) {
    // clientName
    if (!clientName) clientName = this.configDatabase.defaultClient;
    this.configDatabase.clients[clientName] = clientConfig;
    // todo:emit event
    // 将setClientConfig广播至所有worker
  }

  getDatabaseName(): string {
    const connection = this.clientConfig.connection as any;
    return connection.database || connection.filename;
  }

  setDatabaseName(databaseName: string): ISetDatabaseNameResult {
    const result: ISetDatabaseNameResult = {};
    const connection = this.clientConfig.connection as any;
    if (connection.database) {
      result.database = connection.database = databaseName;
    } else if (connection.filename) {
      result.filename = connection.filename = databaseName;
    }
    return result;
  }

  // todo: 将changeConfig和Reload分开，reload在event监听中被调用
  // todo: 更合理的设计，应该是单独提供一个changeDatabaseName的逻辑
  async changeConfigAndReload(databaseName: string): Promise<void> {
    // set databaseName
    const connDatabaseName = this.setDatabaseName(databaseName);
    // set config
    //   * should not use this.clientConfig.connection, because password is hidden
    const config = this.getClientConfig(this.clientName, true);
    config.connection = Object.assign({}, config.connection, connDatabaseName);
    this.setClientConfig(this.clientName, config);
    // reload
    await this.reload();
  }
}
