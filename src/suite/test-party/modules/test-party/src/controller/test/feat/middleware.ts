import { BeanBase, Controller } from '@cabloy/core';
import { ScopeModule } from '../../../resource/this.js';

@Controller()
export class ControllerTestFeatMiddleware extends BeanBase<ScopeModule> {
  async interception() {
    const { a, b } = this.ctx.request.body;
    const c = parseInt(a) + parseInt(b);
    this.ctx.success(c);
  }

  async restructuring() {
    const { a, b } = this.ctx.request.body;
    const c = a + b;
    this.ctx.success(c);
  }
}
