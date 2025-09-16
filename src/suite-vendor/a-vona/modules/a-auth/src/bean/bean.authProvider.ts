import type { EntityAuthProvider } from '../entity/authProvider.ts';
import type { IAuthProviderClientRecord, IAuthProviderRecord } from '../types/authProvider.ts';
import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';

@Bean()
export class BeanAuthProvider extends BeanBase {
  async getByProviderName(providerName: keyof IAuthProviderRecord, clientName?: keyof IAuthProviderClientRecord) {
    return await this.get({ providerName, clientName });
  }

  async getById(id: number) {
    return await this.get({ id });
  }

  async get(data: Partial<EntityAuthProvider>) {
    if (!data.id && !data.clientName) data = { ...data, clientName: 'default' };
    const res = await this.scope.model.authProvider.get(data);
    if (res) return res;
    if (!data.providerName) throw new Error('Invalid auth provider');
    // lock
    return await this.scope.redlock.lockIsolate('authProvider.register', async () => {
      return await this._registerAuthProviderLock(data);
    });
  }

  private async _registerAuthProviderLock(data: Partial<EntityAuthProvider>) {
    // get
    const res = await this.scope.model.authProvider.get(data);
    if (res) return res;
    const dataNew: Partial<EntityAuthProvider> = {
      disabled: false,
      providerName: data.providerName,
      clientName: data.clientName,
      clientOptions: undefined,
    };
    // create
    return await this.scope.model.authProvider.insert(dataNew);
  }
}
