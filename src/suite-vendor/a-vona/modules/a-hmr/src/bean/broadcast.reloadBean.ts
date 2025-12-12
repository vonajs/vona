import type { IBroadcastExecute } from 'vona-module-a-broadcast';
import type { TypeHmrWatchScene } from '../types/hmr.ts';
import { BeanBroadcastBase, Broadcast } from 'vona-module-a-broadcast';

export interface TypeBroadcastReloadBeanJobData { sceneName: TypeHmrWatchScene; file: string }

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
