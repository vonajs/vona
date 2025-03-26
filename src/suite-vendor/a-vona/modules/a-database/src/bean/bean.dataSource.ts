// import type { FunctionAsync } from 'vona';
import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';

@Bean()
export class BeanDataSource extends BeanBase {
  // async switch<RESULT>(fn: FunctionAsync<RESULT>, options?: IDataSourceSwitchOptions): Promise<RESULT> {
  //   // 先判断与当前数据源是否一致
  //   // 将现有dbMeta保存起来，在finally中进行恢复
  // }
}
