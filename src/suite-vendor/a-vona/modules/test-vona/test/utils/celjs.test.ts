import assert from 'node:assert';
import { describe, it } from 'node:test';
import { cel, evaluateExpressions } from '@cabloy/utils';
import { app } from 'vona-mock';

describe('celjs.test.ts', () => {
  it('action:celjs', async () => {
    await app.bean.executor.mockCtx(async () => {
      //
      assert.equal(evaluateExpressions(cel('app.config.server.workers'), { app: { ...app } }) > 0, true);
      // map
      assert.deepEqual(evaluateExpressions(cel('{"a": 1, "b": true}')), { a: 1, b: true });
      assert.deepEqual(evaluateExpressions(cel('{"id": 1, "name": "tom"}')), { id: 1, name: 'tom' });
      // array
      assert.deepEqual(evaluateExpressions(cel('concat(1,[2,3],4)')), [1, 2, 3, 4]);
      assert.deepEqual(evaluateExpressions(cel('join(concat(1,[2,3],4),"_")')), '1_2_3_4');
      // +
      assert.equal(evaluateExpressions(cel('1+"a"')), '1a');
      assert.equal(evaluateExpressions(cel('"a"+1')), 'a1');
      // optional
      assert.equal(evaluateExpressions(cel('a.?b.hasValue()'), { a: {} }), false);
      assert.equal(evaluateExpressions(cel('a.?b.value()'), { a: { b: 1 } }), 1);
      assert.equal(evaluateExpressions(cel('get(a, "b.c")'), { a: { b: 1 } }), undefined);
      assert.equal(evaluateExpressions(cel('get(a, "b.c")'), { a: { b: { c: 1 } } }), 1);
    });
  });
});
