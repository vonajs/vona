import { BeanBase, Controller } from '@cabloy/core';
import { ScopeModule } from '../resource/this.js';
import utils from '../common/utils.js';

@Controller()
export class ControllerComment extends BeanBase<ScopeModule> {
  async all() {
    // atomClass
    const atomClass = utils.atomClass(this.ctx.request.body.atomClass);
    // options
    const options = this.ctx.request.body.options;
    // stage
    options.stage = 'formal';
    // anonymous user
    const user = await this.ctx.bean.user.anonymous();
    // comment
    options.comment = 1;
    // select
    options.page = this.ctx.bean.util.page(options.page);
    const items = await this.ctx.bean.atom.select({ atomClass, options, user });
    // ok
    this.ctx.successMore(items, options.page.index, options.page.size);
  }
}
