import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../resource/this.js';

@Controller()
export class ControllerPublic extends BeanBase<ScopeModule> {
  async profile() {
    const res = await this.scope.local.public.profile({
      userId: this.ctx.request.body.userId,
    });
    this.ctx.success(res);
  }
}
