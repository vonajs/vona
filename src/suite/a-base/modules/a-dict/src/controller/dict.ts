import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleADict } from '../index.js';

@Controller()
export class ControllerDict extends BeanBase {
  async getDict() {
    const res = await this.ctx.service.dict.getDict({
      dictKey: this.ctx.request.body.dictKey,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }
}
