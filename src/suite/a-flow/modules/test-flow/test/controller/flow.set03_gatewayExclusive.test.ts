// eslint-disable-next-line
import { app, mockUrl, mockInfo, assert } from 'egg-born-mock';

describe.only('flow.set03_gatewayExclusive', () => {
  it('gatewayExclusive: 1', async () => {
    // ctx
    const ctx = await app.meta.mockUtil.mockCtx();
    // login as root
    await ctx.meta.mockUtil.login({ auth: 'root' });
    // flow start
    await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: '/a/flowgateway/flow/start',
      body: {
        flowDefKey: {
          module: mockInfo().relativeName,
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
      url: '/a/flowgateway/flow/start',
      body: {
        flowDefKey: {
          module: mockInfo().relativeName,
          name: 'set03_gatewayExclusive',
        },
        flowVars: {
          x: 2,
        },
      },
    });
  });
});
