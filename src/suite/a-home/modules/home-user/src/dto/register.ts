import type { DtoCaptchaVerify } from 'vona-module-a-captcha';
import type { IDecoratorDtoOptions } from 'vona-module-a-web';
import { Api, v } from 'vona-module-a-openapi';
import { Dto } from 'vona-module-a-web';

export interface IDtoOptionsRegister extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsRegister>()
export class DtoRegister {
  @Api.field(v.min(3))
  username: string;

  @Api.field(v.email())
  email: string;

  @Api.field(v.min(6))
  password: string;

  @Api.field(v.min(6))
  passwordAgain: string;

  @Api.field()
  captcha: DtoCaptchaVerify;
}
