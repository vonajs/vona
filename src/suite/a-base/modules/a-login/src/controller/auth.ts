import { BeanBase, Controller } from 'vona';

@Controller()
export class ControllerAuth extends BeanBase {
  async list() {
    const res = await this.scope.service.auth.list();
    this.app.success(res);
  }
}
