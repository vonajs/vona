import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Controller()
export class ControllerCli extends BeanBase<ScopeModule> {
  async meta() {
    const res = await this.scope.service.cli.meta({
      context: this.ctx.request.body.context,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }

  async execute() {
    const res = await this.scope.service.cli.execute({
      progressId: this.ctx.request.body.progressId,
      context: this.ctx.request.body.context,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }
}
