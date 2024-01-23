import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleAMessage } from '../index.js';

@Controller()
export class ControllerMessage extends BeanBase {
  @Use()
  scope: ScopeModuleAMessage;

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
