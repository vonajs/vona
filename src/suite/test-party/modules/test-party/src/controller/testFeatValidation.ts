import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Controller()
export class ControllerTestFeatValidation extends BeanBase<ScopeModule> {
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
