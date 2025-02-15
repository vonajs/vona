import type { IBroadcastExecute } from 'vona-module-a-broadcast';
import { BeanBroadcastBase, Broadcast } from 'vona-module-a-broadcast';

export interface TypeBroadcastColumnsClearJobData {
  mode?: 'all';
  tableName?: string;
}

@Broadcast({ instance: false })
export class BroadcastColumnsClear
  extends BeanBroadcastBase<TypeBroadcastColumnsClearJobData>
  implements IBroadcastExecute<TypeBroadcastColumnsClearJobData> {
  async execute(data: TypeBroadcastColumnsClearJobData, isEmitter?: boolean) {
    const { mode, tableName } = data;
    if (!isEmitter) {
      // clear columns cache
      if (mode === 'all') {
        this.bean.model.columnsClearAll();
      } else {
        this.bean.model.columnsClear(tableName);
      }
    }
  }
}
