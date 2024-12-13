import { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';

@Controller()
export class ControllerUtil extends BeanBase {
  async performAction() {
    const res = await this.scope.service.util.performAction({
      params: JSON.parse(this.ctx.request.query.params),
    });
    this.app.success(res);
  }

  async performActions() {
    const res = await this.scope.service.util.performActions({
      actions: this.ctx.request.body.actions,
    });
    this.app.success(res);
  }
}
