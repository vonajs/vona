import type { IBroadcastExecute } from 'vona-module-a-broadcast';
import { BeanBroadcastBase, Broadcast } from 'vona-module-a-broadcast';

export type TypeBroadcastDisposeInstancesJobData = unknown;

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
