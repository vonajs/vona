import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModule } from '../resource/this.js';

@Controller()
export class ControllerAuth extends BeanBase<ScopeModule> {
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
