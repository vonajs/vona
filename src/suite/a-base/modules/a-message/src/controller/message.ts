import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleAMessage } from '../index.js';

@Controller()
export class ControllerMessage extends BeanBase {
  // options
  //   where, orders
  async group() {
    const options = this.ctx.request.body.options;
    const items = await this.ctx.service.message.group({
      options,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(items);
  }
}
