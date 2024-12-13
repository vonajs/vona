import { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';

@Controller()
export class ControllerMessage extends BeanBase {
  async offset() {
    const res = await this.scope.service.message.offset({
      messageClass: this.ctx.request.body.messageClass,
      options: this.ctx.request.body.options,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }

  async select() {
    const options = this.ctx.request.body.options;
    options.page = this.app.bean.util.page(options.page);
    const items = await this.scope.service.message.select({
      messageClass: this.ctx.request.body.messageClass,
      options,
      user: this.ctx.state.user.op,
    });
    this.app.successMore(items, options.page.index, options.page.size);
  }

  async count() {
    const options = this.ctx.request.body.options;
    const count = await this.scope.service.message.count({
      messageClass: this.ctx.request.body.messageClass,
      options,
      user: this.ctx.state.user.op,
    });
    this.app.success(count);
  }

  async setRead() {
    const res = await this.scope.service.message.setRead({
      messageClass: this.ctx.request.body.messageClass,
      messageIds: this.ctx.request.body.messageIds,
      all: this.ctx.request.body.all,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }

  async delete() {
    const res = await this.scope.service.message.delete({
      messageIds: this.ctx.request.body.messageIds,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }
}
