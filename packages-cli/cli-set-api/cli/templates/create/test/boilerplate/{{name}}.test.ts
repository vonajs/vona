import assert from 'assert';
import { app } from 'vona-mock';

describe('<%=argv.name%>.test.ts', () => {
  it('action:<%=argv.name%>', async () => {
    await app.bean.executor.mockCtx(async () => {
      assert.equal(this.ctx.subdomain, '');
    });
  });
});
