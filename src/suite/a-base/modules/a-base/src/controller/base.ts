import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../resource/this.js';
import qr from 'qr-image';

@Controller()
export class ControllerBase extends BeanBase<ScopeModule> {
  modules() {
    const res = this.scope.service.base.modules();
    this.ctx.success(res);
  }

  locales() {
    const res = this.scope.service.base.locales();
    this.ctx.success(res);
  }

  resourceTypes() {
    const res = this.scope.service.base.resourceTypes();
    this.ctx.success(res);
  }

  async getAtomClassBase() {
    const res = await this.scope.service.base.getAtomClassBase({
      atomClass: this.ctx.request.body.atomClass,
    });
    this.ctx.success(res);
  }

  getActionsBase() {
    const res = this.scope.service.base.getActionsBase({
      atomClass: this.ctx.request.body.atomClass,
    });
    this.ctx.success(res);
  }

  atomClasses() {
    const res = this.scope.service.base.atomClasses();
    this.ctx.success(res);
  }

  actions() {
    const res = this.scope.service.base.actions();
    this.ctx.success(res);
  }

  themes() {
    const res = this.scope.service.base.themes();
    this.ctx.success(res);
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
