import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Controller()
export class ControllerTestFeatBroadcast extends BeanBase<ScopeModule> {
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
