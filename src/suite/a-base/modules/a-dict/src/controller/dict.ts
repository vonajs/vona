import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleADict } from '../index.js';

@Controller()
export class ControllerDict extends BeanBase {
  @Use()
  scope: ScopeModuleADict;

  async getDict() {
    const res = await this.scope.local.dict.getDict({
      dictKey: this.ctx.request.body.dictKey,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }
}
