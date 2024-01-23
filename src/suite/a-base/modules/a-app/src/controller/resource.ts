import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleAApp } from '../index.js';

@Controller()
export class ControllerResource extends BeanBase {
  @Use()
  scope: ScopeModuleAApp;

  async read() {
    const res = await this.scope.local.resource.read({
      atomStaticKey: this.ctx.request.body.atomStaticKey,
      options: this.ctx.request.body.options,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }
}
