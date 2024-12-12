import { __ThisModule__ } from '../.metadata/this.js';
import { BeanBase, Controller } from 'vona';

@Controller()
export class ControllerTestMonkeyMonkeyee extends BeanBase {
  async test() {
    this.app.success(__ThisModule__);
  }
}
