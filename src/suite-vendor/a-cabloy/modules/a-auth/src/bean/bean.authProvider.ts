import type { EntityAuthProvider } from '../entity/authProvider.ts';
import type { IAuthProviderClientRecord, IAuthProviderRecord } from '../types/authProvider.ts';
import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';

@Bean()
export class BeanAuthProvider extends BeanBase {
  async getByOnionName(onionName: keyof IAuthProviderRecord, clientName?: keyof IAuthProviderClientRecord) {
    const [module, providerName] = onionName.split(':');
    return await this.get({ module, providerName, clientName });
  }

  async getById(id: number) {
    return await this.get({ id });
  }

  async get(data: Partial<EntityAuthProvider>) {
    if (!data.clientName) data = { ...data, clientName: 'default' };
    const res = await this.scope.model.authProvider.get(data);
    if (res) return res;
    if (!data.module || !data.providerName) throw new Error('Invalid auth provider');
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
      module: data.module,
      providerName: data.providerName,
      clientName: data.clientName,
      clientOptions: undefined,
    };
    // create
    return await this.scope.model.authProvider.insert(dataNew);
  }
}
