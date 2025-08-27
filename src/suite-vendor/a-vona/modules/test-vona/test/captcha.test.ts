import assert from 'node:assert';
import { describe, it } from 'node:test';
import { app } from 'vona-mock';

describe('captcha.test.ts', () => {
  it('action:captcha', async () => {
    await app.bean.executor.mockCtx(async () => {
      const captcha = await app.bean.captcha.create('a-captchasimple:simple');
      assert.equal(app.ctx.instanceName, '');
    });
  });
});
