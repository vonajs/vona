import { Bean, BeanBase } from '@cabloy/core';
import knex, { Knex } from 'knex';
import { ScopeModule, __ThisModule__ } from '../resource/this.js';
import { IFetchDatabasesResultItem, VirtualDatabaseDialect } from '../bean/virtual.databaseDialect.js';
import { LocalTransaction } from '../index.js';

@Bean()
export class BeanDatabaseClient extends BeanBase<ScopeModule> {
  clientNameOriginal?: string;
  clientName: string;
  clientConfig: Knex.Config;
  private _knex: Knex;
  private _transaction: LocalTransaction;
  private _dialect: VirtualDatabaseDialect;

  get configDatabase() {
    return this.app.config.database;
  }

  get db(): Knex {
    const knex = this._transaction.inTransaction ? this._transaction.connection : this._knex;
    return knex as Knex;
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
    this._knex = knex(this.clientConfig);
    // transaction
    this._transaction = this.bean._newBean(LocalTransaction, this);
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
    // combine
    const configBase = this.configDatabase.base;
    const configBaseClient = this.configDatabase.bases[clientConfig.client as string];
    clientConfig = this.bean.util.extend({}, configBase, configBaseClient, clientConfig);
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
    return this.dialect.getDatabaseName();
  }

  async changeConfigAndReload(databaseName: string): Promise<void> {
    // set databaseName
    const connDatabaseName = this.dialect.setDatabaseName(databaseName);
    // set config
    //   * should not use this.clientConfig.connection, because password is hidden
    const config = this.getClientConfig(this.clientName, true);
    config.connection = Object.assign({}, config.connection, connDatabaseName);
    this.setClientConfig(this.clientName, config);
    // reload knex
    await this._knex.destroy();
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

  beginTransaction() {
    return this._knex.transaction({ isolationLevel: 'read committed' });
  }

  // async _executeQuery(conn, sql) {
  //   const queryAsync = promisify(cb => conn.query(sql, cb));
  //   return await queryAsync();
  // }
}
