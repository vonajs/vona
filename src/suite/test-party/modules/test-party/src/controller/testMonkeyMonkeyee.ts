import { __ThisModule__ } from '../../../.metadata/this.js';
import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../../../.metadata/this.js';

@Controller()
export class ControllerTestMonkeyMonkeyee extends BeanBase<ScopeModule> {
  async test() {
    this.ctx.success(__ThisModule__);
  }
}
