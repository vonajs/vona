import { BeanBase, Service } from 'vona';
import { __ThisModule__ } from '../.metadata/this.js';

@Service()
export class ServiceSmsProvider extends BeanBase {
  async list() {
    return this.app.bean.smsProviderCache.getSmsProvidersConfigForAdmin();
  }

  async setCurrent({ providerName }: any) {
    const providers = this.app.bean.smsProviderCache.getSmsProvidersConfigCache();
    const providerNameOld = Object.keys(providers).find(providerName => providers[providerName].current);
    if (providerNameOld) {
      providers[providerNameOld].current = false;
    }
    providers[providerName].current = true;
    // update
    await this.scope.status.set('smsProviders', providers);
    // changed
    await this.app.bean.smsProviderCache.smsProviderChanged();
  }

  async save({ providerName, data }: any) {
    const providers = this.app.bean.smsProviderCache.getSmsProvidersConfigCache();
    const providerOld = providers[providerName];
    data = this.app.bean.util.extend({}, providerOld, data);
    await this._save({ providerName, data });
  }

  async _save({ providerName, data }: any) {
    const providers = this.app.bean.smsProviderCache.getSmsProvidersConfigCache();
    providers[providerName] = data ? this.app.bean.smsProviderCache.purgeProvider(data) : data;
    // update
    await this.scope.status.set('smsProviders', providers);
    // changed
    await this.app.bean.smsProviderCache.smsProviderChanged();
  }
}
