import type { IBeanRecord } from 'vona';
import type { IBroadcastExecute } from 'vona-module-a-broadcast';
import { BeanBroadcastBase, Broadcast } from 'vona-module-a-broadcast';

export interface TypeBroadcastDisposeInstancesJobData {
  beanFullName: keyof IBeanRecord;
  data: unknown;
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
