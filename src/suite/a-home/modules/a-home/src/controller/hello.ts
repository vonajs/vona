import { BeanBase, Controller } from '@cabloy/core';
import { ScopeModule } from '../resource/this.js';

@Controller()
export class ControllerHello extends BeanBase<ScopeModule> {
  async action() {
    const res = await this.scope.local.hello.action({
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }
}
