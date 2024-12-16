import { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';

@Controller()
export class ControllerTestFeatBroadcast extends BeanBase {
  async emit() {
    this.scope.broadcast.test.emit(
      { message: 'hello' },
      {
        locale: 'zh-cn',
      },
    );
    this.app.success();
  }
}
