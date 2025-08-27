import assert from 'node:assert';
import { describe, it } from 'node:test';
import { app } from 'vona-mock';

describe.only('captcha.test.ts', () => {
  it('action:captcha', async () => {
    await app.bean.executor.mockCtx(async () => {
      const captcha = await app.bean.captcha.create('a-captchasimple:simple');
      console.log(captcha);
    });
  });
});
