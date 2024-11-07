import { __ThisModule__ } from '../.metadata/this.js';
import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Controller()
export class ControllerMonkeyer extends BeanBase<ScopeModule> {
  async test() {
    const config = this.$scope.testParty.config;
    this.ctx.success({
      moduleName: __ThisModule__,
      monkeyed: config.monkeyed,
    });
  }
}
