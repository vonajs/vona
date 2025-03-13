import assert from 'node:assert';
import { BeanBase } from 'vona';
import { Api } from 'vona-module-a-openapi';
import { Public } from 'vona-module-a-user';
import { Controller, Post } from 'vona-module-a-web';

@Controller({ path: 'status', meta: { mode: 'test' } })
@Api.exclude()
@Public()
export class ControllerStatus extends BeanBase {
  @Post()
  status() {
    return this._status();
  }

  private async _status() {
    // get
    let value = await this.scope.status.get('enable');
    assert.equal(value, undefined);
    // set
    await this.scope.status.set('enable', true);
    // get
    value = await this.scope.status.get('enable');
    assert.equal(value, true);

    // get
    let user = await this.scope.status.get('user');
    assert.equal(user, undefined);
    // set
    await this.scope.status.set('user', { name: 'zhennann', age: 18 });
    // get
    user = await this.scope.status.get('user');
    assert.deepEqual(user, { name: 'zhennann', age: 18 });
    // update
    await this.scope.status.set('user', { name: 'zhennann', age: 19 });
    // get
    user = await this.scope.status.get('user');
    assert.deepEqual(user, { name: 'zhennann', age: 19 });
  }
}
