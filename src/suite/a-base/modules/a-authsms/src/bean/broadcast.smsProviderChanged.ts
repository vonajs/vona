import { Bean, BeanBase } from 'vona';

@Bean({ scene: 'broadcast' })
export class BroadcastSmsProviderChanged extends BeanBase {
  async execute(context) {
    const sameAsCaller = context.sameAsCaller;
    if (!sameAsCaller) {
      await this.app.bean.smsProviderCache._cacheSmsProvidersConfig();
    }
  }
}
