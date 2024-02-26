import { BeanBase, Local } from '@cabloy/core';
import knex from 'knex';
import { ScopeModule } from '../resource/this.js';

@Local()
export class LocalClient extends BeanBase<ScopeModule> {
  get configModule() {
    return this.scope.config;
  }

  protected __init__(clientName: string) {
    // clientName
    if (!clientName) {
      clientName = this.configModule.defaultClient;
    }
    // client
    return knex(this.configModule.clients[clientName]);
  }
}
