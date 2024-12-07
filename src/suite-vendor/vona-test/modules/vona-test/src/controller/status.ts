import { BeanBase, Controller, Post } from 'vona';
import { ScopeModule } from '../.metadata/this.js';
import assert from 'assert';

@Controller({ path: 'status', meta: { mode: 'unittest' } })
export class ControllerStatus extends BeanBase<ScopeModule> {
  @Post()
  async status() {
    // name
    const name = '__test_enable';

    // get
    let value = await this.app.bean.status.get(name);
    assert.equal(value, undefined);

    // set
    await this.app.bean.status.set(name, true);

    // get
    value = await this.app.bean.status.get(name);
    assert.equal(value, true);

    // other module's status
    const moduleStatus = this.app.bean.status.module(this.ctx.module.info.relativeName);
    value = await moduleStatus.get(name);
    assert.equal(value, true);

    // set
    await this.app.bean.status.set(name, false);

    // get
    value = await this.app.bean.status.get(name);
    assert.equal(value, false);
  }
}
