import { BeanBroadcastBase, Broadcast, type IBroadcastExecute } from 'vona-module-a-broadcast';

export type TypeBroadcastReloadAllJobData = unknown;

@Broadcast()
export class BroadcastReloadAll
  extends BeanBroadcastBase<TypeBroadcastReloadAllJobData>
  implements IBroadcastExecute<TypeBroadcastReloadAllJobData>
{
  async execute(_data: TypeBroadcastReloadAllJobData, _isEmitter?: boolean) {
    await this.bean.worker.reload();
  }
}
