import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModule } from '../resource/this.js';

@Controller()
export class ControllerCaptcha extends BeanBase<ScopeModule> {
  async sendCode() {
    await this.scope.local.captcha.sendCode({
      providerInstanceId: this.ctx.request.body.providerInstanceId,
      context: this.ctx.request.body.context,
    });
    this.ctx.success();
  }
}
