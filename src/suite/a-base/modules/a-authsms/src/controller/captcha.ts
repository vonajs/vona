import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../resource/this.js';

@Controller()
export class ControllerCaptcha extends BeanBase<ScopeModule> {
  async sendCode() {
    await this.scope.service.captcha.sendCode({
      providerInstanceId: this.ctx.request.body.providerInstanceId,
      context: this.ctx.request.body.context,
    });
    this.ctx.success();
  }
}
