mport { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';

@Controller()
export class ControllerAuthScene extends BeanBase {
  async disable() {
    // check demo
    this.app.bean.util.checkDemo();
    const res = await this.scope.service.authScene.disable({
      id: this.ctx.request.body.id,
      sceneName: this.ctx.request.body.sceneName,
      disabled: this.ctx.request.body.disabled,
    });
    this.app.success(res);
  }

  async save() {
    // check demo
    this.app.bean.util.checkDemo();
    const res = await this.scope.service.authScene.save({
      id: this.ctx.request.body.id,
      sceneName: this.ctx.request.body.sceneName,
      data: this.ctx.request.body.data,
    });
    this.app.success(res);
  }

  async add() {
    // check demo
    this.app.bean.util.checkDemo();
    const res = await this.scope.service.authScene.add({
      id: this.ctx.request.body.id,
      sceneName: this.ctx.request.body.sceneName,
      data: this.ctx.request.body.data,
    });
    this.app.success(res);
  }

  async delete() {
    // check demo
    this.app.bean.util.checkDemo();
    const res = await this.scope.service.authScene.delete({
      id: this.ctx.request.body.id,
      sceneName: this.ctx.request.body.sceneName,
    });
    this.app.success(res);
  }
}
