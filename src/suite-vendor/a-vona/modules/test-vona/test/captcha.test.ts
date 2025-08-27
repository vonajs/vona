import assert from 'node:assert';
import { describe, it } from 'node:test';
import { app } from 'vona-mock';

describe('captcha.test.ts', () => {
  it('action:captcha', async () => {
    await app.bean.executor.mockCtx(async () => {
      // create
      const captcha = await app.bean.captcha.create('a-captchasimple:simple');
      assert.equal(captcha.provider, 'a-captchasimple:simple');
      // get
      const captchaData = await app.bean.captcha.getCaptchaData(captcha.id);
      assert.equal(captchaData?.provider, 'a-captchasimple:simple');
      // token
      const token = captchaData?.token;
      // verify: false
      const verifiedFalse = await app.bean.captcha.verify(captcha.id, `${token}!`);
      assert.equal(verifiedFalse, false);
      // verify: true
      const verifiedTrue = await app.bean.captcha.verify(captcha.id, token);
      assert.equal(verifiedTrue, true);
    });
  });
});
