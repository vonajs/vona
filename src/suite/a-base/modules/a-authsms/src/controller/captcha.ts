import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleAAuthsms } from '../index.js';

@Controller()
export class ControllerCaptcha extends BeanBase {
  @Use()
  scope: ScopeModuleAAuthsms;

  async sendCode() {
    await this.scope.local.captcha.sendCode({
      providerInstanceId: this.ctx.request.body.providerInstanceId,
      context: this.ctx.request.body.context,
    });
    this.ctx.success();
  }
}
