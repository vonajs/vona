// eslint-disable-next-line
import { app, mockUrl, mockModuleInfo, assert } from 'vona-mock';

/**
 * simple
 * edgeSequence
 * activityNone
 * activityService
 * startEventTimer
 */
describe('flow.set00', () => {
  it('simple', async () => {
    // ctx
    const ctx = await app.meta.mockUtil.mockCtx();
    // login as root
    await ctx.meta.mockUtil.login({ auth: 'root' });
    // flow start
    await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: mockUrl('flow/start', false),
      body: {
        flowDefKey: {
          module: mockModuleInfo().relativeName,
          name: 'set00_simple',
        },
        flowVars: {
          a: 1,
          b: 2,
        },
      },
    });
  });
  it('edgeSequence', async () => {
    // ctx
    const ctx = await app.meta.mockUtil.mockCtx();
    // login as root
    await ctx.meta.mockUtil.login({ auth: 'root' });
    // flow start
    await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: mockUrl('flow/start', false),
      body: {
        flowDefKey: {
          module: mockModuleInfo().relativeName,
          name: 'set00_edgeSequence',
        },
        flowVars: {
          x: 1,
        },
      },
    });
    await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: mockUrl('flow/start', false),
      body: {
        flowDefKey: {
          module: mockModuleInfo().relativeName,
          name: 'set00_edgeSequence',
        },
        flowVars: {
          x: 2,
        },
      },
    });
  });
  it('activityNone', async () => {
    // ctx
    const ctx = await app.meta.mockUtil.mockCtx();
    // login as root
    await ctx.meta.mockUtil.login({ auth: 'root' });
    // flow start
    await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: mockUrl('flow/start', false),
      body: {
        flowDefKey: {
          module: mockModuleInfo().relativeName,
          name: 'set00_activityNone',
        },
      },
    });
  });
  it('activityService', async () => {
    // ctx
    const ctx = await app.meta.mockUtil.mockCtx();
    // login as root
    await ctx.meta.mockUtil.login({ auth: 'root' });
    // flow start
    await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: mockUrl('flow/start', false),
      body: {
        flowDefKey: {
          module: mockModuleInfo().relativeName,
          name: 'set00_activityService',
        },
      },
    });
  });
  it.skip('startEventTimer', async () => {
    // ctx
    const ctx = await app.meta.mockUtil.mockCtx();
    // login as root
    await ctx.meta.mockUtil.login({ auth: 'root' });
    // flow start
    await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: mockUrl('flow/start', false),
      body: {
        flowDefKey: {
          module: mockModuleInfo().relativeName,
          name: 'set00_startEventTimer',
        },
      },
    });
  });
});
