import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleALogin } from '../index.js';

@Controller()
export class ControllerAuth extends BeanBase {
  @Use()
  scope: ScopeModuleALogin;

  async list() {
    const res = await this.scope.local.auth.list();
    this.ctx.success(res);
  }
}
