import assert from 'node:assert';
import { describe, it } from 'node:test';
import { evaluateExpressions } from '@cabloy/utils';
import { app } from 'vona-mock';

describe('celjs.test.ts', () => {
  it('action:celjs', async () => {
    //
    const beanJwt = app.bean.jwt;
    assert.equal(evaluateExpressions('cel://self.app.config.server.workers', { self: beanJwt }) > 0, true);
    //
    assert.deepEqual(evaluateExpressions('cel://{"a": 1, "b": true}'), { a: 1, b: true });
    assert.deepEqual(evaluateExpressions('cel://{"id": 1, "name": "tom"}'), { id: 1, name: 'tom' });
  });
});
