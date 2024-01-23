import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleACaptcha } from '../index.js';

@Controller()
export class ControllerCaptcha extends BeanBase {
  @Use()
  scope: ScopeModuleACaptcha;

  async createProviderInstance() {
    const res = await this.scope.local.captcha.createProviderInstance({
      module: this.ctx.request.body.module,
      sceneName: this.ctx.request.body.sceneName,
      context: this.ctx.request.body.context,
    });
    this.ctx.success(res);
  }

  async refreshProviderInstance() {
    const res = await this.scope.local.captcha.refreshProviderInstance({
      providerInstanceId: this.ctx.request.body.providerInstanceId,
      module: this.ctx.request.body.module,
      sceneName: this.ctx.request.body.sceneName,
      context: this.ctx.request.body.context,
    });
    this.ctx.success(res);
  }
}
