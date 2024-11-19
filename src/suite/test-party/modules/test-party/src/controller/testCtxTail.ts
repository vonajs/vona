import { BeanBase, Cast, Controller } from 'vona';
import { ScopeModule } from '../.metadata/this.js';
import assert from 'assert';

@Controller()
export class ControllerTestCtxTail extends BeanBase<ScopeModule> {
  async tail() {
    // 1
    Cast(this.ctx.meta)._tail_test = 1;

    // tail
    this.ctx.tail(() => {
      console.log('--------:', Cast(this.ctx.meta)._tail_test_caller);
      assert.equal(Cast(this.ctx.meta)._tail_test, 2);
      this.ctx.tail(() => {
        assert.equal(Cast(this.ctx.meta)._tail_test, 3);
      });
      Cast(this.ctx.meta)._tail_test = 3;
    });

    // 2
    Cast(this.ctx.meta)._tail_test = 2;

    // done
    this.ctx.success();
  }
}
