import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Controller()
export class ControllerFlow extends BeanBase<ScopeModule> {
  async flowChartProcess() {
    const { host } = this.ctx.request.body;
    const user = this.ctx.state.user.op;
    const res = await this.scope.service.flow.flowChartProcess({
      host,
      user,
    });
    this.ctx.success(res);
  }
}
