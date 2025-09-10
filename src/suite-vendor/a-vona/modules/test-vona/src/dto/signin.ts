import type { DtoCaptchaVerify } from 'vona-module-a-captcha';
import type { IDecoratorDtoOptions } from 'vona-module-a-web';
import { Api, v } from 'vona-module-a-openapi';
import { Dto } from 'vona-module-a-web';

export interface IDtoOptionsSignin extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsSignin>()
export class DtoSignin {
  @Api.field()
  username: string;

  @Api.field(v.min(3))
  password: string;

  @Api.field(v.captcha({ scene: 'a-captchasimple:simple' }))
  captcha: DtoCaptchaVerify;
}
