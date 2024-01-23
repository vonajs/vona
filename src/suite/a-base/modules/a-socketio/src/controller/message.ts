import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleASocketio } from '../index.js';

@Controller()
export class ControllerMessage extends BeanBase {
  @Use()
  scope: ScopeModuleASocketio;

  async offset() {
    const res = await this.scope.local.message.offset({
      messageClass: this.ctx.request.body.messageClass,
      options: this.ctx.request.body.options,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async select() {
    const options = this.ctx.request.body.options;
    options.page = this.ctx.bean.util.page(options.page);
    const items = await this.scope.local.message.select({
      messageClass: this.ctx.request.body.messageClass,
      options,
      user: this.ctx.state.user.op,
    });
    this.ctx.successMore(items, options.page.index, options.page.size);
  }

  async count() {
    const options = this.ctx.request.body.options;
    const count = await this.scope.local.message.count({
      messageClass: this.ctx.request.body.messageClass,
      options,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(count);
  }

  async setRead() {
    const res = await this.scope.local.message.setRead({
      messageClass: this.ctx.request.body.messageClass,
      messageIds: this.ctx.request.body.messageIds,
      all: this.ctx.request.body.all,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async delete() {
    const res = await this.scope.local.message.delete({
      messageIds: this.ctx.request.body.messageIds,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }
}
