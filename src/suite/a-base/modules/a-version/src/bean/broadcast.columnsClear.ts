import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'broadcast' })
export class BroadcastColumnsClear extends BeanBase {
  async execute(context) {
    const sameAsCaller = context.sameAsCaller;
    const { mode, tableName } = context.data;
    if (!sameAsCaller) {
      // clear columns cache
      if (mode === 'all') {
        this.bean.model.columnsClearAll();
      } else {
        this.bean.model.columnsClear(tableName);
      }
    }
  }
}
