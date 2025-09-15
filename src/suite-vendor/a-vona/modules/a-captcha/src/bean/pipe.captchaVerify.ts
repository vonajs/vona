import type { IDecoratorPipeOptionsGlobal, IPipeTransform } from 'vona-module-a-aspect';
import type { RouteHandlerArgumentMeta } from 'vona-module-a-openapi';
import type { DtoCaptchaVerify } from '../dto/captchaVerify.ts';
import type { ICaptchaSceneRecord } from '../types/captchaScene.ts';
import { BeanBase } from 'vona';
import { Pipe } from 'vona-module-a-aspect';

export interface IPipeOptionsCaptchaVerify extends IDecoratorPipeOptionsGlobal {

}

@Pipe<IPipeOptionsCaptchaVerify>({
  global: true,

  argIndex: 0,
})
export class PipeCaptchaVerify extends BeanBase implements IPipeTransform<any> {
  async transform(value: any, _metadata: RouteHandlerArgumentMeta, options: IPipeOptionsCaptchaVerify) {
    // scene
    const sceneName = options.scene;
    if (!sceneName) return value;
    // captcha
    const bodyField = options.bodyField!;
    const captcha: DtoCaptchaVerify | undefined = value[bodyField];
    if (!captcha) throw new Error('not found captcha data');
    if (typeof captcha !== 'object') throw new Error('not found valid captcha data');
    const verified = await this.bean.captcha.verify(captcha.id, captcha.token, sceneName);
    if (!verified) throw combineCaptchaError(bodyField, this.scope.locale.CaptchaInvalid());
    // next
    return value;
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
