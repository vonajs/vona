import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleAInstance } from '../index.js';

@Controller()
export class ControllerInstance extends BeanBase {
  @Use()
  scope: ScopeModuleAInstance;

  async item() {
    // check demo
    (<any>this.ctx.bean).util.checkDemo();
    const res = await this.scope.local.instance.item();
    this.ctx.success(res);
  }

  async save() {
    // check demo
    (<any>this.ctx.bean).util.checkDemo();
    await this.scope.local.instance.save({
      data: this.ctx.request.body.data,
    });
    this.ctx.success();
  }

  async getConfigsPreview() {
    // check demo
    (<any>this.ctx.bean).util.checkDemo();
    const res = await this.scope.local.instance.getConfigsPreview();
    this.ctx.success(res);
  }

  async reload() {
    // check demo
    (<any>this.ctx.bean).util.checkDemo();
    await this.scope.local.instance.reload();
    this.ctx.success();
  }
}
