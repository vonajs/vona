import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Controller()
export class ControllerAtomClass extends BeanBase<ScopeModule> {
  async validatorSearch() {
    const res = await this.scope.service.atomClass.validatorSearch({
      atomClass: this.ctx.request.body.atomClass,
    });
    this.ctx.success(res);
  }

  async checkRightCreate() {
    const res = await this.scope.service.atomClass.checkRightCreate({
      atomClass: this.ctx.request.body.atomClass,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async atomClass() {
    const res = await this.scope.service.atomClass.atomClass({
      atomClass: this.ctx.request.body.atomClass,
    });
    this.ctx.success(res);
  }

  async atomClassesUser() {
    const res = await this.scope.service.atomClass.atomClassesUser({
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }

  async actionsUser() {
    const res = await this.scope.service.atomClass.actionsUser({
      atomClass: this.ctx.request.body.atomClass,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }
}
