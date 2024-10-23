import { BeanBase, Service } from 'vona';
import { ScopeModule } from '../resource/this.js';

@Service()
export class ServiceAuth extends BeanBase<ScopeModule> {
  get modelAuthProvider() {
    return this.getScope('a-auth').model.authProvider;
  }

  async list() {
    return this.ctx.bean.authProviderCache.getAuthProvidersConfigForAdmin();
  }

  async disable({ id, disabled }: any) {
    // check if only one
    if (disabled) {
      const list = this.ctx.bean.authProviderCache.getAuthProvidersConfigForLogin();
      if (list.length <= 1) this.ctx.throw(1001);
    }
    // update
    await this.modelAuthProvider.update({ id, disabled });
    // item
    const item = await this.modelAuthProvider.get({ id });
    if (!item) return;
    // changed
    await this.ctx.bean.authProviderCache.authProviderChanged({
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
    await this.ctx.bean.authProviderCache.authProviderChanged({
      module: item.module,
      providerName: item.providerName,
    });
  }
}
