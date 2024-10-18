import { __ThisModule__ } from '../../../resource/this.js';
import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../../../resource/this.js';

@Controller()
export class ControllerTestMonkeyMonkeyee extends BeanBase<ScopeModule> {
  async test() {
    this.ctx.success(__ThisModule__);
  }
}
