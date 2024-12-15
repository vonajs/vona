import { BeanBroadcastBase, Broadcast, IBroadcastExecute } from 'vona-module-a-broadcast';

export type TypeBroadcastMemRemoveJobData = {
  moduleName: string;
  name: string;
};

@Broadcast()
export class BroadcastMemRemove
  extends BeanBroadcastBase<TypeBroadcastMemRemoveJobData>
  implements IBroadcastExecute<TypeBroadcastMemRemoveJobData>
{
  async execute(data: TypeBroadcastMemRemoveJobData, isEmitter?: boolean) {
    if (!isEmitter) {
      const moduleCache = this.ctx.cache.mem.module(data.moduleName);
      moduleCache._remove(data.name);
    }
  }
}
