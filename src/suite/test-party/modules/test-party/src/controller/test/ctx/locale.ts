import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../../../.metadata/this.js';

@Controller()
export class ControllerTestCtxLocale extends BeanBase<ScopeModule> {
  async enus() {
    const message = this.scope.config.message;
    const data = {
      enus: this.ctx.text(message),
      zhcn: this.ctx.text.locale('zh-cn', message),
    };

    // done
    this.ctx.success(data);
  }

  async zhcn() {
    const message = this.scope.config.message;
    const data = {
      zhcn: this.ctx.text(message),
      enus: this.ctx.text.locale('en-us', message),
    };

    // done
    this.ctx.success(data);
  }
}
