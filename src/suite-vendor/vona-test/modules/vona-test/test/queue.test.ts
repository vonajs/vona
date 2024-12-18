import { app } from 'vona-mock';

describe.only('queue.test.js', () => {
  it('action:queue', async () => {
    await app.bean.executor.mockCtx(async () => {
      await app.bean.executor.performAction('post', '/vona/test/queue/pushAsync');
      await app.bean.executor.performAction('post', '/vona/test/queue/push');
    });
  });
});
