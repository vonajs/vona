import { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';

@Controller()
export class ControllerTestCtxLocale extends BeanBase {
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
