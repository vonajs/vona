mport { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';

@Controller()
export class ControllerFlow extends BeanBase {
  async flowChartProcess() {
    const { host } = this.ctx.request.body;
    const user = this.ctx.state.user.op;
    const res = await this.scope.service.flow.flowChartProcess({
      host,
      user,
    });
    this.app.success(res);
  }
}
