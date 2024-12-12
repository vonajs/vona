import { BeanBase, cast, Controller } from 'vona';
import assert from 'assert';

@Controller()
export class ControllerTestCtxTail extends BeanBase {
  async tail() {
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

    // done
    this.app.success();
  }
}
