import { app, assert } from 'vona-mock';

describe('<%=argv.name%>.test.ts', () => {
  it('action:<%=argv.name%>', async () => {
    await app.meta.mockUtil.mockCtx(async ctx => {
      assert.equal(ctx.subdomain, '');
    });
  });
});
