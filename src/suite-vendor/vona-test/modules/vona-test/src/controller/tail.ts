import { BeanBase, cast, Controller, Post } from 'vona';
import { ScopeModule } from '../.metadata/this.js';
import assert from 'assert';

@Controller({ path: 'tail', meta: { mode: 'unittest' } })
export class ControllerTail extends BeanBase<ScopeModule> {
  @Post()
  tail() {
    // 1
    cast(this.ctx.meta)._tail_test = 1;

    // tail
    this.ctx.tail(() => {
      assert.equal(cast(this.ctx.meta)._tail_test_als_caller, undefined);
      assert.equal(cast(this.ctx.meta)._tail_test, 2);
      this.ctx.tail(() => {
        assert.equal(cast(this.ctx.meta)._tail_test, 3);
      });
      cast(this.ctx.meta)._tail_test = 3;
    });

    // 2
    cast(this.ctx.meta)._tail_test = 2;
  }
}
