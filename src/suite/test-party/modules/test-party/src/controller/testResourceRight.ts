import { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';

@Controller()
export class ControllerTestResourceRight extends BeanBase {
  async checkRightResourceUser() {
    // checked by route/middleware
    this.app.success();
  }
}
