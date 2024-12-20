import { app } from 'vona-mock';

describe('bean.test.ts', () => {
  it('action:bean', async () => {
    await app.bean.executor.mockCtx(async () => {
      await app.bean.executor.performAction('get', '/vona/test/bean/test');
    });
  });

  it('action:service', async () => {
    await app.bean.executor.mockCtx(async () => {
      await app.bean.executor.performAction('get', '/vona/test/bean/service');
    });
  });
});
