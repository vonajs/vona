import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Controller()
export class ControllerTestCtxLocale extends BeanBase<ScopeModule> {
  async enus() {
    const message = this.scope.config.message;
    const data = {
      enus: this.app.text(message),
      zhcn: this.app.text.locale('zh-cn', message),
    };

    // done
    this.app.success(data);
  }

  async zhcn() {
    const message = this.scope.config.message;
    const data = {
      zhcn: this.app.text(message),
      enus: this.app.text.locale('en-us', message),
    };

    // done
    this.app.success(data);
  }
}
