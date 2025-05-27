import type { Knex } from 'knex';
import type { ConfigDatabaseClient } from '../types/config.ts';
import type { IDatabaseClientRecord } from '../types/database.ts';
import knex from 'knex';
import { BeanBase, deepExtend } from 'vona';
import { Service } from 'vona-module-a-web';

export interface IPrepareDatabaseNameResult { database?: string; filename?: string }

@Service()
export class ServiceDatabaseClient extends BeanBase {
  level: number;
  clientName: keyof IDatabaseClientRecord;
  clientNameSelector: string;
  clientConfig: ConfigDatabaseClient;
  private _knex: Knex;
  private _onDatabaseClientReloadCancel?: Function;

  get configDatabase() {
    return this.app.config.database;
  }

  get connection(): Knex {
    return this._knex;
  }

  protected __init__(clientNameSelector: string, clientConfig?: ConfigDatabaseClient) {
    this.__load(clientNameSelector, clientConfig);
    this._onDatabaseClientReloadCancel = this.scope.event.databaseClientReload.on(async ({ clientName, clientConfig }, next) => {
      if (clientName === this.clientName) {
        await this.reload(clientConfig);
      }
      await next();
    });
  }

  protected async __dispose__() {
    await this.__close();
    this._onDatabaseClientReloadCancel?.();
  }

  private __load(clientNameSelector: string, clientConfig?: ConfigDatabaseClient) {
    // name
    this.clientNameSelector = clientNameSelector;
    const dbInfo = this.scope.service.database.parseClientNameSelector(clientNameSelector);
    this.level = dbInfo.level;
    this.clientName = dbInfo.clientName;
    // config
    this.clientConfig = clientConfig ? deepExtend({}, clientConfig) : this.getClientConfig(this.clientName);
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

  async reload(clientConfig?: ConfigDatabaseClient) {
    await this.__close();
    this.__load(this.clientNameSelector, clientConfig);
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
    const dialect = this.scope.service.database.getDialect(clientConfig.client);
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
    await this.reload(config);
  }
}
