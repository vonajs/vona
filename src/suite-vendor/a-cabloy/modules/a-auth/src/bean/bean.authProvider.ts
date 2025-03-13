import type { EntityAuthProvider } from '../entity/authProvider.ts';
import type { IAuthProviderRecord } from '../types/authProvider.ts';
import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';

@Bean()
export class BeanAuthProvider extends BeanBase {
  async getByOnionName(onionName: keyof IAuthProviderRecord) {
    const [module, providerName] = onionName.split(':');
    return await this.get({ module, providerName });
  }

  async getById(id: number) {
    return await this.get({ id });
  }

  async get(data: Partial<EntityAuthProvider>) {
    const res = await this.scope.model.authProvider.get(data);
    if (res) return res;
    if (!data.module || !data.providerName) throw new Error('Invalid auth provider');
    // lock
    return await this.scope.redlock.lockIsolate('authProvider.register', async () => {
      return await this._registerAuthProviderLock({ module, providerName });
    });
  }
}
