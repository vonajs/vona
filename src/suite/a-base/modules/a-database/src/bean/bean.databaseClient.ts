import { Bean, BeanBase } from '@cabloy/core';
import knex from 'knex';
import { ScopeModule, __ThisModule__ } from '../resource/this.js';
import { IFetchDatabasesResultItem, VirtualDatabaseDialect } from '../bean/virtual.databaseDialect.js';

@Bean()
export class BeanDatabaseClient extends BeanBase<ScopeModule> {
  clientNameOriginal?: string;
  clientName: string;
  clientConfig: knex.Knex.Config;
  knex: knex.Knex;
  private _dialect: VirtualDatabaseDialect;

  get configDatabase() {
    return this.app.config.database;
  }

  get dialect(): VirtualDatabaseDialect {
    if (!this._dialect) {
      const client = this.clientConfig.client as string;
      const beanFullName = `${__ThisModule__}.database.dialect.${client}`;
      this._dialect = this.bean._newBean(beanFullName, this);
      if (!this._dialect) {
        throw new Error(`database dialect not found: ${client}`);
      }
    }
    return this._dialect;
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
    this.knex = knex(this.clientConfig);
  }

  private _extractClientName(clientName?: string) {
    // default
    if (!clientName) return this.configDatabase.defaultClient;
    // split
    clientName = clientName.split(':')[0];
    if (!clientName) return this.configDatabase.defaultClient;
    return clientName;
  }

  getClientConfig(clientName: string, original: boolean = false): knex.Knex.Config {
    // clientConfig
    let clientConfig = this.configDatabase.clients[clientName];
    if (original) return clientConfig;
    // check
    if (!clientConfig) {
      throw new Error(`database config not found: ${clientName}`);
    }
    // combine
    const configBase = this.configDatabase.base;
    const configBaseClient = this.configDatabase.bases[clientConfig.client as string];
    clientConfig = this.bean.util.extend({}, configBase, configBaseClient, clientConfig);
    // ready
    return clientConfig;
  }

  setClientConfig(clientName: string, clientConfig: knex.Knex.Config) {
    // clientName
    if (!clientName) {
      clientName = this.configDatabase.defaultClient;
    }
    this.configDatabase.clients[clientName] = clientConfig;
  }

  getDatabaseName(): string {
    return this.dialect.getDatabaseName();
  }

  async changeConfigAndReload(databaseName: string): Promise<void> {
    // set databaseName
    this.dialect.setDatabaseName(databaseName);
    // set config
    const config = this.getClientConfig(this.clientName, true);
    config.connection = this.clientConfig.connection;
    this.setClientConfig(this.clientName, config);
    // reload knex
    await this.knex.destroy();
    this.__init__(this.clientNameOriginal);
  }

  async fetchDatabases(databasePrefix: string): Promise<IFetchDatabasesResultItem[]> {
    return await this.dialect.fetchDatabases(databasePrefix);
  }

  async createDatabase(databaseName: string): Promise<void> {
    await this.dialect.createDatabase(databaseName);
  }

  async dropDatabase(databaseName: string): Promise<void> {
    await this.dialect.dropDatabase(databaseName);
  }

  // async _executeQuery(conn, sql) {
  //   const queryAsync = promisify(cb => conn.query(sql, cb));
  //   return await queryAsync();
  // }
}
