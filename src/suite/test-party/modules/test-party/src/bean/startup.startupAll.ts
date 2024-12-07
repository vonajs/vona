import { BeanBase, IStartupExecute, Startup } from 'vona';

import assert from 'assert';

@Startup()
export class StartupStartupAll extends BeanBase implements IStartupExecute {
  async execute() {
    console.log('test/feat/startup: all');
    assert.equal(this.ctx.instance, undefined);
  }
}
