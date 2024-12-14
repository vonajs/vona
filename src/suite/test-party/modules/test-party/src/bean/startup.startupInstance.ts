import { BeanBase } from 'vona';
import { IStartupExecute, Startup } from 'vona-module-a-startup';

import assert from 'assert';

@Startup({ instance: true })
export class StartupStartupInstance extends BeanBase implements IStartupExecute {
  async execute() {
    console.log(`test/feat/startup: instance:${this.ctx.instance.id}`);
    assert(this.ctx.instance.id !== undefined);
  }
}
