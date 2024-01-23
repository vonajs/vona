import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleAFlowtask } from '../index.js';

@Controller()
export class ControllerFlow extends BeanBase {
  @Use()
  scope: ScopeModuleAFlowtask;

  async data() {
    const res = await this.scope.local.flow.data({
      flowId: this.ctx.request.body.flowId,
      options: this.ctx.request.body.options,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }
}
