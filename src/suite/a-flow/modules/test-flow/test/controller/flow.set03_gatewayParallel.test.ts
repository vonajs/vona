// eslint-disable-next-line
import { app, mockUrl, mockModuleInfo, assert } from 'egg-born-mock';

describe('flow.set03_gatewayParallel', () => {
  it('gatewayParallel', async () => {
    // ctx
    const ctx = await app.meta.mockUtil.mockCtx();
    // login as root
    await ctx.meta.mockUtil.login({ auth: 'root' });
    // flow start
    await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: '/test/flow/flow/start',
      body: {
        flowDefKey: {
          module: mockModuleInfo().relativeName,
          name: 'set03_gatewayParallel',
        },
      },
    });
  });
});
