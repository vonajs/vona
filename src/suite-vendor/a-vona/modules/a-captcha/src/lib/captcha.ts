import type { IPipeOptionsCaptchaVerify } from '../bean/pipe.captchaVerify.ts';
import { Aspect } from 'vona-module-a-aspect';

function Verify(options?: Partial<IPipeOptionsCaptchaVerify>): MethodDecorator {
  return Aspect.pipeGlobal('a-captcha:captchaVerify', options);
}

export const Captcha = {
  verify: Verify,
};
