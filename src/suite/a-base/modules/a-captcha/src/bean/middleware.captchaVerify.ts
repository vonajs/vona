import { ScopeModule } from '../.metadata/this.js';
import { Bean, BeanBase } from 'vona';

@Bean({ scene: 'middleware' })
export class MiddlewareCaptchaVerify extends BeanBase<ScopeModule> {
  async execute(options, next) {
    // must exists
    const scene = options.scene;
    const scenes = options.scenes;
    if (!scene && !scenes) this.scope.error.SceneNotSpecified.throw();

    // local.disabled
    if (this.ctx.app.meta.isLocal && this.scope.config.configFront.local.disabled) {
      // next
      return await next();
    }

    // scene
    if (scene) {
      await sceneVerify({ ctx: this.ctx, scene });
    } else if (scenes) {
      for (const scene of scenes) {
        await sceneVerify({ ctx: this.ctx, scene });
      }
    }
    // next
    await next();
  }
}

async function sceneVerify({ ctx, scene }: any) {
  // params
  const module = scene.module || ctx.module.info.relativeName;
  const sceneName = scene.name;
  const captchaData = ctx.request.body[scene.dataKey || 'captcha'];
  const providerInstanceId = captchaData.providerInstanceId;
  const dataInput = captchaData.data;
  // verify
  try {
    await ctx.app.bean.captcha.verify({ module, sceneName, providerInstanceId, dataInput });
  } catch (err: any) {
    throw combineCaptchaError({
      fieldKey: scene.fieldKey || 'token',
      message: err.message,
    });
  }
}

function combineCaptchaError({ fieldKey, message }) {
  // error
  const error = new Error();
  error.code = 422;
  const errMessage = [
    {
      keyword: 'x-captcha',
      params: [],
      message,
      dataPath: `/captcha/${fieldKey}`,
      schemaPath: `#/properties/captcha/${fieldKey}/x-captcha`,
    },
  ];
  error.message = JSON.stringify(errMessage, null, 2);
  return error;
}
