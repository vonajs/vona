import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../resource/this.js';

@Controller()
export class ControllerUtil extends BeanBase<ScopeModule> {
  async md() {
    // atomId
    const atomId = this.ctx.params.atomId;
    // article
    const article = await this.ctx.bean.atom.read({ key: { atomId }, user: this.ctx.state.user.op });
    if (!article) this.getScope('a-base').error.ElementDoesNotExist.throw();
    // ok
    this.ctx.status = 200;
    this.ctx.body = article.content;
    this.ctx.set('content-type', 'text/x-markdown; charset=UTF-8');
  }
}
