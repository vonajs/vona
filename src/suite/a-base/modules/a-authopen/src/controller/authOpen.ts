mport { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';

@Controller()
export class ControllerAuthOpen extends BeanBase {
  async hideClientSecret() {
    // check demo
    // this.app.bean.util.checkDemo();
    const res = await this.scope.service.authOpen.hideClientSecret({
      key: this.ctx.request.body.key,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }

  async resetClientSecret() {
    // check demo
    this.app.bean.util.checkDemo();
    const res = await this.scope.service.authOpen.resetClientSecret({
      key: this.ctx.request.body.key,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }
}
