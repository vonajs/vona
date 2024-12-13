import { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';
import { __ThisModule__ } from '../.metadata/this.js';

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
