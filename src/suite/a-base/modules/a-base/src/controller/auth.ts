import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleABase } from '../index.js';

@Controller()
export class ControllerAuth extends BeanBase {
  @Use()
  scope: ScopeModuleABase;

  // return current user auth info
  //   { op:{id},agent:{id},provider}
  async echo() {
    const info = await this.ctx.bean.auth.echo();
    this.ctx.success(info);
  }

  async check() {
    const info = await this.ctx.bean.auth.check();
    this.ctx.success(info);
  }

  async logout() {
    const info = await this.ctx.bean.auth.logout();
    this.ctx.success(info);
  }
}
