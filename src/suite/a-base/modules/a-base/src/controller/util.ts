import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleABase } from '../index.js';

@Controller()
export class ControllerUtil extends BeanBase {
  @Use()
  scope: ScopeModuleABase;

  async performAction() {
    const res = await this.scope.local.util.performAction({
      params: JSON.parse(this.ctx.request.query.params),
    });
    this.ctx.success(res);
  }

  async performActions() {
    const res = await this.scope.local.util.performActions({
      actions: this.ctx.request.body.actions,
    });
    this.ctx.success(res);
  }
}
