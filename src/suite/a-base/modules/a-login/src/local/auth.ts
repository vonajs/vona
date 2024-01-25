import { BeanBase, Local } from '@cabloy/core';

@Local()
export class LocalAuth extends BeanBase {
  async list() {
    return this.ctx.bean.authProviderCache.getAuthProvidersConfigForLogin();
  }
}
