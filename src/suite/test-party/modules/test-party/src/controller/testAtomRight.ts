import { BeanBase, Controller } from 'vona';

@Controller()
export class ControllerTestAtomRight extends BeanBase {
  async checkRightCreate() {
    // checked by route/middleware
    this.app.success(this.ctx.request.body.atomClass);
  }

  async checkRightRead() {
    // checked by route/middleware
    this.app.success(this.ctx.request.body.key);
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
