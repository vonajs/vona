import type { IBroadcastExecute } from 'vona-module-a-broadcast';
import { BeanBroadcastBase, Broadcast } from 'vona-module-a-broadcast';

export type TypeBroadcastReloadInstancesJobData = unknown;

@Broadcast()
export class BroadcastReloadInstances
  extends BeanBroadcastBase<TypeBroadcastReloadInstancesJobData>
  implements IBroadcastExecute<TypeBroadcastReloadInstancesJobData> {
  async execute(data: TypeBroadcastReloadInstancesJobData, isEmitter?: boolean) {
    if (!isEmitter) {
      await this.bean.mutate.reloadInstancesWorker(data);
    }
  }
}
