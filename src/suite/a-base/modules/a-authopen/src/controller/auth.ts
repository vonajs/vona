import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Controller()
export class ControllerAuth extends BeanBase<ScopeModule> {
  async signin() {
    // check demo
    this.app.bean.util.checkDemo();
    // data: { clientID, clientSecret }
    const res = await this.scope.service.auth.signin({
      data: this.ctx.request.body.data,
    });
    this.app.success(res);
  }
}
