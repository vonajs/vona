mport { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';

@Controller()
export class ControllerIcon extends BeanBase {
  getIcons() {
    const res = this.scope.service.icon.getIcons();
    this.app.success(res);
  }
}
