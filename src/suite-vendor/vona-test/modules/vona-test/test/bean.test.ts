import { app, mockUrl } from 'vona-mock';
import { apiPath, RequestMethod } from 'vona-module-a-web';

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
        path:
        url: apiPath('/vona/test/bean/service'),
      });
    });
  });
});
