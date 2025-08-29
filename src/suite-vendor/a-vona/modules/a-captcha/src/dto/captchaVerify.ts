import type { IDecoratorDtoOptions } from 'vona-module-a-web';
import { Api } from 'vona-module-a-openapi';
import { Dto } from 'vona-module-a-web';

export interface IDtoOptionsCaptchaVerify extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsCaptchaVerify>()
export class DtoCaptchaVerify {
  @Api.field()
  id: string;

  @Api.field()
  token: unknown;
}
