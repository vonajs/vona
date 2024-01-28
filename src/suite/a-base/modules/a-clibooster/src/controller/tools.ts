import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModule } from '../resource/this.js';

@Controller()
export class ControllerTools extends BeanBase<ScopeModule> {
  async demo() {
    const result = await this.scope.local.tools.demo({ method: this.ctx.params.method, query: this.ctx.query });
    this.ctx.success(result);
  }
}
