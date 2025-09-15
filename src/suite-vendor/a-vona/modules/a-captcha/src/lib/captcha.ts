import type { IInterceptorOptionsCaptchaVerify } from '../bean/interceptor.captchaVerify.ts';
import { Aspect } from 'vona-module-a-aspect';

function Verify(options?: Partial<IInterceptorOptionsCaptchaVerify>): MethodDecorator {
  return Aspect.interceptor('a-captcha:captchaVerify', options);
}

export const Captcha = {
  verify: Verify,
};
