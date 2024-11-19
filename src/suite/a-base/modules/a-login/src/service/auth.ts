import { BeanBase, Service } from 'vona';

@Service()
export class ServiceAuth extends BeanBase {
  async list() {
    return this.app.bean.authProviderCache.getAuthProvidersConfigForLogin();
  }
}
