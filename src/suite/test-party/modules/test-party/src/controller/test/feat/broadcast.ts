import { BeanBase, Controller } from '@cabloy/core';
import { ScopeModule } from '../../../resource/this.js';

@Controller()
export class ControllerTestFeatBroadcast extends BeanBase<ScopeModule> {
  async emit() {
    this.ctx.meta.util.broadcastEmit({
      locale: 'zh-cn',
      module: 'test-party',
      broadcastName: 'broadcastTest',
      data: { message: 'hello' },
    });
    this.ctx.success();
  }
}
