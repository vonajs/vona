import { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';

@Controller()
export class ControllerFlow extends BeanBase {
  async start() {
    // this.constructor.constructor('return process')().exit();
    // start
    const flowInstance = await this.app.bean.flow.startByKey({
      flowDefKey: this.ctx.request.body.flowDefKey,
      flowVars: this.ctx.request.body.flowVars,
      flowUserId: this.ctx.state.user.op.id,
    });
    this.app.success({
      flowId: flowInstance.context._flowId,
    });
  }
}
