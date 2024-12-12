import { BeanBase, Controller } from 'vona';

@Controller()
export class ControllerMessageClass extends BeanBase {
  async messageClass() {
    const res = await this.scope.service.messageClass.messageClass({
      messageClass: this.ctx.request.body.messageClass,
    });
    this.app.success(res);
  }
}
