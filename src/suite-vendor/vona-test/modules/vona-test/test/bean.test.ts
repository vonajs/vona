import { app, mockUrl } from 'vona-mock';

describe.only('bean.test.ts', () => {
  it('action:bean', async () => {
    await app.bean.executor.mockCtx(async () => {
      await app.bean.executor.performAction({
        method: 'get',
        url: mockUrl('bean/test'),
      });
    });
  });

  it('action:service', async () => {
    await app.bean.executor.mockCtx(async () => {
      await app.bean.executor.performAction({
        method: 'get',
        url: mockUrl('bean/service'),
      });
    });
  });
});
