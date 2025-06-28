import assert from 'node:assert';
import { describe, it } from 'node:test';
import { evaluateExpressions } from '@cabloy/utils';
import { app } from 'vona-mock';

describe('celjs.test.ts', () => {
  it('action:celjs', async () => {
    const beanJwt = app.bean.jwt;
    assert.equal(evaluateExpressions('#!#app.config', beanJwt), 'ss');
  });
});
