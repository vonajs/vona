// eslint-disable-next-line
import { app, mockUrl, mockInfo, assert } from 'egg-born-mock';

describe('test/controller/test/monkey/monkeyer.test.js', () => {
  it('action:test', async () => {
    // ctx
    const ctx = await app.meta.mockUtil.mockCtx();
    const data = await ctx.meta.util.performAction({
      innerAccess: false,
      method: 'post',
      url: mockUrl('/test/party/test/monkey/monkeyee/test', false),
    });
    assert.equal(data.moduleName, 'test-partymonkey');
    assert.equal(data.monkeyed, true);
  });
});
