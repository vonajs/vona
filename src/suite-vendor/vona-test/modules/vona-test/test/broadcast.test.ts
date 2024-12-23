import assert from 'node:assert';
import { app } from 'vona-mock';

describe('broadcast.test.ts', () => {
  it('action:broadcast', async () => {
    await app.bean.executor.mockCtx(async () => {
      app.bean.scope('vona-test').broadcast.test.emit(
        { message: 'hello' },
        {
          locale: 'zh-cn',
        },
      );
      assert.equal(app.ctx.subdomain, '');
    });
  });
});
