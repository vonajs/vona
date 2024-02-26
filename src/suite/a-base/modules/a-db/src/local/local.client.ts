import { BeanBase, Local } from '@cabloy/core';
import knex from 'knex';
import { ScopeModule } from '../resource/this.js';

@Local({ containerScope: 'app' })
export class LocalClient extends BeanBase<ScopeModule> {
  knex: knex.Knex;

  get configDatabase() {
    return this.app.config.database;
  }

  protected __init__(clientName?: string) {
    // config
    const clientConfig = this.getClientConfig(clientName);
    const debug = this.app.bean.debug.get('db');
    debug('clientName: %s, clientConfig: %j', clientName, clientConfig);
    // client
    this.knex = knex(clientConfig);
  }

  get(clientName?: string) {
    const client = this.app.bean._getBeanSelector(LocalClient, clientName);
    return client.knex;
  }

  getClientConfig(clientName?: string, original: boolean = false): knex.Knex.Config {
    // clientName
    if (!clientName) {
      clientName = this.configDatabase.defaultClient;
    }
    // clientConfig
    const clientConfig = this.configDatabase.clients[clientName];
    if (original) return clientConfig;
    return this.bean.util.extend({}, this.configDatabase.base, clientConfig);
  }

  setClientConfig(clientName: string, clientConfig: knex.Knex.Config) {
    // clientName
    if (!clientName) {
      clientName = this.configDatabase.defaultClient;
    }
    this.configDatabase.clients[clientName] = clientConfig;
  }
}
