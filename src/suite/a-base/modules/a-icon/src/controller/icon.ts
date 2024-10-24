import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Controller()
export class ControllerIcon extends BeanBase<ScopeModule> {
  getIcons() {
    const res = this.scope.service.icon.getIcons();
    this.ctx.success(res);
  }
}
