import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleALogin } from '../index.js';

@Controller()
export class ControllerAuth extends BeanBase {
  async list() {
    const res = await this.ctx.service.auth.list();
    this.ctx.success(res);
  }
}
