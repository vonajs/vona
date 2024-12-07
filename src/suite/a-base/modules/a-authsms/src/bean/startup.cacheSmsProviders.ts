import { BeanBase, IStartupExecute, Startup } from 'vona';

@Startup({ instance: true })
export class StartupCacheSmsProviders extends BeanBase implements IStartupExecute {
  async execute(/* context*/) {
    // cache all smsProviders
    await this.app.bean.smsProviderCache._cacheSmsProvidersConfig();
  }
}
