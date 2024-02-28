import { Bean, BeanBase } from '@cabloy/core';
import { LocalClient } from '../local/local.client.js';

@Bean()
export class BeanDatabase extends BeanBase {
  getClient(clientName?: string) {
    return this.app.bean._getBeanSelector(LocalClient, clientName);
  }

  get(clientName?: string) {
    const client = this.getClient(clientName);
    return client.knex;
  }

  getDbOriginal() {
    const clientName = this.ctx.dbLevel === 0 ? '' : `:${this.ctx.dbLevel}`;
    return this.get(clientName);
  }
}
