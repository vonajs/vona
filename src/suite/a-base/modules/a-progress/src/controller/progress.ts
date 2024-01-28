import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModule } from '../resource/this.js';

@Controller()
export class ControllerProgress extends BeanBase<ScopeModule> {
  async check() {
    const res = await this.scope.local.progress.check({
      progressId: this.ctx.request.body.progressId,
      counter: this.ctx.request.body.counter,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async abort() {
    await this.scope.local.progress.abort({
      progressId: this.ctx.request.body.progressId,
      user: this.ctx.state.user.op,
    });
    this.ctx.success();
  }

  async delete() {
    await this.scope.local.progress.delete({
      progressId: this.ctx.request.body.progressId,
      user: this.ctx.state.user.op,
    });
    this.ctx.success();
  }
}
