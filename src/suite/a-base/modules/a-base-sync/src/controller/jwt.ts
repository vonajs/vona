import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleABase } from '../index.js';

@Controller()
export class ControllerJwt extends BeanBase {
  async create() {
    const res = await this.ctx.service.jwt.create({
      scene: this.ctx.request.body.scene,
    });
    this.ctx.success(res);
  }
}
