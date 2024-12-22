import { BeanBase } from 'vona';
import assert from 'assert';
import { Controller, Post } from 'vona-module-a-web';
import { Api } from 'vona-module-a-openapi';

@Controller({ path: 'status', meta: { mode: 'unittest' } })
@Api.exclude()
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
  }
}
