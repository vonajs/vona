import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleAStats } from '../index.js';

@Controller()
export class ControllerStats extends BeanBase {
  @Use()
  scope: ScopeModuleAStats;

  async get() {
    const { module, name, nameSub } = this.ctx.request.body;
    // only support user stats
    const provider = this.ctx.bean.stats._findStatsProvider({ module, name });
    if (!provider.user) this.ctx.throw(403);
    // get
    const res = await this.scope.local.stats.get({
      module,
      name,
      nameSub,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }
}
