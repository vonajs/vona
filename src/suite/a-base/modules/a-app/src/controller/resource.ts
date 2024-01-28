import { BeanBase, Controller } from '@cabloy/core';
import { ScopeModule } from '../resource/this.js';

@Controller()
export class ControllerResource extends BeanBase<ScopeModule> {
  async read() {
    const res = await this.scope.local.resource.read({
      atomStaticKey: this.ctx.request.body.atomStaticKey,
      options: this.ctx.request.body.options,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }
}
