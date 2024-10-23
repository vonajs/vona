import { BeanBase, Service } from 'vona';

@Service()
export class ServiceAuth extends BeanBase {
  async list() {
    return this.ctx.bean.authProviderCache.getAuthProvidersConfigForLogin();
  }
}
