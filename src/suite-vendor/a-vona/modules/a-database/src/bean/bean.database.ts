import { Bean } from 'vona-module-a-bean';
import { BeanBase } from 'vona';
import { __ThisModule__ } from '../.metadata/this.js';
import { BeanDatabaseDialectBase } from './bean.databaseDialectBase.js';
import { ServiceDatabaseClient } from '../service/databaseClient.js';

@Bean()
export class BeanDatabase extends BeanBase {
  getClient(clientName?: string) {
    return this.app.bean._getBeanSelector(ServiceDatabaseClient, clientName);
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

  getDialect(client: string): BeanDatabaseDialectBase {
    const beanFullName = this.scope.config.dialects[client];
    const dialect = this.app.bean._getBean(beanFullName) as BeanDatabaseDialectBase;
    if (!dialect) {
      throw new Error(`database dialect not found: ${client}`);
    }
    return dialect;
  }
}
