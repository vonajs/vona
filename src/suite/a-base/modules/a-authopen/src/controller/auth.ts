import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../resource/this.js';

@Controller()
export class ControllerAuth extends BeanBase<ScopeModule> {
  async signin() {
    // check demo
    this.ctx.bean.util.checkDemo();
    // data: { clientID, clientSecret }
    const res = await this.scope.local.auth.signin({
      data: this.ctx.request.body.data,
    });
    this.ctx.success(res);
  }
}
