mport { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';

@Controller()
export class ControllerResource extends BeanBase {
  async read() {
    const res = await this.scope.service.resource.read({
      atomStaticKey: this.ctx.request.body.atomStaticKey,
      options: this.ctx.request.body.options,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }
}
