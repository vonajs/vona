mport { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';

@Controller()
export class ControllerCaptcha extends BeanBase {
  async createProviderInstance() {
    const res = await this.scope.service.captcha.createProviderInstance({
      module: this.ctx.request.body.module,
      sceneName: this.ctx.request.body.sceneName,
      context: this.ctx.request.body.context,
    });
    this.app.success(res);
  }

  async refreshProviderInstance() {
    const res = await this.scope.service.captcha.refreshProviderInstance({
      providerInstanceId: this.ctx.request.body.providerInstanceId,
      module: this.ctx.request.body.module,
      sceneName: this.ctx.request.body.sceneName,
      context: this.ctx.request.body.context,
    });
    this.app.success(res);
  }
}
