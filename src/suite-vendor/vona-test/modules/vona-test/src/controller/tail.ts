import { BeanBase, cast } from 'vona';
import assert from 'assert';
import { Controller, Post } from 'vona-module-a-web';
import { Api } from 'vona-module-a-openapi';

@Controller({ path: 'tail', meta: { mode: 'unittest' } })
@Api.exclude()
export class ControllerTail extends BeanBase {
  @Post()
  tail() {
    // 1
    cast(this.ctx)._tail_test = 1;

    // tail
    this.ctx.tail(() => {
      assert.equal(cast(this.ctx)._tail_test_als_caller, undefined);
      assert.equal(cast(this.ctx)._tail_test, 2);
      this.ctx.tail(() => {
        assert.equal(cast(this.ctx)._tail_test, 3);
      });
      cast(this.ctx)._tail_test = 3;
    });

    // 2
    cast(this.ctx)._tail_test = 2;
  }
}
