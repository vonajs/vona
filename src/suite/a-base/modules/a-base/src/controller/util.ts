import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Controller()
export class ControllerUtil extends BeanBase<ScopeModule> {
  async performAction() {
    const res = await this.scope.service.util.performAction({
      params: JSON.parse(this.ctx.request.query.params),
    });
    this.ctx.success(res);
  }

  async performActions() {
    const res = await this.scope.service.util.performActions({
      actions: this.ctx.request.body.actions,
    });
    this.ctx.success(res);
  }
}
