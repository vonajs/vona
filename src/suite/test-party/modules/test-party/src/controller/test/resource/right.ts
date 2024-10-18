import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../../../resource/this.js';

@Controller()
export class ControllerTestResourceRight extends BeanBase<ScopeModule> {
  async checkRightResourceUser() {
    // checked by route/middleware
    this.ctx.success();
  }
}
