import { __ThisModule__ } from '../.metadata/this.js';
import { BeanBase, Controller } from 'vona';

@Controller()
export class ControllerMonkeyer extends BeanBase {
  async test() {
    const config = this.$scope.testParty.config;
    this.app.success({
      moduleName: __ThisModule__,
      monkeyed: config.monkeyed,
    });
  }
}
