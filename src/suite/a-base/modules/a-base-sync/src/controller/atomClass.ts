import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleABase } from '../index.js';

@Controller()
export class ControllerAtomClass extends BeanBase {
  @Use()
  scope: ScopeModuleABase;

  async validatorSearch() {
    const res = await this.scope.local.atomClass.validatorSearch({
      atomClass: this.ctx.request.body.atomClass,
    });
    this.ctx.success(res);
  }

  async checkRightCreate() {
    const res = await this.scope.local.atomClass.checkRightCreate({
      atomClass: this.ctx.request.body.atomClass,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async atomClass() {
    const res = await this.scope.local.atomClass.atomClass({
      atomClass: this.ctx.request.body.atomClass,
    });
    this.ctx.success(res);
  }

  async atomClassesUser() {
    const res = await this.scope.local.atomClass.atomClassesUser({
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async actionsUser() {
    const res = await this.scope.local.atomClass.actionsUser({
      atomClass: this.ctx.request.body.atomClass,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }
}
