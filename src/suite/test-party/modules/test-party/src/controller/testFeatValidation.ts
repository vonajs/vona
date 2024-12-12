import { BeanBase, Controller } from 'vona';

@Controller()
export class ControllerTestFeatValidation extends BeanBase {
  async success() {
    this.app.success();
  }

  async fail() {
    this.app.success();
  }

  async schema() {
    this.app.success();
  }
}
