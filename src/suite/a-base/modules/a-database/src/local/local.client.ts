import { BeanBase, Local } from '@cabloy/core';
import knex from 'knex';
import { promisify } from 'node:util';
import { ScopeModule } from '../resource/this.js';

@Local({ containerScope: 'app' })
export class LocalClient extends BeanBase<ScopeModule> {
  clientNameOriginal?: string;
  clientName: string;
  clientConfig: knex.Knex.Config;
  knex: knex.Knex;

  get configDatabase() {
    return this.app.config.database;
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
    const connection = this.clientConfig.connection as any;
    return connection.database || connection.filename;
  }

  async fetchDatabases() {}

  async _executeQuery(conn, sql) {
    const queryAsync = promisify(cb => conn.query(sql, cb));
    return await queryAsync();
  }
}
