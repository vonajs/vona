import assert from 'node:assert';
import { describe, it } from 'node:test';
import { app } from 'vona-mock';

describe('captcha.test.ts', () => {
  it('action:captcha', async () => {
    await app.bean.executor.mockCtx(async () => {
      // scene/provider
      const sceneName = 'a-captchasimple:simple';
      const providerName = 'a-captchasimple:simple';
      // create
      const captcha = await app.bean.captcha.create(sceneName);
      assert.equal(captcha.provider, providerName);
      // get
      const captchaData = await app.bean.captcha.getCaptchaData(captcha.id);
      assert.equal(captchaData?.provider, providerName);
      // token
      const token = captchaData?.token;
      // verify: false
      const verifiedFalse = await app.bean.captcha.verify(captcha.id, `${token}!`, sceneName);
      assert.equal(verifiedFalse, false);
      // verify: true
      const verifiedTrue = await app.bean.captcha.verify(captcha.id, token, sceneName);
      assert.equal(verifiedTrue, true);
    });
  });
});
