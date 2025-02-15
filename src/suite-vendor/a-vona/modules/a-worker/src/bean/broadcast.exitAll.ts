import type { IBroadcastExecute } from 'vona-module-a-broadcast';
import { BeanBroadcastBase, Broadcast } from 'vona-module-a-broadcast';

export interface TypeBroadcastExitAllJobData {
  code?: number | string | null | undefined;
}

@Broadcast()
export class BroadcastExitAll
  extends BeanBroadcastBase<TypeBroadcastExitAllJobData>
  implements IBroadcastExecute<TypeBroadcastExitAllJobData> {
  async execute(data: TypeBroadcastExitAllJobData, _isEmitter?: boolean) {
    await this.bean.worker.exit(data.code);
  }
}
