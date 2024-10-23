import { BeanBase, Local } from 'vona';

@Local()
export class LocalAuth extends BeanBase {
  async list() {
    return this.ctx.bean.authProviderCache.getAuthProvidersConfigForLogin();
  }
}
