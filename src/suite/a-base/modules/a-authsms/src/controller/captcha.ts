import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleAAuthsms } from '../index.js';

@Controller()
export class ControllerCaptcha extends BeanBase {
  async sendCode() {
    await this.ctx.service.captcha.sendCode({
      providerInstanceId: this.ctx.request.body.providerInstanceId,
      context: this.ctx.request.body.context,
    });
    this.ctx.success();
  }
}
