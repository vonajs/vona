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
    // captcha
    const captcha: DtoCaptchaVerify = this.ctx.request.body[options.bodyField!];
    const verified = await this.bean.captcha.verify(captcha.id, captcha.token, options.scene!);
    if (!verified) this.app.throw(403);
    // next
    return next();
  }
}
