import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleACms } from '../index.js';

@Controller()
export class ControllerRender extends BeanBase {
  async getArticleUrl() {
    const res = await this.ctx.service.render.getArticleUrl({
      atomClass: this.ctx.request.body.atomClass,
      key: this.ctx.request.body.key,
      options: this.ctx.request.body.options,
    });
    this.ctx.success(res);
  }
}
