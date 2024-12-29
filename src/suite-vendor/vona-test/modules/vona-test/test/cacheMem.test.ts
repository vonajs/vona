import assert from 'node:assert';
import { app } from 'vona-mock';

describe('cacheMem.test.ts', () => {
  it('action:cacheMem', async () => {
    await app.bean.executor.mockCtx(async () => {
      assert.equal(app.ctx.subdomain, '');
    });
  });
});
