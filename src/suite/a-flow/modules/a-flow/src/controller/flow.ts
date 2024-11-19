import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Controller()
export class ControllerFlow extends BeanBase<ScopeModule> {
  // options
  //   where, orders, page, mode: mine/others/flowing/history
  async select() {
    const options = this.ctx.request.body.options;
    options.page = this.app.bean.util.page(options.page);
    const items = await this.scope.service.flow.select({
      options,
      user: this.ctx.state.user.op,
    });
    this.app.successMore(items, options.page.index, options.page.size);
  }

  async count() {
    const options = this.ctx.request.body.options;
    const count = await this.scope.service.flow.count({
      options,
      user: this.ctx.state.user.op,
    });
    this.app.success(count);
  }
}
