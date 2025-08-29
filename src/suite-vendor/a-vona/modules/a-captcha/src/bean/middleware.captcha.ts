import type { Next } from 'vona';
import type { IDecoratorMiddlewareOptions, IMiddlewareExecute } from 'vona-module-a-aspect';
import type { DtoCaptchaVerify } from '../dto/captchaVerify.ts';
import type { ICaptchaSceneRecord } from '../types/captchaScene.ts';
import { BeanBase } from 'vona';
import { Middleware } from 'vona-module-a-aspect';

export interface IMiddlewareOptionsCaptcha extends IDecoratorMiddlewareOptions {
  scene?: keyof ICaptchaSceneRecord;
  bodyField?: string;
}

@Middleware<IMiddlewareOptionsCaptcha>({
  bodyField: 'captcha',
})
export class MiddlewareCaptcha extends BeanBase implements IMiddlewareExecute {
  async execute(options: IMiddlewareOptionsCaptcha, next: Next) {
    const sceneName = options.scene;
    if (!sceneName) throw new Error('please specify the captcha scene name');
    // captcha
    const captcha: DtoCaptchaVerify | undefined = this.ctx.request.body[options.bodyField!];
    if (!captcha) throw new Error('not found captcha data');
    const verified = await this.bean.captcha.verify(captcha.id, captcha.token, sceneName);
    if (!verified) this.app.throw(403);
    // next
    return next();
  }
}
