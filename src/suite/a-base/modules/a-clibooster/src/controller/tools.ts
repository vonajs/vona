import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Controller()
export class ControllerTools extends BeanBase<ScopeModule> {
  async demo() {
    const result = await this.scope.service.tools.demo({
      method: this.ctx.params.method,
      query: this.ctx.query,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(result);
  }
}
