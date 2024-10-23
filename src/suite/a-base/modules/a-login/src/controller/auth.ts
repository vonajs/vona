import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../resource/this.js';

@Controller()
export class ControllerAuth extends BeanBase<ScopeModule> {
  async list() {
    const res = await this.scope.service.auth.list();
    this.ctx.success(res);
  }
}
