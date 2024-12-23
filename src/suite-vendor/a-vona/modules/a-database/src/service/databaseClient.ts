import { BeanBase, deepExtend } from 'vona';
import knex, { Knex } from 'knex';
import { Service } from 'vona-module-a-web';

export type ISetDatabaseNameResult = { database?: string; filename?: string };

@Service()
export class ServiceDatabaseClient extends BeanBase {
  clientNameOriginal?: string;
  clientName: string;
  clientConfig: Knex.Config;
  private _knex: Knex;

  get configDatabase() {
    return this.app.config.database;
  }

  get db(): Knex {
    return this._knex;
  }

  protected __init__(clientName?: string) {
    // name
    this.clientNameOriginal = clientName;
    this.clientName = this._extractClientName(clientName);
    // config
    this.clientConfig = this.getClientConfig(this.clientName);
    const debug = this.app.bean.debug.get('database');
    debug('clientName: %s, clientConfig: %j', this.clientName, this.clientConfig);
    // knex
    this._knex = knex(this.clientConfig);
  }

  private _extractClientName(clientName?: string) {
    // default
    if (!clientName) return this.configDatabase.defaultClient;
    // split
    clientName = clientName.split(':')[0];
    if (!clientName) return this.configDatabase.defaultClient;
    return clientName;
  }

  getClientConfig(clientName: string, original: boolean = false): Knex.Config {
    // clientConfig
    let clientConfig = this.configDatabase.clients[clientName];
    if (original) return clientConfig;
    // check
    if (!clientConfig) {
      throw new Error(`database config not found: ${clientName}`);
    }
    // configBaseClient
    const dialect = this.app.bean.database.getDialect(clientConfig.client as string);
    const configBaseClient = dialect.getConfigBase();
    // combine
    const configBase = this.configDatabase.base;
    clientConfig = deepExtend({}, configBase, configBaseClient, clientConfig);
    // ready
    return clientConfig;
  }

  setClientConfig(clientName: string, clientConfig: Knex.Config) {
    // clientName
    if (!clientName) {
      clientName = this.configDatabase.defaultClient;
    }
    this.configDatabase.clients[clientName] = clientConfig;
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

  async changeConfigAndReload(databaseName: string): Promise<void> {
    // set databaseName
    const connDatabaseName = this.setDatabaseName(databaseName);
    // set config
    //   * should not use this.clientConfig.connection, because password is hidden
    const config = this.getClientConfig(this.clientName, true);
    config.connection = Object.assign({}, config.connection, connDatabaseName);
    this.setClientConfig(this.clientName, config);
    // reload knex
    await this._knex.destroy();
    this.__init__(this.clientNameOriginal);
  }
}
