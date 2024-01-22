const { app, mockUrl, mockInfo, assert } = require('egg-born-mock')(__dirname);

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
      url: '/a/flowgateway/flow/start',
      body: {
        flowDefKey: {
          module: mockInfo().relativeName,
          name: 'set03_gatewayParallel',
        },
      },
    });
  });
});
