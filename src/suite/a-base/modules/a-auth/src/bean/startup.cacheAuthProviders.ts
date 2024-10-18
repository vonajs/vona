import { Bean, BeanBase } from 'vona';

@Bean({ scene: 'startup' })
export class StartupCacheAuthProviders extends BeanBase {
  async execute(/* context*/) {
    // cache all authProviders
    await this.ctx.bean.authProviderCache._cacheAuthProvidersConfig();
  }
}
