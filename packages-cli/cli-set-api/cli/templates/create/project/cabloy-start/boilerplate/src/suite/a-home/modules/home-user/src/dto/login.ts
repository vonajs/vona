import type { IDecoratorDtoOptions } from 'vona-module-a-web';
import { DtoCaptchaVerify } from 'vona-module-a-captcha';
import { Api, v } from 'vona-module-a-openapiutils';
import { Dto } from 'vona-module-a-web';

export interface IDtoOptionsLogin extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsLogin>()
export class DtoLogin {
  @Api.field(v.min(3), v.trim())
  username: string;

  @Api.field(v.min(6))
  password: string;

  @Api.field(v.captcha())
  captcha: DtoCaptchaVerify;
}
