import { BeanBase, Cast, Controller, Post } from 'vona';
import { ScopeModule } from '../.metadata/this.js';
import assert from 'assert';

@Controller('tail')
export class ControllerTail extends BeanBase<ScopeModule> {
  @Post()
  tail() {
    // 1
    Cast(this.ctx.meta)._tail_test = 1;

    // tail
    this.ctx.tail(() => {
      assert.equal(Cast(this.ctx.meta)._tail_test_als_caller, undefined);
      assert.equal(Cast(this.ctx.meta)._tail_test, 2);
      this.ctx.tail(() => {
        assert.equal(Cast(this.ctx.meta)._tail_test, 3);
      });
      Cast(this.ctx.meta)._tail_test = 3;
    });

    // 2
    Cast(this.ctx.meta)._tail_test = 2;
  }
}
