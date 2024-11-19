import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Controller()
export class ControllerValidation extends BeanBase<ScopeModule> {
  schema() {
    const res = this.scope.service.validation.schema(this.ctx.request.body);
    this.app.success(res);
  }
  async validate() {
    const res = await this.scope.service.validation.validate({
      params: this.ctx.request.body.params,
      data: this.ctx.request.body.data,
    });
    this.app.success(res);
  }
}
