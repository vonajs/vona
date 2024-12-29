import assert from 'node:assert';
import { app } from 'vona-mock';

describe('cacheRedis.test.ts', () => {
  it('action:cacheRedis', async () => {
    await app.bean.executor.mockCtx(async () => {
      assert.equal(app.ctx.subdomain, '');
    });
  });
});
