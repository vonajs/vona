import { BeanBroadcastBase, Broadcast, IBroadcastExecute } from 'vona-module-a-broadcast';

export type TypeBroadcastSmsProviderChangedJobData = unknown;

@Broadcast()
export class BroadcastSmsProviderChanged
  extends BeanBroadcastBase<TypeBroadcastSmsProviderChangedJobData>
  implements IBroadcastExecute<TypeBroadcastSmsProviderChangedJobData>
{
  async execute(_data: TypeBroadcastSmsProviderChangedJobData, isEmitter?: boolean) {
    if (!isEmitter) {
      await this.app.bean.smsProviderCache._cacheSmsProvidersConfig();
    }
  }
}
