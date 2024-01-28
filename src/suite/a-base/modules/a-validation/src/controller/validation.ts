import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModule } from '../resource/this.js';

@Controller()
export class ControllerValidation extends BeanBase<ScopeModule> {
  schema() {
    const res = this.scope.local.validation.schema(this.ctx.request.body);
    this.ctx.success(res);
  }
  async validate() {
    const res = await this.scope.local.validation.validate({
      params: this.ctx.request.body.params,
      data: this.ctx.request.body.data,
    });
    this.ctx.success(res);
  }
}
