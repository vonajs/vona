import { BeanBase, IStartupExecute, Startup } from 'vona';

@Startup({ instance: true })
export class StartupCacheAuthProviders extends BeanBase implements IStartupExecute {
  async execute() {
    // cache all authProviders
    await this.app.bean.authProviderCache._cacheAuthProvidersConfig();
  }
}
