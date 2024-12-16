import { BeanBroadcastBase, Broadcast, IBroadcastExecute } from 'vona-module-a-broadcast';

export type TypeBroadcastSocketEmitJobData = unknown;

@Broadcast()
export class BroadcastSocketEmit
  extends BeanBroadcastBase<TypeBroadcastSocketEmitJobData>
  implements IBroadcastExecute<TypeBroadcastSocketEmitJobData>
{
  async execute(data: TypeBroadcastSocketEmitJobData, _isEmitter?: boolean) {
    this.app.bean.io.broadcastSocketEmit(data);
  }
}
