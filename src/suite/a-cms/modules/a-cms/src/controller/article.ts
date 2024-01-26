import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleACms } from '../index.js';
import utils from '../common/utils.js';

@Controller()
export class ControllerArticle extends BeanBase {
  @Use()
  scope: ScopeModuleACms;

  // list
  async list() {
    // atomClass
    const atomClass = utils.atomClass(this.ctx.request.body.atomClass);
    // options
    const options = this.ctx.request.body.options;
    // stage
    options.stage = 'formal';
    // anonymous user
    const user = await this.ctx.bean.user.anonymous();
    // select
    options.page = this.ctx.bean.util.page(options.page, false);
    const items = await this.ctx.bean.atom.select({ atomClass, options, user, pageForce: false });
    // ok
    this.ctx.successMore(items, options.page.index, options.page.size);
  }

  // attachments
  async attachments() {
    // options
    const options = this.ctx.request.body.options || {};
    options.page = this.ctx.bean.util.page(options.page, false);
    const items = await this.ctx.bean.file.attachments({
      key: this.ctx.request.body.key,
      options,
      user: this.ctx.state.user.op,
    });
    this.ctx.successMore(items, options.page.index, options.page.size);
  }
}
