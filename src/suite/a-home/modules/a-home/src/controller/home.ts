import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Controller()
export class ControllerHome extends BeanBase<ScopeModule> {
  async echo() {
    const res = await this.scope.service.home.echo({
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }
}
