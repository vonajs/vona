import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleAUser } from '../index.js';

@Controller()
export class ControllerPublic extends BeanBase {
  async profile() {
    const res = await this.ctx.service.public.profile({
      userId: this.ctx.request.body.userId,
    });
    this.ctx.success(res);
  }
}
