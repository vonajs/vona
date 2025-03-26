import type { FunctionAsync } from 'vona';
import type { IDatabaseClientDialectRecord, IDatabaseClientRecord, IDatabaseSwitchOptions } from '../types/database.ts';
import type { BeanDatabaseDialectBase } from './bean.databaseDialectBase.ts';
import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';
import { ServiceDatabaseClient } from '../service/databaseClient.ts';
import { ServiceDbMeta } from '../service/dbMeta.ts';

@Bean()
export class BeanDatabase extends BeanBase {
  getClient(clientName?: keyof IDatabaseClientRecord) {
    return this.app.bean._getBeanSelector(ServiceDatabaseClient, this.prepareClientNameSelector(clientName));
  }

  prepareClientNameSelector(clientName?: keyof IDatabaseClientRecord) {
    const clientName2 = (!clientName || clientName === this.app.config.database.defaultClient) ? '' : clientName;
    return this.ctx.dbLevel === 0 ? clientName2 : `${clientName2}:${this.ctx.dbLevel}`;
  }

  get(clientName?: keyof IDatabaseClientRecord) {
    const client = this.getClient(clientName);
    return client.db;
  }

  getClientDefault() {
    return this.getClient();
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

  createDbMeta(clientName?: keyof IDatabaseClientRecord) {
    return this.ctx.bean._newBean(ServiceDbMeta, clientName);
  }

  async switchClient<RESULT>(fn: FunctionAsync<RESULT>, options?: IDatabaseSwitchOptions): Promise<RESULT> {
    const clientName = options?.clientName || this.app.config.database.defaultClient;
    // check if the same
    if (this.ctx.dbMeta.currentClientName === clientName) {
      return await fn();
    }
    // dbMetaPrevious
    const dbMetaPrevious = this.ctx.dbMeta;
    this.ctx.dbMeta = this.createDbMeta(clientName);
    // fn
    try {
      return await fn();
    } finally {
      // restore
      this.ctx.dbMeta = dbMetaPrevious;
    }
  }
}
