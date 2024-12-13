mport { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';

@Controller()
export class ControllerAuth extends BeanBase {
  async list() {
    // check demo
    this.app.bean.util.checkDemo();
    const res = await this.scope.service.auth.list();
    this.app.success(res);
  }

  async disable() {
    // check demo
    this.app.bean.util.checkDemo();
    const res = await this.scope.service.auth.disable({
      id: this.ctx.request.body.id,
      disabled: this.ctx.request.body.disabled,
    });
    this.app.success(res);
  }

  async save() {
    // check demo
    this.app.bean.util.checkDemo();
    const res = await this.scope.service.auth.save({
      id: this.ctx.request.body.id,
      config: this.ctx.request.body.data,
    });
    this.app.success(res);
  }
}
