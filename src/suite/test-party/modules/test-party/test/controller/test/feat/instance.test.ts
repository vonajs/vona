// eslint-disable-next-line
import { app, mockUrl, mockModuleInfo, assert } from 'egg-born-mock';

describe('test/controller/test/feat/instance.test.js', () => {
  it('action:instance', async () => {
    const result = await app.httpRequest().post(mockUrl('test/feat/instance'));
    assert.equal(result.body.code, 0);
  });
});
