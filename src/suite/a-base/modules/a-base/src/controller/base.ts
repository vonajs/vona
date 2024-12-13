import { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';
import qr from 'qr-image';

@Controller()
export class ControllerBase extends BeanBase {
  modules() {
    const res = this.scope.service.base.modules();
    this.app.success(res);
  }

  locales() {
    const res = this.scope.service.base.locales();
    this.app.success(res);
  }

  resourceTypes() {
    const res = this.scope.service.base.resourceTypes();
    this.app.success(res);
  }

  async getAtomClassBase() {
    const res = await this.scope.service.base.getAtomClassBase({
      atomClass: this.ctx.request.body.atomClass,
    });
    this.app.success(res);
  }

  getActionsBase() {
    const res = this.scope.service.base.getActionsBase({
      atomClass: this.ctx.request.body.atomClass,
    });
    this.app.success(res);
  }

  atomClasses() {
    const res = this.scope.service.base.atomClasses();
    this.app.success(res);
  }

  actions() {
    const res = this.scope.service.base.actions();
    this.app.success(res);
  }

  themes() {
    const res = this.scope.service.base.themes();
    this.app.success(res);
  }

  async qrcode() {
    const query = this.ctx.request.query;
    const img = qr.image(query.text || '', {
      type: query.type || 'png',
      size: query.size || 10,
      margin: query.margin || 4,
      ec_level: query.ec_level || 'M',
    });
    // ok
    this.ctx.status = 200;
    this.ctx.type = 'image/png';
    this.ctx.body = img;
  }
}
