import { __ThisModule__ } from '../.metadata/this.js';
mport { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';

@Controller()
export class ControllerTestMonkeyMonkeyee extends BeanBase {
  async test() {
    this.app.success(__ThisModule__);
  }
}
