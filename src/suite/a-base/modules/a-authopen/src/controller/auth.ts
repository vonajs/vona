import { BeanBase, Controller } from 'vona';

@Controller()
export class ControllerAuth extends BeanBase {
  async signin() {
    // check demo
    this.app.bean.util.checkDemo();
    // data: { clientID, clientSecret }
    const res = await this.scope.service.auth.signin({
      data: this.ctx.request.body.data,
    });
    this.app.success(res);
  }
}
