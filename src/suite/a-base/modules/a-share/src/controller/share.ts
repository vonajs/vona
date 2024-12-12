import { BeanBase, Controller } from 'vona';

@Controller()
export class ControllerShare extends BeanBase {
  async generate() {
    const res = await this.scope.service.share.generate({
      host: this.ctx.request.body.host,
      atomId: this.ctx.request.body.atomId,
      url: this.ctx.request.body.url,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }

  async shareGo() {
    await this.scope.service.share.shareGo({
      uuid: this.ctx.params.uuid,
      user: this.ctx.state.user.op,
    });
  }
}
