import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Controller()
export class ControllerAuthOpen extends BeanBase<ScopeModule> {
  async hideClientSecret() {
    // check demo
    // this.ctx.bean.util.checkDemo();
    const res = await this.scope.service.authOpen.hideClientSecret({
      key: this.ctx.request.body.key,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }

  async resetClientSecret() {
    // check demo
    this.ctx.bean.util.checkDemo();
    const res = await this.scope.service.authOpen.resetClientSecret({
      key: this.ctx.request.body.key,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }
}
