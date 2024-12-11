import assert from 'assert';
import { app, mockUrl } from 'vona-mock';

describe.only('performAction.test.js', () => {
  it('action:performAction', async () => {
    const result = await app.bean.executor.mockCtx(async () => {
      return await app.bean.executor.performAction<{ id: number; url: string }>({
        method: 'post',
        url: mockUrl('performAction/echo'),
        body: {
          id: 123,
        },
      });
    });
    assert.equal(result.id, 123);
    assert.equal(result.url, mockUrl('performAction/echo'));
  });
  it('action:performAction:onionsDynamic', async () => {
    const result = await app.bean.executor.mockCtx(async () => {
      return await app.bean.executor.performAction<{ id: number; url: string }>({
        method: 'post',
        url: mockUrl('performAction/echo'),
        onions: {
          pipe: { 'a-validator:valid': { enable: false } },
        },
      });
    });
    assert.equal(result.id, undefined);
    assert.equal(result.url, mockUrl('performAction/echo'));
  });
});
