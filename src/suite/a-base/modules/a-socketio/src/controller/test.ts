import { BeanBase, Controller } from '@cabloy/core';
import { ScopeModule } from '../resource/this.js';

@Controller()
export class ControllerTest extends BeanBase<ScopeModule> {
  async echo() {
    const echo = this.ctx.request.body.echo;
    // this.ctx.throw(403);
    this.ctx.success({
      echo,
      query: this.ctx.request.query,
    });
  }
}
