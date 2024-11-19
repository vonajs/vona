import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Controller()
export class ControllerProgress extends BeanBase<ScopeModule> {
  async check() {
    const res = await this.scope.service.progress.check({
      progressId: this.ctx.request.body.progressId,
      counter: this.ctx.request.body.counter,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }

  async abort() {
    await this.scope.service.progress.abort({
      progressId: this.ctx.request.body.progressId,
      user: this.ctx.state.user.op,
    });
    this.app.success();
  }

  async delete() {
    await this.scope.service.progress.delete({
      progressId: this.ctx.request.body.progressId,
      user: this.ctx.state.user.op,
    });
    this.app.success();
  }
}
