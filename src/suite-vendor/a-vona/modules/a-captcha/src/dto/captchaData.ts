import type { IDecoratorDtoOptions } from 'vona-module-a-web';
import { Api } from 'vona-module-a-openapi';
import { Dto } from 'vona-module-a-web';

export interface IDtoOptionsCaptchaData extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsCaptchaData>()
export class DtoCaptchaData {
  @Api.field()
  id: string;

  @Api.field()
  provider: string;

  @Api.field()
  payload: unknown;
}
