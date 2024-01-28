import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModule } from '../resource/this.js';

@Controller()
export class ControllerUser extends BeanBase<ScopeModule> {
  async getLabels() {
    const res = await this.scope.local.user.getLabels({
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async setLabels() {
    await this.scope.local.user.setLabels({
      labels: this.ctx.request.body.labels,
      user: this.ctx.state.user.op,
    });
    this.ctx.success();
  }
}
