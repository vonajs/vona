import { Bean, BeanBase } from 'vona';

@Bean({ scene: 'startup' })
export class StartupCacheSmsProviders extends BeanBase {
  async execute(/* context*/) {
    // cache all smsProviders
    await this.app.bean.smsProviderCache._cacheSmsProvidersConfig();
  }
}
