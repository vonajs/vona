mport { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';

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
