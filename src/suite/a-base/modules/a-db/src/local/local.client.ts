import { BeanBase, Local } from '@cabloy/core';
import knex from 'knex';
import { ScopeModule } from '../resource/this.js';

@Local()
export class LocalClient extends BeanBase<ScopeModule> {
  knex: knex.Knex;

  get configModule() {
    return this.scope.config;
  }

  protected __init__(clientName: string) {
    // clientName
    if (!clientName) {
      clientName = this.configModule.defaultClient;
    }
    // client
    this.knex = knex(this.configModule.clients[clientName]);
  }
}
