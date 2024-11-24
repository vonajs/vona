// eslint-disable-next-line
import { app, mockUrl, mockModuleInfo, assert } from 'vona-mock';

describe('flow.set03_gatewayExclusive', () => {
  it('gatewayExclusive: 1', async () => {
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
          name: 'set03_gatewayExclusive',
        },
        flowVars: {
          x: 1,
        },
      },
    });
  });

  it('gatewayExclusive: 2', async () => {
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
          name: 'set03_gatewayExclusive',
        },
        flowVars: {
          x: 2,
        },
      },
    });
  });
});
