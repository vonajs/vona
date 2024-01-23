import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleASocketio } from '../index.js';

@Controller()
export class ControllerMessageClass extends BeanBase {
  async messageClass() {
    const res = await this.ctx.service.messageClass.messageClass({
      messageClass: this.ctx.request.body.messageClass,
    });
    this.ctx.success(res);
  }
}
