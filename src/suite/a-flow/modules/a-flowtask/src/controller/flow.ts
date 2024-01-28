import { BeanBase, Controller } from '@cabloy/core';
import { ScopeModule } from '../resource/this.js';

@Controller()
export class ControllerFlow extends BeanBase<ScopeModule> {
  async data() {
    const res = await this.scope.local.flow.data({
      flowId: this.ctx.request.body.flowId,
      options: this.ctx.request.body.options,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }
}
