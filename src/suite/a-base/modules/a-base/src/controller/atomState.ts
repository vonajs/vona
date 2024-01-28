import { BeanBase, Controller } from '@cabloy/core';
import { ScopeModule } from '../resource/this.js';

@Controller()
export class ControllerAtomState extends BeanBase<ScopeModule> {
  async getDictDynamic() {
    const res = await this.scope.local.atomState.getDictDynamic({
      atomClass: this.ctx.request.body.atomClass,
    });
    this.ctx.success(res);
  }
}
