import { Bean, BeanBase } from '@cabloy/core';
import { LocalClient } from '../local/local.client.js';

@Bean()
export class BeanDatabase extends BeanBase {
  get(clientName?: string) {
    const client = this.app.bean._getBeanSelector(LocalClient, clientName);
    return client.knex;
  }

  getDbOriginal() {
    const clientName = `:${this.ctx.dbLevel}`;
    return this.get(clientName);
  }
}
