import { BeanBase } from 'vona';
import assert from 'assert';
import { Controller, Post } from 'vona-module-a-web';

@Controller({ path: 'status', meta: { mode: 'unittest' } })
export class ControllerStatus extends BeanBase {
  @Post()
  async status() {
    // get
    let value = await this.scope.status.get('enable');
    assert.equal(value, undefined);

    // set
    await this.scope.status.set('enable', true);

    // get
    value = await this.scope.status.get('enable');
    assert.equal(value, true);
  }
}
