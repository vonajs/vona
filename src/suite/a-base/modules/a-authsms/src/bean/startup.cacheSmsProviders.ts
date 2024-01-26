import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'startup' })
export class StartupCacheSmsProviders extends BeanBase {
  async execute(/* context*/) {
    // cache all smsProviders
    await this.ctx.bean.smsProviderCache._cacheSmsProvidersConfig();
  }
}
