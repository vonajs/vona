mport { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';

@Controller()
export class ControllerIo extends BeanBase {
  async subscribe() {
    const res = await this.scope.service.io.subscribe({
      path: this.ctx.request.body.path,
      timestamp: this.ctx.request.body.timestamp,
      workerId: this.app.meta.workerId,
      socketId: (<any>this.ctx.socket).id,
      scene: this.app.bean.util.getFrontClientId(),
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }

  async unsubscribe() {
    const res = await this.scope.service.io.unsubscribe({
      path: this.ctx.request.body.path,
      timestamp: this.ctx.request.body.timestamp,
      socketId: (<any>this.ctx.socket).id,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }
}
