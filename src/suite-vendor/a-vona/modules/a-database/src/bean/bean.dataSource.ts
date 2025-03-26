import type { FunctionAsync } from 'vona';
import type { IDataSourceSwitchOptions } from '../types/dataSource.ts';
import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';
import { ServiceDbMeta } from '../service/dbMeta.ts';

@Bean()
export class BeanDataSource extends BeanBase {
  async switch<RESULT>(fn: FunctionAsync<RESULT>, options?: IDataSourceSwitchOptions): Promise<RESULT> {
    const clientName = options?.clientName || this.app.config.database.defaultClient;
    // check if the same
    if (this.ctx.dbMeta.currentClient.clientName === clientName) {
      return await fn();
    }
    // dbMetaPrevious
    const dbMetaPrevious = this.ctx.dbMeta;
    this.ctx.dbMeta = this.ctx.bean._newBean(ServiceDbMeta, clientName);
    // fn
    try {
      return await fn();
    } finally {
      // restore
      this.ctx.dbMeta = dbMetaPrevious;
    }
  }
}
