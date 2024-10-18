import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../resource/this.js';

@Controller()
export class ControllerMessage extends BeanBase<ScopeModule> {
  // options
  //   where, orders
  async group() {
    const options = this.ctx.request.body.options;
    const items = await this.scope.local.message.group({
      options,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(items);
  }
}
