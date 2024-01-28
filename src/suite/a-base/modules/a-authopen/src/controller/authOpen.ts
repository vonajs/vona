import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModule } from '../resource/this.js';

@Controller()
export class ControllerAuthOpen extends BeanBase<ScopeModule> {
  async hideClientSecret() {
    // check demo
    // this.ctx.bean.util.checkDemo();
    const res = await this.scope.local.authOpen.hideClientSecret({
      key: this.ctx.request.body.key,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async resetClientSecret() {
    // check demo
    this.ctx.bean.util.checkDemo();
    const res = await this.scope.local.authOpen.resetClientSecret({
      key: this.ctx.request.body.key,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }
}
