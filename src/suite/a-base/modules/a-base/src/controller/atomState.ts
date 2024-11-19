import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Controller()
export class ControllerAtomState extends BeanBase<ScopeModule> {
  async getDictDynamic() {
    const res = await this.scope.service.atomState.getDictDynamic({
      atomClass: this.ctx.request.body.atomClass,
    });
    this.app.success(res);
  }
}
