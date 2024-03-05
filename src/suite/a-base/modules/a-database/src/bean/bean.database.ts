import { Bean, BeanBase } from '@cabloy/core';
import { BeanDatabaseClient } from './bean.databaseClient.js';
import { VirtualDatabaseDialect } from './virtual.databaseDialect.js';
import { __ThisModule__ } from '../resource/this.js';

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

  getDialect(client: string): VirtualDatabaseDialect {
    const beanFullName = `${__ThisModule__}.database.dialect.${client}`;
    const dialect = this.app.bean._getBean(beanFullName) as VirtualDatabaseDialect;
    if (!dialect) {
      throw new Error(`database dialect not found: ${client}`);
    }
    return dialect;
  }
}
