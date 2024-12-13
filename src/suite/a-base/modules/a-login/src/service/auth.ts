import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';

@Service()
export class ServiceAuth extends BeanBase {
  async list() {
    return this.app.bean.authProviderCache.getAuthProvidersConfigForLogin();
  }
}
