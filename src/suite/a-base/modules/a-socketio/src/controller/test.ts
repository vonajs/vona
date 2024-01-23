import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleASocketio } from '../index.js';

@Controller()
export class ControllerTest extends BeanBase {
  @Use()
  scope: ScopeModuleASocketio;

  async echo() {
    const echo = this.ctx.request.body.echo;
    // this.ctx.throw(403);
    this.ctx.success({
      echo,
      query: this.ctx.request.query,
    });
  }
}
