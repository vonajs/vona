import { BeanBase, Controller } from 'vona';

@Controller()
export class ControllerFlow extends BeanBase {
  async data() {
    const res = await this.scope.service.flow.data({
      flowId: this.ctx.request.body.flowId,
      options: this.ctx.request.body.options,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }
}
