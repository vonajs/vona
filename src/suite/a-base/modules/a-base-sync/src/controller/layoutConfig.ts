import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleABase } from '../index.js';

@Controller()
export class ControllerLayoutConfig extends BeanBase {
  async load() {
    const res = await this.ctx.service.layoutConfig.load({
      module: this.ctx.request.body.module,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async save() {
    const res = await this.ctx.service.layoutConfig.save({
      module: this.ctx.request.body.module,
      data: this.ctx.request.body.data,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async saveKey() {
    const res = await this.ctx.service.layoutConfig.saveKey({
      module: this.ctx.request.body.module,
      key: this.ctx.request.body.key,
      value: this.ctx.request.body.value,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }
}
