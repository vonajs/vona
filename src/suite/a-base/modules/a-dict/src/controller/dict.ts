import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Controller()
export class ControllerDict extends BeanBase<ScopeModule> {
  async getDict() {
    const res = await this.scope.service.dict.getDict({
      dictKey: this.ctx.request.body.dictKey,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }
}
