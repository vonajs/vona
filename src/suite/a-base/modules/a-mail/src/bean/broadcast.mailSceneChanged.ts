import { BeanBroadcastBase, Broadcast, IBroadcastExecute } from 'vona-module-a-broadcast';

export type TypeBroadcastMailSceneChangedJobData = unknown;

@Broadcast()
export class BroadcastMailSceneChanged
  extends BeanBroadcastBase<TypeBroadcastMailSceneChangedJobData>
  implements IBroadcastExecute<TypeBroadcastMailSceneChangedJobData>
{
  async execute(_data: TypeBroadcastMailSceneChangedJobData, isEmitter?: boolean) {
    if (!isEmitter) {
      await this.app.bean.mailSceneCache._cacheMailScenesConfig();
    }
  }
}
