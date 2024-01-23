import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleAFlowchart } from '../index.js';

@Controller()
export class ControllerFlow extends BeanBase {
  async flowChartProcess() {
    const { host } = this.ctx.request.body;
    const user = this.ctx.state.user.op;
    const res = await this.ctx.service.flow.flowChartProcess({
      host,
      user,
    });
    this.ctx.success(res);
  }
}
