import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../resource/this.js';

@Controller()
export class ControllerUser extends BeanBase<ScopeModule> {
  async getLabels() {
    const res = await this.scope.service.user.getLabels({
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async setLabels() {
    await this.scope.service.user.setLabels({
      labels: this.ctx.request.body.labels,
      user: this.ctx.state.user.op,
    });
    this.ctx.success();
  }
}
