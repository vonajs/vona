import type { IBroadcastExecute } from 'vona-module-a-broadcast';
import { BeanBroadcastBase, Broadcast } from 'vona-module-a-broadcast';

export interface TypeBroadcastReloadBeanJobData { sceneName: string; file: string }

@Broadcast()
export class BroadcastReloadBean
  extends BeanBroadcastBase<TypeBroadcastReloadBeanJobData>
  implements IBroadcastExecute<TypeBroadcastReloadBeanJobData> {
  async execute(data: TypeBroadcastReloadBeanJobData, isEmitter?: boolean) {
    console.log(isEmitter, process.pid);
    if (!isEmitter) {
      await this.scope.service.watch._reloadBeanWorker(data);
    }
  }
}
