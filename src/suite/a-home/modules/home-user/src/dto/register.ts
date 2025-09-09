import type { IDecoratorDtoOptions } from 'vona-module-a-web';
import { DtoCaptchaVerify } from 'vona-module-a-captcha';
import { Api, v } from 'vona-module-a-openapi';
import { Dto } from 'vona-module-a-web';

export interface IDtoOptionsRegister extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsRegister>({
  pipes: v.refine('home-user:passwordConfirm'),
})
export class DtoRegister {
  @Api.field(v.refine('home-user:usernameUnique'), v.min(3))
  username: string;

  @Api.field(v.refine('home-user:emailUnique'), v.email())
  email: string;

  @Api.field(v.min(6), v.max(20))
  password: string;

  @Api.field(v.min(6), v.max(20))
  passwordConfirm: string;

  @Api.field()
  captcha: DtoCaptchaVerify;
}
