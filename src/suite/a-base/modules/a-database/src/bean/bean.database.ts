import { Bean, BeanBase } from '@cabloy/core';
import { BeanDatabaseClient } from './bean.databaseClient.js';

@Bean()
export class BeanDatabase extends BeanBase {
  getClient(clientName?: string) {
    return this.app.bean._getBeanSelector(BeanDatabaseClient, clientName);
  }

  get(clientName?: string) {
    const client = this.getClient(clientName);
    return client.db;
  }

  getClientDefault() {
    const clientName = this.ctx.dbLevel === 0 ? '' : `:${this.ctx.dbLevel}`;
    return this.getClient(clientName);
  }

  getDefault() {
    const client = this.getClientDefault();
    return client.db;
  }
}
