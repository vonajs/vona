import { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';

@Controller()
export class ControllerCaptcha extends BeanBase {
  async sendCode() {
    await this.scope.service.captcha.sendCode({
      providerInstanceId: this.ctx.request.body.providerInstanceId,
      context: this.ctx.request.body.context,
    });
    this.app.success();
  }
}
