import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../.metadata/this.js';
import assert from 'assert';
import pMap from 'p-map';

@Controller()
export class ControllerTestFeatSequence extends BeanBase<ScopeModule> {
  async sequence() {
    const arr = [1, 2, 3, 4, 5];
    let results;

    // current
    let current = await this.app.bean.sequence.current('test');
    assert.equal(current, 0);

    // next
    let next = await this.app.bean.sequence.next('test');
    assert.equal(next, 1);

    // current
    current = await this.app.bean.sequence.current('test');
    assert.equal(current, 1);

    // reset
    await this.app.bean.sequence.reset('test');

    // other module's sequence
    const moduleSequence = this.app.bean.sequence.module(this.ctx.module.info.relativeName);

    // next
    next = await moduleSequence.next('test');
    assert.equal(next, 1);

    // current
    current = await moduleSequence.current('test');
    assert.equal(current, 1);

    // reset
    await moduleSequence.reset('test');

    // concurrency
    results = await pMap(arr, async () => {
      return await moduleSequence.next('test');
    });
    assert.equal(new Set(results).size, new Set(arr).size);

    // reset
    await moduleSequence.reset('test');

    // concurrency transaction
    results = await pMap(arr, async () => {
      return await this.ctx.meta.util.executeBeanIsolate({
        transaction: true,
        fn: async () => {
          const res = await this.app.bean.sequence.next('test');
          await this.bean.util.sleep(50);
          return res;
        },
      });
    });
    assert.equal(new Set(results).size, new Set(arr).size, `sequence next: ${results}`);

    // reset
    await moduleSequence.reset('test');

    // done
    this.app.success();
  }
}
