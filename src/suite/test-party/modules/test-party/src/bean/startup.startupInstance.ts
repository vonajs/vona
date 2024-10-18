import { Bean, BeanBase } from 'vona';

import assert from 'assert';

@Bean({ scene: 'startup' })
export class StartupStartupInstance extends BeanBase {
  async execute() {
    console.log(`test/feat/startup: instance:${this.ctx.instance.id}`);
    assert(this.ctx.instance.id !== undefined);
  }
}
