import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleABase } from '../index.js';

@Controller()
export class ControllerUser extends BeanBase {
  async getLabels() {
    const res = await this.ctx.service.user.getLabels({
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async setLabels() {
    await this.ctx.service.user.setLabels({
      labels: this.ctx.request.body.labels,
      user: this.ctx.state.user.op,
    });
    this.ctx.success();
  }
}
