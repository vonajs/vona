import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../resource/this.js';

@Controller()
export class ControllerShare extends BeanBase<ScopeModule> {
  async generate() {
    const res = await this.scope.local.share.generate({
      host: this.ctx.request.body.host,
      atomId: this.ctx.request.body.atomId,
      url: this.ctx.request.body.url,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async shareGo() {
    await this.scope.local.share.shareGo({
      uuid: this.ctx.params.uuid,
      user: this.ctx.state.user.op,
    });
  }
}
