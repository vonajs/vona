import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleAValidation } from '../index.js';

@Controller()
export class ControllerValidation extends BeanBase {
  schema() {
    const res = this.ctx.service.validation.schema(this.ctx.request.body);
    this.ctx.success(res);
  }
  async validate() {
    const res = await this.ctx.service.validation.validate({
      params: this.ctx.request.body.params,
      data: this.ctx.request.body.data,
    });
    this.ctx.success(res);
  }
}
