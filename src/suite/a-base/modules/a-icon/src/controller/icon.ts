import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleAIcon } from '../index.js';

@Controller()
export class ControllerIcon extends BeanBase {
  getIcons() {
    const res = this.ctx.service.icon.getIcons();
    this.ctx.success(res);
  }
}
