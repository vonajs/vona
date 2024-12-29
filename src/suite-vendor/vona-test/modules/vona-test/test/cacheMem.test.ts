import assert from 'node:assert';
import { app } from 'vona-mock';

describe('cacheMem.test.ts', () => {
  it('action:cacheMem', async () => {
    await app.bean.executor.mockCtx(async () => {
      let res;
      let value;

      // name
      const name = '__test:name:mem';

      // set
      value = this.ctx.cache.mem.getset(name, 'zhen.nann');
      assert.equal(value, undefined);

      value = this.ctx.cache.mem.getset(name, 'zhennann');
      assert.equal(value, 'zhen.nann');

      // has
      res = this.ctx.cache.mem.has(name);
      assert.equal(!!res, true);

      // get
      value = this.ctx.cache.mem.get(name);
      assert.equal(value, 'zhennann');

      // remove
      this.ctx.cache.mem.remove(name);
      res = this.ctx.cache.mem.has(name);
      assert.equal(res, null);

      // set with timeout
      this.ctx.cache.mem.set(name, 'zhennann', 1000);

      // get
      value = this.ctx.cache.mem.get(name);
      assert.equal(value, 'zhennann');

      // other module's cache
      const moduleCache = this.ctx.cache.mem.module(this.ctx.module.info.relativeName);
      value = moduleCache.get(name);
      assert.equal(value, 'zhennann');

      // get after timeout
      await sleep(1500);
      value = this.ctx.cache.mem.get(name);
      assert.equal(value, null);
    });
  });
});
