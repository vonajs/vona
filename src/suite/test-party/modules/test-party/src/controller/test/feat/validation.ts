import { BeanBase, Controller } from '@cabloy/core';
import { ScopeModule } from '../../../resource/this.js';

@Controller()
export class ControllerTestFeatValidation extends BeanBase<ScopeModule> {
  async success() {
    this.ctx.success();
  }

  async fail() {
    this.ctx.success();
  }

  async schema() {
    this.ctx.success();
  }
}
