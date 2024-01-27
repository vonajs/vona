import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleABase } from '../index.js';

@Controller()
export class ControllerJwt extends BeanBase {
  @Use()
  scope: ScopeModuleABase;

  async create() {
    const res = await this.scope.local.jwt.create({
      scene: this.ctx.request.body.scene,
    });
    this.ctx.success(res);
  }
}
