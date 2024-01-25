import { BeanBase, Local } from '@cabloy/core';

@Local()
export class LocalCaptcha extends BeanBase {
  async createProviderInstance({ module, sceneName, context }) {
    return await this.ctx.bean.captcha.createProviderInstance({ module, sceneName, context });
  }

  async refreshProviderInstance({ providerInstanceId, module, sceneName, context }) {
    return await this.ctx.bean.captcha.refreshProviderInstance({ providerInstanceId, module, sceneName, context });
  }
}
