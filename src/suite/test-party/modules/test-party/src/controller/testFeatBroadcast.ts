import { BeanBase, Controller } from 'vona';

@Controller()
export class ControllerTestFeatBroadcast extends BeanBase {
  async emit() {
    this.ctx.meta.util.broadcastEmit({
      locale: 'zh-cn',
      module: 'test-party',
      broadcastName: 'broadcastTest',
      data: { message: 'hello' },
    });
    this.app.success();
  }
}
