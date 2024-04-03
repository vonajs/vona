import { BeanBase, Controller } from '@cabloy/core';
import { ScopeModule } from '../resource/this.js';

@Controller()
export class ControllerHello extends BeanBase<ScopeModule> {
  async hello() {
    const res = await this.scope.local.hello.hello({
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }
}
