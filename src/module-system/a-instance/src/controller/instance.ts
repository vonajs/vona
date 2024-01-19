import { BeanBase, Controller } from '@cabloy/core';

@Controller()
export class ControllerInstance extends BeanBase {
  async item() {
    // check demo
    (<any>this.ctx.bean).util.checkDemo();
    const res = await this.ctx.service.instance.item();
    this.ctx.success(res);
  }

  async save() {
    // check demo
    (<any>this.ctx.bean).util.checkDemo();
    await this.ctx.service.instance.save({
      data: this.ctx.request.body.data,
    });
    this.ctx.success();
  }

  async getConfigsPreview() {
    // check demo
    (<any>this.ctx.bean).util.checkDemo();
    const res = await this.ctx.service.instance.getConfigsPreview();
    this.ctx.success(res);
  }

  async reload() {
    // check demo
    (<any>this.ctx.bean).util.checkDemo();
    await this.ctx.service.instance.reload();
    this.ctx.success();
  }
}
