import { Bean } from 'vona-module-a-bean';
import { BeanBase } from 'vona';
import { __ThisModule__ } from '../.metadata/this.js';
import type { BeanDatabaseDialectBase } from './bean.databaseDialectBase.js';
import { ServiceDatabaseClient } from '../service/databaseClient.js';
import type { IDatabaseClientRecord, IDatabaseClientDialectRecord } from '../types/database.js';

@Bean()
export class BeanDatabase extends BeanBase {
  getClient(clientName?: keyof IDatabaseClientRecord) {
    return this.app.bean._getBeanSelector(ServiceDatabaseClient, clientName);
  }

  get(clientName?: keyof IDatabaseClientRecord) {
    const client = this.getClient(clientName);
    return client.db;
  }

  getClientDefault() {
    const clientName = this.ctx.dbLevel === 0 ? '' : `:${this.ctx.dbLevel}`;
    return this.getClient(clientName as keyof IDatabaseClientRecord);
  }

  getDefault() {
    const client = this.getClientDefault();
    return client.db;
  }

  getDialect(client: keyof IDatabaseClientDialectRecord): BeanDatabaseDialectBase {
    const beanFullName = this.scope.config.dialects[client];
    const dialect = this.app.bean._getBean(beanFullName) as BeanDatabaseDialectBase;
    if (!dialect) {
      throw new Error(`database dialect not found: ${client}`);
    }
    return dialect;
  }
}
