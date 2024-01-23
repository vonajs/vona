import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleAAuthopen } from '../index.js';

@Controller()
export class ControllerAuth extends BeanBase {
  async signin() {
    // check demo
    this.ctx.bean.util.checkDemo();
    // data: { clientID, clientSecret }
    const res = await this.ctx.service.auth.signin({
      data: this.ctx.request.body.data,
    });
    this.ctx.success(res);
  }
}
