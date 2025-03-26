import type { FunctionAsync } from 'vona';
import type { IDataSourceSwitchOptions } from '../types/dataSource.ts';
import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';

@Bean()
export class BeanDataSource extends BeanBase {
  async switch<RESULT>(fn: FunctionAsync<RESULT>, options?: IDataSourceSwitchOptions): Promise<RESULT> {
    const clientName = options?.clientName || this.app.config.database.defaultClient;
    // check if the same
    if (this.ctx.dbMeta.currentClient.clientName === clientName) {
      return await fn();
    }
    const dbMetaPrevious = this.ctx.dbMeta;

    // 先判断与当前数据源是否一致
    // 将现有dbMeta保存起来，在finally中进行恢复
  }
}
