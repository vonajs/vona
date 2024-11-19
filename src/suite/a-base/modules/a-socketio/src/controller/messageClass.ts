import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Controller()
export class ControllerMessageClass extends BeanBase<ScopeModule> {
  async messageClass() {
    const res = await this.scope.service.messageClass.messageClass({
      messageClass: this.ctx.request.body.messageClass,
    });
    this.app.success(res);
  }
}
