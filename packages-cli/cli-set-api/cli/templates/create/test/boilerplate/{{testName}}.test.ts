import { app, assert } from 'egg-born-mock';

describe('<%=argv.testName%>.test.ts', () => {
  it('action:<%=argv.testName%>', async () => {
    await app.meta.mockUtil.mockCtx(async ctx => {
      assert.equal(ctx.subdomain, '');
    });
  });
});
