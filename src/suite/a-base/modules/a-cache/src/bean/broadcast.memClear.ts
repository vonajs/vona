import { BeanBroadcastBase, Broadcast, IBroadcastExecute } from 'vona-module-a-broadcast';

export type TypeBroadcastMemClearJobData = {
  moduleName: string;
};

@Broadcast()
export class BroadcastMemClear
  extends BeanBroadcastBase<TypeBroadcastMemClearJobData>
  implements IBroadcastExecute<TypeBroadcastMemClearJobData>
{
  async execute(data: TypeBroadcastMemClearJobData, isEmitter?: boolean) {
    if (!isEmitter) {
      const moduleCache = this.ctx.cache.mem.module(data.moduleName);
      moduleCache._clear();
    }
  }
}
