import { app } from 'vona-mock';

describe('status.test.ts', () => {
  it('action:status', async () => {
    await app.bean.executor.mockCtx(async () => {
      await app.bean.executor.performAction('post', '/vona/test/status');
    });
  });
});
