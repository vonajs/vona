import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../resource/this.js';

@Controller()
export class ControllerDict extends BeanBase<ScopeModule> {
  async getDict() {
    const res = await this.scope.local.dict.getDict({
      dictKey: this.ctx.request.body.dictKey,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }
}
