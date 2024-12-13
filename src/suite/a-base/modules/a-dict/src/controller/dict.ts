mport { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';

@Controller()
export class ControllerDict extends BeanBase {
  async getDict() {
    const res = await this.scope.service.dict.getDict({
      dictKey: this.ctx.request.body.dictKey,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }
}
