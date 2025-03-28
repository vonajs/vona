import type { Knex } from 'knex';
import type { ConfigDatabaseClient } from '../types/config.ts';
import type { IDatabaseClientRecord } from '../types/database.ts';
import knex from 'knex';
import { BeanBase, deepExtend } from 'vona';
import { Service } from 'vona-module-a-web';

export interface IPrepareDatabaseNameResult { database?: string; filename?: string }

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
    this.__load(clientNameSelector);
  }

  protected async __dispose__() {
    await this.__close();
  }

  private __load(clientNameSelector?: string) {
    // name
    this.clientNameSelector = clientNameSelector;
    this.clientName = this._extractClientName(clientNameSelector);
    // config
    this.clientConfig = this.getClientConfig(this.clientName);
    this.$loggerChild('database').debug('clientName: %s, clientConfig: %j', this.clientName, this.clientConfig);
    // knex
    this._knex = knex(this.clientConfig);
  }

  private async __close() {
    if (this._knex) {
      await this._knex.destroy();
      this._knex = undefined as any;
    }
  }

  async reload() {
    await this.__close();
    this.__load(this.clientNameSelector);
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

  getDatabaseName(): string {
    const connection = this.clientConfig.connection as any;
    return connection.database || connection.filename;
  }

  private _prepareDatabaseName(databaseName: string): IPrepareDatabaseNameResult {
    const result: IPrepareDatabaseNameResult = {};
    const connection = this.clientConfig.connection as any;
    if (connection.database) {
      result.database = databaseName;
    } else if (connection.filename) {
      result.filename = databaseName;
    }
    return result;
  }

  async changeConfigAndReload(databaseName: string): Promise<void> {
    // set databaseName
    const connDatabaseName = this._prepareDatabaseName(databaseName);
    // set config
    //   * should not use this.clientConfig.connection, because password is hidden
    const config = this.getClientConfig(this.clientName, true);
    config.connection = Object.assign({}, config.connection, connDatabaseName);
    // only used by startup, so no consider that workders broadcast
    this.configDatabase.clients[this.clientName] = config;
    // reload
    await this.reload();
  }
}
