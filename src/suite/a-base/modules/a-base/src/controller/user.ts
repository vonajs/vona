mport { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';

@Controller()
export class ControllerUser extends BeanBase {
  async getLabels() {
    const res = await this.scope.service.user.getLabels({
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }

  async setLabels() {
    await this.scope.service.user.setLabels({
      labels: this.ctx.request.body.labels,
      user: this.ctx.state.user.op,
    });
    this.app.success();
  }
}
