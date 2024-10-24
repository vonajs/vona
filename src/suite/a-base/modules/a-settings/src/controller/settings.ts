import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Controller()
export class ControllerSettings extends BeanBase<ScopeModule> {
  // instance

  instanceList() {
    const res = this.scope.service.settings.instanceList();
    this.ctx.successMore(res, 0, -1);
  }

  async instanceLoad() {
    // check demo
    this.ctx.bean.util.checkDemo();
    const res = await this.scope.service.settings.instanceLoad(this.ctx.request.body);
    this.ctx.success(res);
  }

  async instanceSave() {
    // check demo
    this.ctx.bean.util.checkDemo();
    const res = await this.scope.service.settings.instanceSave(this.ctx.request.body);
    this.ctx.success(res);
  }

  // user

  userList() {
    const res = this.scope.service.settings.userList();
    this.ctx.successMore(res, 0, -1);
  }

  async userLoad() {
    const res = await this.scope.service.settings.userLoad(this.ctx.request.body);
    this.ctx.success(res);
  }

  async userSave() {
    const res = await this.scope.service.settings.userSave(this.ctx.request.body);
    this.ctx.success(res);
  }
}
