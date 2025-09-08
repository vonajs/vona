import type { IMiddlewareOptionsCaptchaVerify } from '../bean/middleware.captchaVerify.ts';
import { Aspect } from 'vona-module-a-aspect';

function Verify(options?: Partial<IMiddlewareOptionsCaptchaVerify>): MethodDecorator {
  return Aspect.middlewareGlobal('a-captcha:captchaVerify', options);
}

export const Captcha = {
  verify: Verify,
};
