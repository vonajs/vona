// eslint-disable-next-line
import { app, mockUrl, mockInfo, assert } from 'egg-born-mock';

describe.only('test/controller/test/ctx/performAction.test.js', () => {
  it('action:performAction', async () => {
    const result = await app.httpRequest().post(mockUrl('test/ctx/performAction')).send({
      id: 123,
    });
    assert.equal(result.body.data, 123);
  });
});
