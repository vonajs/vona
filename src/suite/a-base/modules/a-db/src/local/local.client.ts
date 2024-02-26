import { BeanBase, Local } from '@cabloy/core';
import knex from 'knex';
import { ScopeModule } from '../resource/this.js';

@Local()
export class LocalClient extends BeanBase<ScopeModule> {
  knex: knex.Knex;

  get configDatabase() {
    return this.app.config.database;
  }

  protected __init__(clientName: string) {
    // clientName
    if (!clientName) {
      clientName = this.configDatabase.defaultClient;
    }
    // clientConfig
    const clientBase = this.configDatabase.base;
    let clientConfig = this.configDatabase.clients[clientName];
    clientConfig = this.bean.util.extend({}, clientBase, clientConfig);
    // client
    this.knex = knex(clientConfig);
  }
}
