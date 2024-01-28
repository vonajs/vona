import { BeanBase, Controller } from '@cabloy/core';
import { ScopeModule } from '../resource/this.js';

@Controller()
export class ControllerIcon extends BeanBase<ScopeModule> {
  getIcons() {
    const res = this.scope.local.icon.getIcons();
    this.ctx.success(res);
  }
}
