import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleAApp } from '../index.js';

@Controller()
export class ControllerResource extends BeanBase {
  async read() {
    const res = await this.ctx.service.resource.read({
      atomStaticKey: this.ctx.request.body.atomStaticKey,
      options: this.ctx.request.body.options,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }
}
