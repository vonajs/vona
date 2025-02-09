import { BeanBroadcastBase, Broadcast, IBroadcastExecute } from 'vona-module-a-broadcast';

export type TypeBroadcastExitAllJobData = {
  code?: number | string | null | undefined;
};

@Broadcast()
export class BroadcastExitAll
  extends BeanBroadcastBase<TypeBroadcastExitAllJobData>
  implements IBroadcastExecute<TypeBroadcastExitAllJobData>
{
  async execute(data: TypeBroadcastExitAllJobData, isEmitter?: boolean) {
    if (!isEmitter) {
      await this.bean.worker.exit(data.code);
    }
  }
}
