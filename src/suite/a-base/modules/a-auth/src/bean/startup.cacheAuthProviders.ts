import { BeanBase } from 'vona';
import { IStartupExecute, Startup } from 'vona-module-a-startup';

@Startup({ instance: true })
export class StartupCacheAuthProviders extends BeanBase implements IStartupExecute {
  async execute() {
    // cache all authProviders
    await this.app.bean.authProviderCache._cacheAuthProvidersConfig();
  }
}
