import { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';

@Controller()
export class ControllerAtomState extends BeanBase {
  async getDictDynamic() {
    const res = await this.scope.service.atomState.getDictDynamic({
      atomClass: this.ctx.request.body.atomClass,
    });
    this.app.success(res);
  }
}
