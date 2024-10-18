import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../resource/this.js';

@Controller()
export class ControllerMessageClass extends BeanBase<ScopeModule> {
  async messageClass() {
    const res = await this.scope.local.messageClass.messageClass({
      messageClass: this.ctx.request.body.messageClass,
    });
    this.ctx.success(res);
  }
}
