import { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';

@Controller()
export class ControllerUtil extends BeanBase {
  async md() {
    // atomId
    const atomId = this.ctx.params.atomId;
    // article
    const article = await this.app.bean.atom.read({ key: { atomId }, user: this.ctx.state.user.op });
    if (!article) this.$scope.base.error.ElementDoesNotExist.throw();
    // ok
    this.ctx.status = 200;
    this.ctx.body = article.content;
    this.ctx.set('content-type', 'text/x-markdown; charset=UTF-8');
  }
}
