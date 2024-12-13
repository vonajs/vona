mport { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';

@Controller()
export class ControllerAuth extends BeanBase {
  async list() {
    const res = await this.scope.service.auth.list();
    this.app.success(res);
  }
}
