import { BeanBase, Controller } from 'vona';

@Controller()
export class ControllerSettings extends BeanBase {
  // instance

  instanceList() {
    const res = this.scope.service.settings.instanceList();
    this.app.successMore(res, 0, -1);
  }

  async instanceLoad() {
    // check demo
    this.app.bean.util.checkDemo();
    const res = await this.scope.service.settings.instanceLoad(this.ctx.request.body);
    this.app.success(res);
  }

  async instanceSave() {
    // check demo
    this.app.bean.util.checkDemo();
    const res = await this.scope.service.settings.instanceSave(this.ctx.request.body);
    this.app.success(res);
  }

  // user

  userList() {
    const res = this.scope.service.settings.userList();
    this.app.successMore(res, 0, -1);
  }

  async userLoad() {
    const res = await this.scope.service.settings.userLoad(this.ctx.request.body);
    this.app.success(res);
  }

  async userSave() {
    const res = await this.scope.service.settings.userSave(this.ctx.request.body);
    this.app.success(res);
  }
}
