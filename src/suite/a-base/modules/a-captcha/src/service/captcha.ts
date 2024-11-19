import { BeanBase, Service } from 'vona';

@Service()
export class ServiceCaptcha extends BeanBase {
  async createProviderInstance({ module, sceneName, context }: any) {
    return await this.app.bean.captcha.createProviderInstance({ module, sceneName, context });
  }

  async refreshProviderInstance({ providerInstanceId, module, sceneName, context }: any) {
    return await this.app.bean.captcha.refreshProviderInstance({ providerInstanceId, module, sceneName, context });
  }
}
