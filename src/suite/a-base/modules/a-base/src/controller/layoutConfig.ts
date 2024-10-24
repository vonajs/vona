import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Controller()
export class ControllerLayoutConfig extends BeanBase<ScopeModule> {
  async load() {
    const res = await this.scope.service.layoutConfig.load({
      module: this.ctx.request.body.module,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async save() {
    const res = await this.scope.service.layoutConfig.save({
      module: this.ctx.request.body.module,
      data: this.ctx.request.body.data,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async saveKey() {
    const res = await this.scope.service.layoutConfig.saveKey({
      module: this.ctx.request.body.module,
      key: this.ctx.request.body.key,
      value: this.ctx.request.body.value,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }
}
