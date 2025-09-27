import type { IBroadcastExecute } from 'vona-module-a-broadcast';
import type { IDatabaseClientRecord } from '../types/database.ts';
import { cast } from 'vona';
import { BeanBroadcastBase, Broadcast } from 'vona-module-a-broadcast';

export interface TypeBroadcastDisposeInstancesJobData {
  clientName?: keyof IDatabaseClientRecord;
}

@Broadcast()
export class BroadcastDisposeInstances
  extends BeanBroadcastBase<TypeBroadcastDisposeInstancesJobData>
  implements IBroadcastExecute<TypeBroadcastDisposeInstancesJobData> {
  async execute(data: TypeBroadcastDisposeInstancesJobData, isEmitter?: boolean) {
    if (!isEmitter) {
      await this.bean.mutate.disposeInstancesWorker(data);
    }
  }
}
