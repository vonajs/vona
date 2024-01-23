import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleACli } from '../index.js';

@Controller()
export class ControllerCli extends BeanBase {
  async meta() {
    const res = await this.ctx.service.cli.meta({
      context: this.ctx.request.body.context,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async execute() {
    const res = await this.ctx.service.cli.execute({
      progressId: this.ctx.request.body.progressId,
      context: this.ctx.request.body.context,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }
}
