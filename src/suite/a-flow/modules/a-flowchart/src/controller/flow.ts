import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleAFlowchart } from '../index.js';

@Controller()
export class ControllerFlow extends BeanBase {
  @Use()
  scope: ScopeModuleAFlowchart;

  async flowChartProcess() {
    const { host } = this.ctx.request.body;
    const user = this.ctx.state.user.op;
    const res = await this.scope.local.flow.flowChartProcess({
      host,
      user,
    });
    this.ctx.success(res);
  }
}
