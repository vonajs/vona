import type { IBroadcastExecute } from 'vona-module-a-broadcast';
import { BeanBroadcastBase, Broadcast } from 'vona-module-a-broadcast';

export interface TypeBroadcastReloadBeanJobData { file: string }

@Broadcast()
export class BroadcastReloadBean
  extends BeanBroadcastBase<TypeBroadcastReloadBeanJobData>
  implements IBroadcastExecute<TypeBroadcastReloadBeanJobData> {
  async execute(data: TypeBroadcastReloadBeanJobData, isEmitter?: boolean) {
    if (!isEmitter) {
      await this.scope.service.watch._reloadBeanWorker(data);
    }
  }
}
