import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';

@Service()
export class ServiceAuth extends BeanBase {
  get modelAuthProvider() {
    return this.$scope.auth.model.authProvider;
  }

  async list() {
    return this.app.bean.authProviderCache.getAuthProvidersConfigForAdmin();
  }

  async disable({ id, disabled }: any) {
    // check if only one
    if (disabled) {
      const list = this.app.bean.authProviderCache.getAuthProvidersConfigForLogin();
      if (list.length <= 1) this.app.throw(1001);
    }
    // update
    await this.modelAuthProvider.update({ id, disabled });
    // item
    const item = await this.modelAuthProvider.get({ id });
    if (!item) return;
    // changed
    await this.app.bean.authProviderCache.authProviderChanged({
      module: item.module,
      providerName: item.providerName,
    });
  }

  async save({ id, config }: any) {
    // update
    await this.modelAuthProvider.update({ id, config: JSON.stringify(config) });
    // item
    const item = await this.modelAuthProvider.get({ id });
    if (!item) return;
    // changed
    await this.app.bean.authProviderCache.authProviderChanged({
      module: item.module,
      providerName: item.providerName,
    });
  }
}
