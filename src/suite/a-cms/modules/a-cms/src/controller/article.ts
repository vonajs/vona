import { BeanBase, Controller } from 'vona';
import utils from '../common/utils.js';

@Controller()
export class ControllerArticle extends BeanBase {
  // list
  async list() {
    // atomClass
    const atomClass = utils.atomClass(this.ctx.request.body.atomClass);
    // options
    const options = this.ctx.request.body.options;
    // stage
    options.stage = 'formal';
    // anonymous user
    const user = await this.app.bean.user.anonymous();
    // select
    options.page = this.app.bean.util.page(options.page, false);
    const items = await this.app.bean.atom.select({ atomClass, options, user, pageForce: false });
    // ok
    this.app.successMore(items, options.page.index, options.page.size);
  }

  // attachments
  async attachments() {
    // options
    const options = this.ctx.request.body.options || {};
    options.page = this.app.bean.util.page(options.page, false);
    const items = await this.app.bean.file.attachments({
      key: this.ctx.request.body.key,
      options,
      user: this.ctx.state.user.op,
    });
    this.app.successMore(items, options.page.index, options.page.size);
  }
}
