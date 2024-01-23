import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleABase } from '../index.js';

@Controller()
export class ControllerAtomClass extends BeanBase {
  async validatorSearch() {
    const res = await this.ctx.service.atomClass.validatorSearch({
      atomClass: this.ctx.request.body.atomClass,
    });
    this.ctx.success(res);
  }

  async checkRightCreate() {
    const res = await this.ctx.service.atomClass.checkRightCreate({
      atomClass: this.ctx.request.body.atomClass,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async atomClass() {
    const res = await this.ctx.service.atomClass.atomClass({
      atomClass: this.ctx.request.body.atomClass,
    });
    this.ctx.success(res);
  }

  async atomClassesUser() {
    const res = await this.ctx.service.atomClass.atomClassesUser({
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async actionsUser() {
    const res = await this.ctx.service.atomClass.actionsUser({
      atomClass: this.ctx.request.body.atomClass,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }
}
