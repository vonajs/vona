import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleABase } from '../index.js';

@Controller()
export class ControllerAtomState extends BeanBase {
  @Use()
  scope: ScopeModuleABase;

  async getDictDynamic() {
    const res = await this.scope.local.atomState.getDictDynamic({
      atomClass: this.ctx.request.body.atomClass,
    });
    this.ctx.success(res);
  }
}
