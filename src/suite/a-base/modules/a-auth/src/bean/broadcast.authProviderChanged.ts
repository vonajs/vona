import { BeanBroadcastBase, Broadcast, IBroadcastExecute } from 'vona-module-a-broadcast';

export type TypeBroadcastAuthProviderChangedJobData = {
  module: string;
  providerName: string;
};

@Broadcast()
export class BroadcastAuthProviderChanged
  extends BeanBroadcastBase<TypeBroadcastAuthProviderChangedJobData>
  implements IBroadcastExecute<TypeBroadcastAuthProviderChangedJobData>
{
  async execute(data: TypeBroadcastAuthProviderChangedJobData, isEmitter?: boolean) {
    if (!isEmitter) {
      await this.app.bean.authProviderCache._cacheAuthProviderConfig(data.module, data.providerName);
    }
  }
}
