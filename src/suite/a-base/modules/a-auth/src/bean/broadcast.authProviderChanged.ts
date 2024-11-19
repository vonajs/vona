import { Bean, BeanBase } from 'vona';

@Bean({ scene: 'broadcast' })
export class BroadcastAuthProviderChanged extends BeanBase {
  async execute(context) {
    const sameAsCaller = context.sameAsCaller;
    const data = context.data;
    if (!sameAsCaller) {
      await this.app.bean.authProviderCache._cacheAuthProviderConfig(data.module, data.providerName);
    }
  }
}
