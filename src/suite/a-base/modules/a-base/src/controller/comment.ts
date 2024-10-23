import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../resource/this.js';

@Controller()
export class ControllerComment extends BeanBase<ScopeModule> {
  async all() {
    const options = this.ctx.request.body.options;
    options.comment = 1;
    const res = await this.ctx.meta.util.performAction({
      method: 'post',
      url: '/a/base/atom/select',
      body: {
        atomClass: this.ctx.request.body.atomClass,
        options,
      },
    });
    this.ctx.success(res);
  }

  async list() {
    const options = this.ctx.request.body.options;
    options.page = this.ctx.bean.util.page(options.page);
    const items = await this.scope.service.comment.list({
      key: this.ctx.request.body.key,
      options,
      user: this.ctx.state.user.op,
    });
    this.ctx.successMore(items, options.page.index, options.page.size);
  }

  async count() {
    const count = await this.scope.service.comment.count({
      key: this.ctx.request.body.key,
      options: this.ctx.request.body.options,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(count);
  }

  async item() {
    const res = await this.scope.service.comment.item({
      // key: this.ctx.request.body.key,
      data: this.ctx.request.body.data,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async save() {
    const res = await this.scope.service.comment.save({
      key: this.ctx.request.body.key,
      data: this.ctx.request.body.data,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async delete() {
    const res = await this.scope.service.comment.delete({
      key: this.ctx.request.body.key,
      data: this.ctx.request.body.data,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async heart() {
    const res = await this.scope.service.comment.heart({
      key: this.ctx.request.body.key,
      data: this.ctx.request.body.data,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }
}
