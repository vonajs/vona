import { app, mockUrl } from 'vona-mock';

describe.only('summer.test.ts', () => {
  it('action:summer', async () => {
    await app.bean.executor.mockCtx(async () => {
      await app.bean.executor.performAction({
        method: 'post',
        url: mockUrl('summer'),
      });
    });
  });
});
