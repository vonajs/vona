import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'broadcast' })
export class BroadcastSmsProviderChanged extends BeanBase {
  async execute(context) {
    const sameAsCaller = context.sameAsCaller;
    if (!sameAsCaller) {
      await this.ctx.bean.smsProviderCache._cacheSmsProvidersConfig();
    }
  }
}
