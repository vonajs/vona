import { app } from 'vona-mock';

describe.only('status.test.ts', () => {
  it('action:status', async () => {
    await app.bean.executor.mockCtx(async () => {
      await app.bean.executor.performAction('post', '/vona/test/status');
    });
  });
});
