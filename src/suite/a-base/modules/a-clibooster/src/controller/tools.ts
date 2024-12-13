mport { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';

@Controller()
export class ControllerTools extends BeanBase {
  async demo() {
    const result = await this.scope.service.tools.demo({
      method: this.ctx.params.method,
      query: this.ctx.query,
      user: this.ctx.state.user.op,
    });
    this.app.success(result);
  }
}
