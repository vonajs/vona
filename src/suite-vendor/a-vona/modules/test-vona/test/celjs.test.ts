import assert from 'node:assert';
import { describe, it } from 'node:test';
import { evaluateExpressions } from '@cabloy/utils';
import { cast } from 'vona';
import { app } from 'vona-mock';

describe('celjs.test.ts', () => {
  it('action:celjs', async () => {
    await app.bean.executor.mockCtx(async () => {
      //
      const beanJwt = app.bean.jwt;
      assert.equal(evaluateExpressions('cel://self.app.config.server.workers', { self: beanJwt, app: cast(beanJwt).app, ctx: cast(beanJwt).ctx }) > 0, true);
      assert.equal(evaluateExpressions('cel://app.config.server.workers', { self: beanJwt, app: cast(beanJwt).app, ctx: cast(beanJwt).ctx }) > 0, true);
      assert.equal(evaluateExpressions('cel://ctx.app.config.server.workers', { self: beanJwt, app: cast(beanJwt).app, ctx: cast(beanJwt).ctx }) > 0, true);
      // map
      assert.deepEqual(evaluateExpressions('cel://{"a": 1, "b": true}'), { a: 1, b: true });
      assert.deepEqual(evaluateExpressions('cel://{"id": 1, "name": "tom"}'), { id: 1, name: 'tom' });
      // array
      assert.deepEqual(evaluateExpressions('cel://concat(1,[2,3],4)'), [1, 2, 3, 4]);
      assert.deepEqual(evaluateExpressions('cel://join(concat(1,[2,3],4),"_")'), '1_2_3_4');
    });
  });
});
