import { __ThisModule__ } from '../resource/this.js';
import { BeanBase, Controller } from '@cabloy/core';
import { ScopeModule } from '../resource/this.js';

@Controller()
export class ControllerMonkeyer extends BeanBase<ScopeModule> {
  async test() {
    const config = this.ctx.config.module('test-party');
    this.ctx.success({
      moduleName: __ThisModule__,
      monkeyed: config.monkeyed,
    });
  }
}
