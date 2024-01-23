import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleABaseadmin } from '../index.js';

@Controller()
export class ControllerAuth extends BeanBase {
  @Use()
  scope: ScopeModuleABaseadmin;

  async list() {
    // check demo
    this.ctx.bean.util.checkDemo();
    const res = await this.scope.local.auth.list();
    this.ctx.success(res);
  }

  async disable() {
    // check demo
    this.ctx.bean.util.checkDemo();
    const res = await this.scope.local.auth.disable({
      id: this.ctx.request.body.id,
      disabled: this.ctx.request.body.disabled,
    });
    this.ctx.success(res);
  }

  async save() {
    // check demo
    this.ctx.bean.util.checkDemo();
    const res = await this.scope.local.auth.save({
      id: this.ctx.request.body.id,
      config: this.ctx.request.body.data,
    });
    this.ctx.success(res);
  }
}
