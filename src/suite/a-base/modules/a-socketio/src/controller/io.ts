import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Controller()
export class ControllerIo extends BeanBase<ScopeModule> {
  async subscribe() {
    const res = await this.scope.service.io.subscribe({
      path: this.ctx.request.body.path,
      timestamp: this.ctx.request.body.timestamp,
      workerId: this.app.meta.workerId,
      socketId: (<any>this.ctx.socket).id,
      scene: this.ctx.bean.util.getFrontClientId(),
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
