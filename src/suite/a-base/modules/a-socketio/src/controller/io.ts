import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModule } from '../resource/this.js';

@Controller()
export class ControllerIo extends BeanBase<ScopeModule> {
  async subscribe() {
    const res = await this.scope.local.io.subscribe({
      path: this.ctx.request.body.path,
      timestamp: this.ctx.request.body.timestamp,
      workerId: this.app.meta.workerId,
      socketId: this.ctx.socket.id,
      scene: this.ctx.bean.util.getFrontClientId(),
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async unsubscribe() {
    const res = await this.scope.local.io.unsubscribe({
      path: this.ctx.request.body.path,
      timestamp: this.ctx.request.body.timestamp,
      socketId: this.ctx.socket.id,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }
}
