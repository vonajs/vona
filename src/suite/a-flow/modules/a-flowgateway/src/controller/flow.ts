import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleAFlowgateway } from '../index.js';

@Controller()
export class ControllerFlow extends BeanBase {
  async start() {
    // start
    const flowInstance = await this.ctx.bean.flow.startByKey({
      flowDefKey: this.ctx.request.body.flowDefKey,
      flowVars: this.ctx.request.body.flowVars,
      flowUserId: this.ctx.state.user.op.id,
    });
    this.ctx.success({
      flowId: flowInstance.context._flowId,
    });
  }
}
