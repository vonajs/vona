import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../resource/this.js';

@Controller()
export class ControllerRender extends BeanBase<ScopeModule> {
  async getArticleUrl() {
    const res = await this.scope.service.render.getArticleUrl({
      atomClass: this.ctx.request.body.atomClass,
      key: this.ctx.request.body.key,
      options: this.ctx.request.body.options,
    });
    this.ctx.success(res);
  }
}
