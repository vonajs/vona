import { Bean } from 'vona-module-a-bean';
import { BeanBase } from 'vona';

const __smsProvidersConfigCache: any = {};

@Bean()
export class BeanSmsProviderCache extends BeanBase {
  get configModule() {
    return this.scope.config;
  }

  getSmsProvidersConfigCache() {
    return __smsProvidersConfigCache[this.ctx.subdomain];
  }

  getSmsProviderConfigCache(providerName) {
    return __smsProvidersConfigCache[this.ctx.subdomain][providerName];
  }

  getSmsProvidersConfigForAdmin() {
    let providers = this.getSmsProvidersConfigCache();
    providers = this.app.bean.util.extend({}, providers);
    for (const providerName in providers) {
      const provider = providers[providerName];
      provider.titleLocale = this.app.text(provider.title);
    }
    return providers;
  }

  async smsProviderChanged() {
    // change self
    await this._cacheSmsProvidersConfig();
    // broadcast
    this.scope.broadcast.smsProviderChanged.emit();
  }

  purgeProvider(provider) {
    const res = this.app.bean.util.extend({}, provider);
    delete res.titleLocale;
    return res;
  }

  async _cacheSmsProvidersConfig() {
    // configDefault
    const configDefault = this.configModule.sms.providers;
    // configProviders
    let configProviders = await this.scope.status.get('smsProviders');
    configProviders = this.app.bean.util.extend({}, configDefault, configProviders);
    // cache
    __smsProvidersConfigCache[this.ctx.subdomain] = configProviders;
  }
}
