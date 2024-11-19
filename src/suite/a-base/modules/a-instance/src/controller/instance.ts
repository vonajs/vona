import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Controller()
export class ControllerInstance extends BeanBase<ScopeModule> {
  async item() {
    // check demo
    this.ctx.bean.util.checkDemo();
    const res = await this.scope.service.instance.item();
    this.app.success(res);
  }

  async save() {
    // check demo
    this.ctx.bean.util.checkDemo();
    await this.scope.service.instance.save({
      data: this.ctx.request.body.data,
    });
    this.app.success();
  }

  async getConfigsPreview() {
    // check demo
    this.ctx.bean.util.checkDemo();
    const res = await this.scope.service.instance.getConfigsPreview();
    this.app.success(res);
  }

  async reload() {
    // check demo
    this.ctx.bean.util.checkDemo();
    await this.scope.service.instance.reload();
    this.app.success();
  }
}
