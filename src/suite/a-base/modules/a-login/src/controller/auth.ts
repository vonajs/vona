import { BeanBase, Controller } from '@cabloy/core';
import { ScopeModule } from '../resource/this.js';

@Controller()
export class ControllerAuth extends BeanBase<ScopeModule> {
  async list() {
    const res = await this.scope.local.auth.list();
    this.ctx.success(res);
  }
}
