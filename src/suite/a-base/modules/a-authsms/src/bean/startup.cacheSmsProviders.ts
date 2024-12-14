import { BeanBase } from 'vona';
import { IStartupExecute, Startup } from 'vona-module-a-startup';

@Startup({ instance: true })
export class StartupCacheSmsProviders extends BeanBase implements IStartupExecute {
  async execute(/* context*/) {
    // cache all smsProviders
    await this.app.bean.smsProviderCache._cacheSmsProvidersConfig();
  }
}
