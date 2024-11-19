import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Controller()
export class ControllerStats extends BeanBase<ScopeModule> {
  async get() {
    const { module, name, nameSub } = this.ctx.request.body;
    // only support user stats
    const provider = this.app.bean.stats._findStatsProvider({ module, name });
    if (!provider.user) this.app.throw(403);
    // get
    const res = await this.scope.service.stats.get({
      module,
      name,
      nameSub,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }
}
