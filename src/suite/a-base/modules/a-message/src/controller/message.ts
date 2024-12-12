import { BeanBase, Controller } from 'vona';

@Controller()
export class ControllerMessage extends BeanBase {
  // options
  //   where, orders
  async group() {
    const options = this.ctx.request.body.options;
    const items = await this.scope.service.message.group({
      options,
      user: this.ctx.state.user.op,
    });
    this.app.success(items);
  }
}
