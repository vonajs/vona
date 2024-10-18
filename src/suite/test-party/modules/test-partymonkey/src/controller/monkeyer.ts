import { __ThisModule__ } from '../resource/this.js';
import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../resource/this.js';

@Controller()
export class ControllerMonkeyer extends BeanBase<ScopeModule> {
  async test() {
    const config = this.getScope('test-party').config;
    this.ctx.success({
      moduleName: __ThisModule__,
      monkeyed: config.monkeyed,
    });
  }
}
