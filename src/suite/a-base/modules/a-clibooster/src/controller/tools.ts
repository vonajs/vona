import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleAClibooster } from '../index.js';

@Controller()
export class ControllerTools extends BeanBase {
  @Use()
  scope: ScopeModuleAClibooster;

  async demo() {
    const result = await this.scope.local.tools.demo({ method: this.ctx.params.method, query: this.ctx.query });
    this.ctx.success(result);
  }
}
