import type { Next } from 'vona';
import type { IDecoratorMiddlewareOptionsGlobal, IMiddlewareExecute } from 'vona-module-a-aspect';
import type { DtoCaptchaVerify } from '../dto/captchaVerify.ts';
import type { ICaptchaSceneRecord } from '../types/captchaScene.ts';
import { BeanBase } from 'vona';
import { Middleware } from 'vona-module-a-aspect';

export interface IMiddlewareOptionsCaptchaVerify extends IDecoratorMiddlewareOptionsGlobal {
  scene?: keyof ICaptchaSceneRecord;
  bodyField?: string;
}

@Middleware<IMiddlewareOptionsCaptchaVerify>({
  global: true,
  dependencies: 'a-instance:instance',
  bodyField: 'captcha',
})
export class MiddlewareCaptchaVerify extends BeanBase implements IMiddlewareExecute {
  async execute(options: IMiddlewareOptionsCaptchaVerify, next: Next) {
    const sceneName = options.scene;
    if (!sceneName) return next();
    // captcha
    const bodyField = options.bodyField!;
    const captcha: DtoCaptchaVerify | undefined = this.ctx.request.body[bodyField];
    if (!captcha) throw new Error('not found captcha data');
    const verified = await this.bean.captcha.verify(captcha.id, captcha.token, sceneName);
    if (!verified) throw combineCaptchaError(bodyField, this.scope.locale.CaptchaInvalid());
    // next
    return next();
  }
}

function combineCaptchaError(bodyField: string, message: string) {
  // error
  const error = new Error();
  error.code = 422;
  error.message = [
    {
      code: 'custom',
      path: [
        bodyField,
      ],
      message,
    },
  ] as any;
  return error;
}
