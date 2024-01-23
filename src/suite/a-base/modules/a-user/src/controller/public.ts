import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleAUser } from '../index.js';

@Controller()
export class ControllerPublic extends BeanBase {
  @Use()
  scope: ScopeModuleAUser;

  async profile() {
    const res = await this.scope.local.public.profile({
      userId: this.ctx.request.body.userId,
    });
    this.ctx.success(res);
  }
}
