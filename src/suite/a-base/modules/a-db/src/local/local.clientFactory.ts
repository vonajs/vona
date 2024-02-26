import { BeanBase, Local } from '@cabloy/core';
import { ScopeModule } from '../resource/this.js';
import { LocalClient } from './local.client.js';

@Local()
export class LocalClientFactory extends BeanBase<ScopeModule> {
  get(clientName?: string) {
    return this.app.bean._newBean(LocalClient, clientName);
  }
}
