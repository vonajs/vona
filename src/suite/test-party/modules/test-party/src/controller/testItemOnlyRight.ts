mport { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';

@Controller()
export class ControllerTestItemOnlyRight extends BeanBase {
  async checkRightCreate() {
    // checked by route/middleware
    this.app.success(this.ctx.request.body.atomClass);
  }

  async checkRightRead() {
    // checked by route/middleware
    this.app.success(this.ctx.request.body.key);
  }

  async createRaw() {
    const itemKey = await this.app.bean.atom.create({
      atomClass: this.ctx.request.body.atomClass,
    });
    this.app.success(itemKey);
  }

  async checkRightWrite() {
    // checked by route/middleware
    this.app.success(this.ctx.request.body.key);
  }

  async checkRightAction() {
    // checked by route/middleware
    this.app.success(this.ctx.request.body.key);
  }
}
