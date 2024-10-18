import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../resource/this.js';

@Controller()
export class ControllerInstance extends BeanBase<ScopeModule> {
  async item() {
    // check demo
    this.ctx.bean.util.checkDemo();
    const res = await this.scope.local.instance.item();
    this.ctx.success(res);
  }

  async save() {
    // check demo
    this.ctx.bean.util.checkDemo();
    await this.scope.local.instance.save({
      data: this.ctx.request.body.data,
    });
    this.ctx.success();
  }

  async getConfigsPreview() {
    // check demo
    this.ctx.bean.util.checkDemo();
    const res = await this.scope.local.instance.getConfigsPreview();
    this.ctx.success(res);
  }

  async reload() {
    // check demo
    this.ctx.bean.util.checkDemo();
    await this.scope.local.instance.reload();
    this.ctx.success();
  }
}
