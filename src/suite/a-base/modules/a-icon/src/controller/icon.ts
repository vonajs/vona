import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleAIcon } from '../index.js';

@Controller()
export class ControllerIcon extends BeanBase {
  @Use()
  scope: ScopeModuleAIcon;

  getIcons() {
    const res = this.scope.local.icon.getIcons();
    this.ctx.success(res);
  }
}
