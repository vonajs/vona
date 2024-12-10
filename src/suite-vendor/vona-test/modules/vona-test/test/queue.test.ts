import { app, mockUrl } from 'vona-mock';

describe.only('queue.test.js', () => {
  it('action:queue', async () => {
    await app.meta.mockUtil.mockCtx(async () => {
      await app.bean.executor.performAction({
        method: 'post',
        url: mockUrl('queue/pushAsync'),
      });
      await app.bean.executor.performAction({
        method: 'post',
        url: mockUrl('queue/push'),
      });
    });
  });
});
