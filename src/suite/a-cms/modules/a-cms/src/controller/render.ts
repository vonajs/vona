mport { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';

@Controller()
export class ControllerRender extends BeanBase {
  async getArticleUrl() {
    const res = await this.scope.service.render.getArticleUrl({
      atomClass: this.ctx.request.body.atomClass,
      key: this.ctx.request.body.key,
      options: this.ctx.request.body.options,
    });
    this.app.success(res);
  }
}
