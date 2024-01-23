import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleABaseadmin } from '../index.js';

@Controller()
export class ControllerAuthScene extends BeanBase {
  @Use()
  scope: ScopeModuleABaseadmin;

  async disable() {
    // check demo
    this.ctx.bean.util.checkDemo();
    const res = await this.scope.local.authScene.disable({
      id: this.ctx.request.body.id,
      sceneName: this.ctx.request.body.sceneName,
      disabled: this.ctx.request.body.disabled,
    });
    this.ctx.success(res);
  }

  async save() {
    // check demo
    this.ctx.bean.util.checkDemo();
    const res = await this.scope.local.authScene.save({
      id: this.ctx.request.body.id,
      sceneName: this.ctx.request.body.sceneName,
      data: this.ctx.request.body.data,
    });
    this.ctx.success(res);
  }

  async add() {
    // check demo
    this.ctx.bean.util.checkDemo();
    const res = await this.scope.local.authScene.add({
      id: this.ctx.request.body.id,
      sceneName: this.ctx.request.body.sceneName,
      data: this.ctx.request.body.data,
    });
    this.ctx.success(res);
  }

  async delete() {
    // check demo
    this.ctx.bean.util.checkDemo();
    const res = await this.scope.local.authScene.delete({
      id: this.ctx.request.body.id,
      sceneName: this.ctx.request.body.sceneName,
    });
    this.ctx.success(res);
  }
}
