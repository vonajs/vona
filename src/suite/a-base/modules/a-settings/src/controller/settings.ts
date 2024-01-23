import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleASettings } from '../index.js';

@Controller()
export class ControllerSettings extends BeanBase {
  @Use()
  scope: ScopeModuleASettings;

  // instance

  instanceList() {
    const res = this.scope.local.settings.instanceList();
    this.ctx.successMore(res, 0, -1);
  }

  async instanceLoad() {
    // check demo
    this.ctx.bean.util.checkDemo();
    const res = await this.scope.local.settings.instanceLoad(this.ctx.request.body);
    this.ctx.success(res);
  }

  async instanceSave() {
    // check demo
    this.ctx.bean.util.checkDemo();
    const res = await this.scope.local.settings.instanceSave(this.ctx.request.body);
    this.ctx.success(res);
  }

  // user

  userList() {
    const res = this.scope.local.settings.userList();
    this.ctx.successMore(res, 0, -1);
  }

  async userLoad() {
    const res = await this.scope.local.settings.userLoad(this.ctx.request.body);
    this.ctx.success(res);
  }

  async userSave() {
    const res = await this.scope.local.settings.userSave(this.ctx.request.body);
    this.ctx.success(res);
  }
}
