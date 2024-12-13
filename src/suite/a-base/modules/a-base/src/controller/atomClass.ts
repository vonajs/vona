mport { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';

@Controller()
export class ControllerAtomClass extends BeanBase {
  async validatorSearch() {
    const res = await this.scope.service.atomClass.validatorSearch({
      atomClass: this.ctx.request.body.atomClass,
    });
    this.app.success(res);
  }

  async checkRightCreate() {
    const res = await this.scope.service.atomClass.checkRightCreate({
      atomClass: this.ctx.request.body.atomClass,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }

  async atomClass() {
    const res = await this.scope.service.atomClass.atomClass({
      atomClass: this.ctx.request.body.atomClass,
    });
    this.app.success(res);
  }

  async atomClassesUser() {
    const res = await this.scope.service.atomClass.atomClassesUser({
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }

  async actionsUser() {
    const res = await this.scope.service.atomClass.actionsUser({
      atomClass: this.ctx.request.body.atomClass,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }
}
