import { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';
import utils from '../common/utils.js';

@Controller()
export class ControllerComment extends BeanBase {
  async all() {
    // atomClass
    const atomClass = utils.atomClass(this.ctx.request.body.atomClass);
    // options
    const options = this.ctx.request.body.options;
    // stage
    options.stage = 'formal';
    // anonymous user
    const user = await this.app.bean.user.anonymous();
    // comment
    options.comment = 1;
    // select
    options.page = this.app.bean.util.page(options.page);
    const items = await this.app.bean.atom.select({ atomClass, options, user });
    // ok
    this.app.successMore(items, options.page.index, options.page.size);
  }
}
