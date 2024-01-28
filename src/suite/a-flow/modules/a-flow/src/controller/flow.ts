import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModule } from '../resource/this.js';

@Controller()
export class ControllerFlow extends BeanBase<ScopeModule> {
  // options
  //   where, orders, page, mode: mine/others/flowing/history
  async select() {
    const options = this.ctx.request.body.options;
    options.page = this.ctx.bean.util.page(options.page);
    const items = await this.scope.local.flow.select({
      options,
      user: this.ctx.state.user.op,
    });
    this.ctx.successMore(items, options.page.index, options.page.size);
  }

  async count() {
    const options = this.ctx.request.body.options;
    const count = await this.scope.local.flow.count({
      options,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(count);
  }
}
