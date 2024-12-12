import { BeanBase, Controller } from 'vona';

@Controller()
export class ControllerTestResourceRight extends BeanBase {
  async checkRightResourceUser() {
    // checked by route/middleware
    this.app.success();
  }
}
