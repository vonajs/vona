import { BeanBase, Controller } from 'vona';

@Controller()
export class ControllerIcon extends BeanBase {
  getIcons() {
    const res = this.scope.service.icon.getIcons();
    this.app.success(res);
  }
}
