import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../resource/this.js';

@Controller()
export class ControllerInstance extends BeanBase<ScopeModule> {
  async item() {
    // check demo
    this.ctx.bean.util.checkDemo();
    const res = await this.scope.service.instance.item();
    this.ctx.success(res);
  }

  async save() {
    // check demo
    this.ctx.bean.util.checkDemo();
    await this.scope.service.instance.save({
      data: this.ctx.request.body.data,
    });
    this.ctx.success();
  }

  async getConfigsPreview() {
    // check demo
    this.ctx.bean.util.checkDemo();
    const res = await this.scope.service.instance.getConfigsPreview();
    this.ctx.success(res);
  }

  async reload() {
    // check demo
    this.ctx.bean.util.checkDemo();
    await this.scope.service.instance.reload();
    this.ctx.success();
  }
}
