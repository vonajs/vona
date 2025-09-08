import type { ICaptchaData } from 'vona-module-a-captcha';
import assert from 'node:assert';
import { describe, it } from 'node:test';
import { catchError } from '@cabloy/utils';
import { app } from 'vona-mock';

describe('captcha.test.ts', () => {
  // scene/provider
  const sceneName = 'a-captchasimple:simple';
  const providerName = 'a-captchasimple:imageText';
  it('action:captcha', async () => {
    await app.bean.executor.mockCtx(async () => {
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
      // verify: false
      const verifiedFalse2 = await app.bean.captcha.verify(captcha.id, token, sceneName);
      assert.equal(verifiedFalse2, true);
    });
  });
  it('action:captcha api:error', async () => {
    await app.bean.executor.mockCtx(async () => {
      // create
      const captcha: ICaptchaData = await app.bean.executor.performAction('post', '/captcha/create', {
        body: {
          scene: sceneName,
        },
      });
      assert.equal(captcha.provider, providerName);
      // refresh
      const captcha2: ICaptchaData = await app.bean.executor.performAction('post', '/captcha/refresh', {
        body: {
          id: captcha.id,
          scene: sceneName,
        },
      });
      assert.equal(captcha2.provider, providerName);
      assert.equal(captcha2.id, captcha.id);
      // get token
      const captchaData = await app.bean.captcha.getCaptchaData(captcha2.id);
      // verifyImmediate: error
      const [_, error] = await catchError(() => {
        return app.bean.executor.performAction('post', '/captcha/verifyImmediate', {
          body: {
            id: captcha2.id,
            token: `${captchaData?.token}!`,
          },
        });
      });
      assert.equal(error?.code, 403);
      // verifyImmediate: error again
      const [_2, error2] = await catchError(() => {
        return app.bean.executor.performAction('post', '/captcha/verifyImmediate', {
          body: {
            id: captcha2.id,
            token: captchaData?.token,
          },
        });
      });
      assert.equal(error2?.code, 403);
    });
  });
  it('action:captcha api:ok', async () => {
    await app.bean.executor.mockCtx(async () => {
      // create
      const captcha: ICaptchaData = await app.bean.executor.performAction('post', '/captcha/create', {
        body: {
          scene: sceneName,
        },
      });
      assert.equal(captcha.provider, providerName);
      // refresh
      const captcha2: ICaptchaData = await app.bean.executor.performAction('post', '/captcha/refresh', {
        body: {
          id: captcha.id,
          scene: sceneName,
        },
      });
      assert.equal(captcha2.provider, providerName);
      assert.equal(captcha2.id, captcha.id);
      // get token
      const captchaData = await app.bean.captcha.getCaptchaData(captcha2.id);
      // verifyImmediate: ok
      const tokenSecondary = await app.bean.executor.performAction('post', '/captcha/verifyImmediate', {
        body: {
          id: captcha2.id,
          token: captchaData?.token,
        },
      });
      assert.equal(!!tokenSecondary, true);
      // verify: ok
      await app.bean.executor.performAction('post', '/test/vona/captcha/signin', {
        body: {
          username: 'xxx',
          password: 'xxx',
          captcha: {
            id: captcha2.id,
            token: tokenSecondary,
          },
        },
      });
    });
  });
});
