import assert from 'node:assert';
import { describe, it } from 'node:test';
import { app } from 'vona-mock';

describe('static.test.ts', () => {
  it('action:static', async () => {
    await app.bean.executor.mockCtx(async () => {
      const scopeTest = app.scope('test-vona');
      const url = scopeTest.static.get('img/vona.png');
      assert.equal(url, '');
    });
  });
});
